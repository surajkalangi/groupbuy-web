'use client';

import { useState, useEffect } from 'react';
import { useLocation } from '@/context/LocationContext';
import { useAuth } from '@/context/AuthContext';
import { mockPitches } from '@/data/pitches';
import styles from './DistanceSliderModal.module.css';

const PRESETS = [
    { value: 5, label: '5 km', desc: 'Society & Walking' },
    { value: 15, label: '15 km', desc: 'Neighborhood' },
    { value: 30, label: '30 km', desc: 'Citywide' },
    { value: 'remote', label: '🌐 Remote / Pan-India', desc: 'Delivered anywhere' },
    { value: 'all', label: 'All Deals', desc: 'No distance limit' },
];

export default function DistanceSliderModal({ isOpen, onClose }) {
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

    // Calculate live matching pools count for preview
    const matchingCount = mockPitches.filter(p => {
        const poolClanIds = p.clanIds || (p.clanId ? [p.clanId] : []);
        const isMemberOfPoolClan = poolClanIds.some(id => isClanMember(id));
        return isPoolInRadius(p, tempRadius, { isMemberOfPoolClan });
    }).length;

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
                                    {isRemote ? '🌐 Remote & Pan-India Courier' : isAll ? 'All Distances & Regions' : `Within ${tempRadius} km radius`}
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

                    {/* Interactive Slider Bar */}
                    <div className={styles.sliderSection}>
                        <div className={styles.sliderHeader}>
                            <span className={styles.sliderLabel}>SLIDER: ADJUST MAXIMUM RADIUS</span>
                            <span className={styles.sliderKmDisplay}>
                                {isRemote || isAll ? 'Custom Km' : `${tempRadius} km`}
                            </span>
                        </div>

                        <div className={styles.sliderWrapper}>
                            <input
                                type="range"
                                min="2"
                                max="50"
                                step="1"
                                value={sliderValue}
                                onChange={handleSliderChange}
                                className={styles.sliderInput}
                                aria-label="Adjust maximum distance in kilometers"
                            />
                            <div
                                className={styles.sliderTrackFill}
                                style={{ width: `${((sliderValue - 2) / (50 - 2)) * 100}%` }}
                            />
                        </div>

                        {/* Tick labels below slider */}
                        <div className={styles.ticksRow}>
                            <span className={styles.tickLabel} onClick={() => setTempRadius(5)}>5 km</span>
                            <span className={styles.tickLabel} onClick={() => setTempRadius(15)}>15 km</span>
                            <span className={styles.tickLabel} onClick={() => setTempRadius(30)}>30 km</span>
                            <span className={styles.tickLabel} onClick={() => setTempRadius(50)}>50 km</span>
                        </div>
                    </div>

                    {/* Quick Preset Buttons */}
                    <div className={styles.presetSection}>
                        <span className={styles.sliderLabel}>OR SELECT A QUICK PRESET</span>
                        <div className={styles.presetGrid}>
                            {PRESETS.map(p => {
                                const isSelected = tempRadius === p.value;
                                return (
                                    <button
                                        key={String(p.value)}
                                        type="button"
                                        className={`${styles.presetBtn} ${isSelected ? styles.presetBtnActive : ''}`}
                                        onClick={() => setTempRadius(p.value)}
                                    >
                                        <div className={styles.presetTop}>
                                            <span className={styles.presetLabel}>{p.label}</span>
                                            {isSelected && (
                                                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--primary)' }}>
                                                    check_circle
                                                </span>
                                            )}
                                        </div>
                                        <span className={styles.presetDesc}>{p.desc}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Society & Villa Clan Exemption Callout */}
                    <div className={styles.exemptionCallout}>
                        <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#047857' }}>
                            home_work
                        </span>
                        <span>
                            <strong>Society Exemption:</strong> Pools hosted inside your joined societies & villa clans (like Ravi Dham or Dates Villa) will always remain visible to you regardless of distance.
                        </span>
                    </div>
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
