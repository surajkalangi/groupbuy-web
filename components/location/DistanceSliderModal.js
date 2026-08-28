'use client';

import { useState, useEffect } from 'react';
import { useLocation } from '@/context/LocationContext';
import { useAuth } from '@/context/AuthContext';
import { mockPitches } from '@/data/pitches';
import { mockClans } from '@/data/clans';
import styles from './DistanceSliderModal.module.css';

const MILESTONES = [
    { value: 5, label: '5 km' },
    { value: 15, label: '15 km' },
    { value: 30, label: '30 km' },
    { value: 50, label: '50 km' },
];

export default function DistanceSliderModal({ isOpen, onClose, basePitches = null }) {
    const {
        userLocation,
        proximityRadius,
        setProximityRadius,
        isPoolInRadius,
    } = useLocation();

    const { isClanMember } = useAuth();

    // Local temporary state while modal is open
    const [tempRadius, setTempRadius] = useState(proximityRadius);

    useEffect(() => {
        if (isOpen) {
            setTempRadius(proximityRadius);
        }
    }, [isOpen, proximityRadius]);

    if (!isOpen) return null;

    const isRemote = tempRadius === 'remote';
    const isAll = tempRadius === 'all';
    const sliderValue = typeof tempRadius === 'number' ? tempRadius : (isRemote ? 50 : 30);

    // Calculate live matching pools count for preview considering the base pools (Discover public-only, Feed clan-filtered, etc.)
    const poolsToFilter = basePitches || mockPitches;
    const matchingCount = poolsToFilter.filter(p => {
        const poolClanIds = p.clanIds || (p.clanId ? [p.clanId] : []);
        const isMemberOfPoolClan = poolClanIds.some(id => isClanMember(id));
        return isPoolInRadius(p, tempRadius, { isMemberOfPoolClan });
    }).length;

    // Check if user is member of at least one society/apartment/villa clan
    const joinedSocietyClans = mockClans.filter(c => {
        const isSociety = (
            c.badge === 'SOCIETY' ||
            c.badge === 'VILLA' ||
            c.badge === 'GATED COMMUNITY' ||
            c.name.toLowerCase().includes('complex') ||
            c.name.toLowerCase().includes('villa') ||
            c.name.toLowerCase().includes('society') ||
            c.name.toLowerCase().includes('apartments')
        );
        return isSociety && isClanMember(c.id);
    });
    const isMemberOfSocietyClan = joinedSocietyClans.length > 0;
    const societyNames = joinedSocietyClans.map(c => c.name).join(', ');

    const handleApply = () => {
        setProximityRadius(tempRadius);
        onClose();
    };

    const handleReset = () => {
        setTempRadius('all');
        setProximityRadius('all');
        onClose();
    };

    const handleSliderChange = (e) => {
        const val = Number(e.target.value);
        setTempRadius(val);
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.headerTitleGroup}>
                        <div className={styles.iconCircle}>
                            <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--primary)' }}>
                                tune
                            </span>
                        </div>
                        <div>
                            <h2 className={styles.title}>Distance & Proximity Filter</h2>
                            <p className={styles.subtitle}>
                                Set maximum distance from <strong>{userLocation?.name || userLocation?.city || 'your location'}</strong>
                            </p>
                        </div>
                    </div>
                    <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close distance filter">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Body */}
                <div className={styles.body}>
                    {/* Active Distance Highlight Box */}
                    <div className={styles.highlightBox}>
                        <div className={styles.highlightMain}>
                            <span className="material-symbols-outlined" style={{ fontSize: '24px', color: 'var(--primary)' }}>
                                {isRemote ? 'language' : isAll ? 'explore' : 'near_me'}
                            </span>
                            <div className={styles.highlightText}>
                                <span className={styles.highlightValue}>
                                    {isRemote ? 'Remote & Pan-India Courier' : isAll ? 'All Distances & Regions' : `Within ${tempRadius} km radius`}
                                </span>
                                <span className={styles.highlightDesc}>
                                    {isRemote
                                        ? 'Showing online software, cohort activities, and courier-dispatched items.'
                                        : isAll
                                            ? 'Showing all active community pools without geographical restrictions.'
                                            : `Local pickup hubs and doorstep delivery reachable within ${tempRadius} km.`
                                    }
                                </span>
                            </div>
                        </div>

                        <div className={styles.dealCountBadge}>
                            <span className={styles.dealCountNum}>{matchingCount}</span>
                            <span className={styles.dealCountLabel}>pools match</span>
                        </div>
                    </div>

                    {/* Interactive Range Slider (1 km to 50 km) */}
                    <div className={styles.sliderSection}>
                        <div className={styles.sliderHeader}>
                            <span className={styles.sliderLabel}>INTERACTIVE DISTANCE RANGE SLIDER</span>
                            <span className={styles.sliderKmDisplay}>
                                {isRemote || isAll ? 'Custom Km' : `${tempRadius} km`}
                            </span>
                        </div>

                        <div className={styles.sliderWrapper}>
                            <input
                                type="range"
                                min="1"
                                max="50"
                                step="1"
                                value={sliderValue}
                                onChange={handleSliderChange}
                                className={styles.sliderInput}
                                aria-label="Adjust maximum distance in kilometers"
                            />
                            <div
                                className={styles.sliderTrackFill}
                                style={{ width: `${((sliderValue - 1) / (50 - 1)) * 100}%` }}
                            />

                            {/* Milestone Pips on the track */}
                            <div className={styles.trackTicksContainer}>
                                {MILESTONES.map(m => {
                                    const pct = ((m.value - 1) / (50 - 1)) * 100;
                                    const isPassed = sliderValue >= m.value && !isRemote && !isAll;
                                    return (
                                        <div
                                            key={m.value}
                                            className={`${styles.trackTickPip} ${isPassed ? styles.trackTickPipPassed : ''}`}
                                            style={{ left: `${pct}%` }}
                                        />
                                    );
                                })}
                            </div>
                        </div>

                        {/* Precisely Aligned Milestone Labels below slider */}
                        <div className={styles.ticksRow}>
                            {MILESTONES.map(m => {
                                const pct = ((m.value - 1) / (50 - 1)) * 100;
                                const isSelected = tempRadius === m.value;
                                return (
                                    <button
                                        key={m.value}
                                        type="button"
                                        className={`${styles.tickLabelBtn} ${isSelected ? styles.tickLabelActive : ''}`}
                                        style={{
                                            left: `${pct}%`,
                                            transform: m.value === 1 ? 'translateX(0%)' : m.value === 50 ? 'translateX(-100%)' : 'translateX(-50%)'
                                        }}
                                        onClick={() => setTempRadius(m.value)}
                                        title={`Set distance to ${m.label}`}
                                    >
                                        <span className={styles.tickLabelText}>{m.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Options: Remote / Pan-India & All Deals */}
                    <div className={styles.optionsSection}>
                        <button
                            type="button"
                            className={`${styles.modeCard} ${isRemote ? styles.modeCardActive : ''}`}
                            onClick={() => setTempRadius(isRemote ? 'all' : 'remote')}
                        >
                            <div className={styles.modeCardHeader}>
                                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: isRemote ? 'var(--primary)' : 'var(--on-surface-variant)' }}>
                                    language
                                </span>
                                <span className={styles.modeCardTitle}>Remote & Pan-India</span>
                                {isRemote && (
                                    <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--primary)', marginLeft: 'auto' }}>
                                        check_circle
                                    </span>
                                )}
                            </div>
                            <span className={styles.modeCardDesc}>Courier delivery, digital tools & remote services without distance limits</span>
                        </button>

                        <button
                            type="button"
                            className={`${styles.modeCard} ${isAll ? styles.modeCardActive : ''}`}
                            onClick={() => setTempRadius('all')}
                        >
                            <div className={styles.modeCardHeader}>
                                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: isAll ? 'var(--primary)' : 'var(--on-surface-variant)' }}>
                                    explore
                                </span>
                                <span className={styles.modeCardTitle}>All Deals</span>
                                {isAll && (
                                    <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--primary)', marginLeft: 'auto' }}>
                                        check_circle
                                    </span>
                                )}
                            </div>
                            <span className={styles.modeCardDesc}>Show all active community pools without any distance filtering</span>
                        </button>
                    </div>

                    {/* Society & Villa Clan Exemption Callout — Shown ONLY if member of at least one society clan */}
                    {isMemberOfSocietyClan && (
                        <div className={styles.exemptionCallout}>
                            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#047857', flexShrink: 0 }}>
                                home_work
                            </span>
                            <span>
                                <strong>Society Exemption:</strong> Pools hosted inside your joined societies &amp; gated clans{societyNames ? ` (${societyNames})` : ''} will always remain visible to you regardless of distance.
                            </span>
                        </div>
                    )}
                </div>

                {/* Footer Action Buttons */}
                <div className={styles.footer}>
                    <button type="button" className={styles.resetBtn} onClick={handleReset}>
                        Reset to All
                    </button>
                    <button type="button" className={styles.applyBtn} onClick={handleApply}>
                        Show {matchingCount} {matchingCount === 1 ? 'Pool' : 'Pools'}
                    </button>
                </div>
            </div>
        </div>
    );
}
