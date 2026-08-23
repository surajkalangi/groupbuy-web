import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import ProgressBar from '@/components/ui/ProgressBar';
import { useState } from 'react';
import { pluralizeUnit } from '@/utils/pluralize';
import { mockClans } from '@/data/clans';
import styles from './PitchCard.module.css';
import { useAuth } from '@/context/AuthContext';
import { useLocation } from '@/context/LocationContext';

export default function PitchCard({ pitch, showClanBadge = false }) {
    const { isClanMember } = useAuth();
    const { getPoolLocationMeta } = useLocation();
    const locMeta = getPoolLocationMeta(pitch);
    const pitchClanIds = pitch.clanIds || (pitch.clanId ? [pitch.clanId] : []);
    const associatedClans = pitchClanIds.map(id => mockClans.find(c => c.id === id)).filter(Boolean);
    const noClanTagged = pitchClanIds.length === 0;
    const isDirectLinkOnly = noClanTagged && pitch.visibility === 'private';
    const isMember = noClanTagged || pitchClanIds.some(id => isClanMember(id));
    const [isSaved, setIsSaved] = useState(pitch.isSaved || false);

    const toggleSave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsSaved(!isSaved);
    };

    const urgencyLabel = pitch.timeRemaining
        ? pitch.timeRemaining
        : pitch.hoursLeft !== undefined
            ? `${pitch.hoursLeft}h Left`
            : pitch.daysLeft === 0
                ? 'Ends Today'
                : pitch.daysLeft === 1
                    ? 'Ends Tomorrow'
                    : `${pitch.daysLeft} Days Left`;

    const spotsLeft = pitch.maxCapacity - pitch.committedUnits;
    const isAlmostFull = spotsLeft <= 2 && spotsLeft > 0;
    const isFull = pitch.committedUnits >= pitch.maxCapacity;
    const goalMet = pitch.committedUnits >= pitch.minOrder;

    return (
        <Link href={`/pitches/${pitch.id}`} className={styles.card}>
            {/* Product Image */}
            <div className={styles.imageWrap}>
                {(pitch.image || pitch.images?.[0]) ? (
                    <img src={pitch.image || pitch.images[0]} alt={pitch.productName} className={styles.image} />
                ) : (
                    <div className={styles.imagePlaceholder}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                        </svg>
                    </div>
                )}
                {showClanBadge && (
                    isDirectLinkOnly ? (
                        <span className={styles.clanBadge} style={{ background: 'rgba(99, 102, 241, 0.18)', color: 'var(--primary)', fontWeight: 600 }}>
                            🔗 Direct Pool
                        </span>
                    ) : associatedClans.length > 0 ? (
                        <span className={styles.clanBadge}>
                            {associatedClans[0].name}{associatedClans.length > 1 ? ` +${associatedClans.length - 1}` : ''}
                        </span>
                    ) : pitch.clanName ? (
                        <span className={styles.clanBadge}>{pitch.clanName}</span>
                    ) : null
                )}
                <span className={`${styles.timeBadge} ${pitch.daysLeft <= 1 ? styles.urgent : ''}`}>
                    ⏱ {urgencyLabel}
                </span>
                <button 
                    className={`${styles.bookmarkBtn} ${isSaved ? styles.bookmarkBtnActive : ''}`} 
                    onClick={toggleSave}
                    aria-label={isSaved ? "Remove from saved" : "Save pool"}
                >
                    <span className="material-symbols-outlined" style={isSaved ? { fontVariationSettings: "'FILL' 1" } : {}}>
                        bookmark
                    </span>
                </button>
            </div>

            {/* Content */}
            <div className={styles.content}>
                <div className={styles.titleRow}>
                    <h3 className={styles.title}>{pitch.productName || pitch.title}</h3>
                    <span className={styles.price}>
                        ₹{Number(pitch.costPerUnit || 0).toLocaleString('en-IN')}<span className={styles.unit}>/{pitch.unitType}</span>
                    </span>
                </div>

                {(pitch.hostName || pitch.host?.name) && (
                    <div className={styles.locationMetaRow}>
                        <div className={styles.hostRow}>
                            <div className={styles.hostAvatarWrapper}>
                                <Avatar name={pitch.hostName || pitch.host?.name} src={pitch.hostAvatar || pitch.host?.avatarUrl} size="sm" />
                                {(pitch.host?.isVerifiedVendor || pitch.isVerifiedVendor) && (
                                    <span className={styles.vendorCheck} title="Verified Direct Manufacturer / Brand">
                                        <span className="material-symbols-outlined" style={{ fontSize: '12px', fontVariationSettings: "'FILL' 1" }}>verified</span>
                                    </span>
                                )}
                            </div>
                            <span className={styles.hostText} title={pitch.hostName || pitch.host?.name}>
                                Host: <strong>{pitch.hostName || pitch.host?.name}</strong>
                            </span>
                            {(pitch.hostRating || pitch.host?.rating) && (
                                <span className={styles.hostRatingBadge} title={`Host rating: ${pitch.hostRating || pitch.host?.rating} ★`}>
                                    ★ {pitch.hostRating || pitch.host?.rating}
                                </span>
                            )}
                        </div>

                        {locMeta && (
                            <span 
                                className={
                                    locMeta.type === 'digital'
                                        ? styles.proximityBadgeDigital
                                        : locMeta.type === 'doorstep'
                                            ? styles.proximityBadgeDoorstep
                                            : locMeta.type === 'pan_india'
                                                ? styles.proximityBadgeRemote
                                                : styles.proximityBadge
                                }
                                title={locMeta.tooltip}
                            >
                                {locMeta.badgeText}
                            </span>
                        )}
                    </div>
                )}

                <div className={styles.progressSection}>
                    <div className={styles.progressMeta}>
                        <span>
                            {goalMet
                                ? `${pitch.committedUnits}/${pitch.maxCapacity} ${pluralizeUnit(pitch.committedUnits, pitch.unitType)} committed`
                                : `${pitch.committedUnits}/${pitch.minOrder} ${pluralizeUnit(pitch.minOrder, pitch.unitType)} to reach goal`}
                        </span>
                        <span className={styles.fundedLabel}>
                            {goalMet
                                ? (isFull ? 'FULL' : 'GOAL MET')
                                : `${Math.round((pitch.committedUnits / pitch.minOrder) * 100)}%`}
                        </span>
                    </div>
                    <ProgressBar
                        value={pitch.committedUnits}
                        max={goalMet ? pitch.maxCapacity : pitch.minOrder}
                        variant="funding"
                        size="md"
                    />
                </div>

                <button className={`${styles.joinBtn} ${isAlmostFull && !isFull && isMember ? styles.urgentBtn : ''}`}>
                    {isMember
                        ? (isFull 
                            ? 'Join Waitlist' 
                            : (isAlmostFull ? `Join Fast - ${spotsLeft} Spot${spotsLeft > 1 ? 's' : ''} Left!` : 'Join Pool'))
                        : 'View Pool Details'}
                </button>
            </div>
        </Link>
    );
}
