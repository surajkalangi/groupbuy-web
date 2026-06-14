import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import ProgressBar from '@/components/ui/ProgressBar';
import { useState } from 'react';
import { pluralizeUnit } from '@/utils/pluralize';
import styles from './PitchCard.module.css';
import { useAuth } from '@/context/AuthContext';

export default function PitchCard({ pitch, showClanBadge = false }) {
    const { isClanMember } = useAuth();
    const isMember = isClanMember(pitch.clanId);
    const [isSaved, setIsSaved] = useState(pitch.isSaved || false);

    const toggleSave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsSaved(!isSaved);
    };

    const urgencyLabel = pitch.daysLeft === 0
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
                {showClanBadge && pitch.clanName && (
                    <span className={styles.clanBadge}>{pitch.clanName}</span>
                )}
                <span className={`${styles.timeBadge} ${pitch.daysLeft <= 1 ? styles.urgent : ''}`}>
                    ⏱ {urgencyLabel}
                </span>
                <button 
                    className={`${styles.bookmarkBtn} ${isSaved ? styles.bookmarkBtnActive : ''}`} 
                    onClick={toggleSave}
                    aria-label={isSaved ? "Remove from saved" : "Save pitch"}
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
                        ₹{pitch.costPerUnit}<span className={styles.unit}>/{pitch.unitType}</span>
                    </span>
                </div>

                {(pitch.hostName || pitch.host?.name) && (
                    <div className={styles.hostRow}>
                        <Avatar name={pitch.hostName || pitch.host?.name} src={pitch.hostAvatar || pitch.host?.avatarUrl} size="sm" />
                        <span className={styles.hostText}>
                            Host: <strong>{pitch.hostName || pitch.host?.name}</strong>
                        </span>
                        {(pitch.hostRating || pitch.host?.rating) && (
                            <span className={styles.hostRating}>{pitch.hostRating || pitch.host?.rating} ★</span>
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
                            : (isAlmostFull ? `Join Fast - ${spotsLeft} Spot${spotsLeft > 1 ? 's' : ''} Left!` : 'Join Pitch'))
                        : 'View Pitch Details'}
                </button>
            </div>
        </Link>
    );
}
