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

function formatCompactPrice(price) {
    const num = Number(price) || 0;
    if (num >= 100000) {
        const val = num / 100000;
        return (val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)) + 'L';
    }
    if (num >= 10000) {
        const val = num / 1000;
        return (val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)) + 'K';
    }
    return num.toLocaleString('en-IN');
}

function formatShortUnit(unitType) {
    if (!unitType) return 'unit';
    const clean = String(unitType).trim().toLowerCase();
    const map = {
        'subscription': 'sub',
        'participant': 'person',
        'membership': 'slot',
        'consultation': 'session',
        'flat combo': 'flat',
        '3hr ceremony slot': 'slot',
        '20kg pair (10kg x 2)': 'pair',
        '5-meter string': '5m pack',
        'bridal floral set': 'set',
        'pair in gift box': 'pair',
        '1kg bag': 'kg',
        '2.5kg block': '2.5kg',
        '5 lbs tub': 'tub',
        'mat + strap': 'piece',
    };
    if (map[clean]) return map[clean];
    if (clean.length > 8) return clean.slice(0, 7) + '…';
    return clean;
}

export default function PitchCard({ pitch, showClanBadge = false }) {
    const { isClanMember } = useAuth();
    const { getPoolLocationMeta } = useLocation();
    const pitchClanIds = pitch.clanIds || (pitch.clanId ? [pitch.clanId] : []);
    const isMemberOfPoolClan = pitchClanIds.some(id => isClanMember(id));
    const locMeta = getPoolLocationMeta(pitch, { isMemberOfPoolClan });
    const associatedClans = pitchClanIds.map(id => mockClans.find(c => c.id === id)).filter(Boolean);
    const noClanTagged = pitchClanIds.length === 0;
    const isDirectLinkOnly = noClanTagged && pitch.visibility === 'private';
    const isMember = noClanTagged || isMemberOfPoolClan;
    const [isSaved, setIsSaved] = useState(pitch.isSaved || false);

    // Score clan exclusivity/trust: Private (3) > Restricted / Society (2) > Public (1)
    const getClanPrivacyScore = (clan) => {
        if (!clan) return 0;
        if (clan.privacy === 'private') return 3;
        if (clan.privacy === 'approval_required' || clan.badge?.toUpperCase().includes('SOCIETY') || clan.id === 'clan-1' || clan.id === 'clan-4') return 2;
        return 1;
    };

    // Prioritize member clans first, sorted by privacy exclusivity
    const memberClans = associatedClans.filter(c => isClanMember(c.id)).sort((a, b) => getClanPrivacyScore(b) - getClanPrivacyScore(a));
    const nonMemberClans = associatedClans.filter(c => !isClanMember(c.id)).sort((a, b) => getClanPrivacyScore(b) - getClanPrivacyScore(a));

    const primaryDisplayClan = memberClans.length > 0 
        ? memberClans[0] 
        : (nonMemberClans.length > 0 ? nonMemberClans[0] : associatedClans[0]);

    const otherClansCount = associatedClans.length - 1;

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
                        <div className={styles.clanBadgeWrapper}>
                            <span className={styles.clanBadge}>
                                {primaryDisplayClan?.name || 'Clan'}{otherClansCount > 0 ? ` +${otherClansCount}` : ''}
                            </span>
                            {associatedClans.length > 1 && (
                                <div className={styles.clanTooltipPopup}>
                                    <div className={styles.clanTooltipHeader}>Shared with:</div>
                                    <div className={styles.clanTooltipList}>
                                        {associatedClans.map(c => (
                                            <div key={c.id} className={styles.clanTooltipItem}>
                                                • {c.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
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
                    <div className={styles.priceContainer}>
                        <span className={styles.priceAmount}>
                            ₹{formatCompactPrice(pitch.costPerUnit || pitch.price || 0)}
                        </span>
                        <span className={styles.priceUnit} title={`per ${pitch.unitType || 'unit'}`}>
                            /{formatShortUnit(pitch.unitType)}
                        </span>
                    </div>
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
                            <div className={styles.proximityBadgeWrapper} title={locMeta.tooltip}>
                                <span 
                                    className={
                                        locMeta.type === 'digital'
                                            ? styles.proximityBadgeDigital
                                            : locMeta.type === 'society'
                                                ? styles.proximityBadgeSociety
                                                : locMeta.type === 'doorstep'
                                                    ? styles.proximityBadgeDoorstep
                                                    : locMeta.type === 'pan_india'
                                                        ? styles.proximityBadgeRemote
                                                        : styles.proximityBadge
                                    }
                                >
                                    {locMeta.badgeText}
                                </span>
                                <span className={styles.tooltipPopup}>
                                    {locMeta.tooltip}
                                </span>
                            </div>
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
