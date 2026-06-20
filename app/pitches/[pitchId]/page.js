'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import JoinPitchModal from '@/components/pitch/JoinPitchModal';
import { mockPitches } from '@/data/pitches';
import { pluralizeUnit } from '@/utils/pluralize';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';

export default function PitchDetail({ params }) {
    const resolvedParams = use(params);
    const router = useRouter();
    const pitch = mockPitches.find(p => p.id === resolvedParams.pitchId) || mockPitches[0];
    const [hasJoined, setHasJoined] = useState(false);
    const { isGuest, isLoggedIn, isClanMember } = useAuth();
    const [onWaitlist, setOnWaitlist] = useState(false);
    const [toast, setToast] = useState(null);
    const [showJoinModal, setShowJoinModal] = useState(false);
    
    // Simulate real-time current participants and waitlist count
    const [committedUnits, setCommittedUnits] = useState(pitch.committedUnits || 0);
    const [waitlistCount, setWaitlistCount] = useState(pitch.waitlistCount || 0);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const goalMet = committedUnits >= (pitch.minOrder || 5);
    const progressValue = committedUnits;
    const progressMax = goalMet ? (pitch.maxCapacity || 10) : (pitch.minOrder || 5);
    const progressPct = Math.round((progressValue / progressMax) * 100);
    const spotsLeft = Math.max(0, (pitch.maxCapacity || 10) - committedUnits);
    const isFull = committedUnits >= (pitch.maxCapacity || 10);

    // Gallery state
    const gallery = pitch.gallery && pitch.gallery.length > 0 ? pitch.gallery : (pitch.image ? [pitch.image] : []);
    const [activeSlide, setActiveSlide] = useState(0);

    const isExpired = pitch.status === 'expired' || (pitch.daysLeft <= 0 && pitch.status === 'active');
    const isUnsuccessful = isExpired && !goalMet;
    const isActivated = pitch.status === 'activated';
    const isMemberOfClan = isClanMember(pitch.clanId);

    // Determine CTA state
    const getCtaState = () => {
        if (isGuest) {
            return { label: 'Sign in to Participate', disabled: false, variant: 'active', action: 'sign_in' };
        }
        if (!isMemberOfClan) {
            return { label: 'Join Clan to Participate', disabled: false, variant: 'active', action: 'join_clan' };
        }
        if (hasJoined) return { label: 'Already Joined', disabled: true, variant: 'joined' };
        if (onWaitlist) return { label: 'On Waitlist', disabled: true, variant: 'waitlist' };
        if (isUnsuccessful) return { label: 'Pitch Unsuccessful', disabled: true, variant: 'unsuccessful' };
        if (isExpired) return { label: 'Expired', disabled: true, variant: 'expired' };
        if (isFull || isActivated) return { label: 'Join Waitlist', disabled: false, variant: 'waitlist', action: 'join_waitlist' };
        return { label: "I'm In", disabled: false, variant: 'active', action: 'join_pitch' };
    };
    const ctaState = getCtaState();

    const handleToggleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    const handleShare = async () => {
        const shareData = {
            title: `GroupBuy: ${pitch.title}`,
            text: `Join me on this group buy for ${pitch.title} — ₹${pitch.costPerUnit}/${pitch.unitType}. Only ${spotsLeft} spots left!`,
            url: typeof window !== 'undefined' ? window.location.href : '',
        };
        if (navigator.share) {
            try { await navigator.share(shareData); } catch (e) { /* user cancelled */ }
        } else {
            // Fallback: copy URL
            await navigator.clipboard.writeText(shareData.url);
        }
    };

    const showToast = (message) => {
        setToast({ message });
        setTimeout(() => setToast(null), 3000);
    };

    const handleLeavePitch = () => {
        setHasJoined(false);
        if (waitlistCount > 0) {
            // Simulate waitlist user taking the spot
            setWaitlistCount(prev => prev - 1);
            showToast('A user on the waitlist has been allocated your slot.');
        } else {
            setCommittedUnits(prev => prev - 1);
        }
    };

    const handleLeaveWaitlist = () => {
        setOnWaitlist(false);
        setWaitlistCount(prev => Math.max(0, prev - 1));
    };

    return (
        <>
            <Navbar />
            <main className={styles.page}>
                {/* Image Gallery / Carousel */}
                <section className={styles.heroSection}>
                    {gallery.length > 0 ? (
                        <div className={styles.carouselTrack} style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
                            {gallery.map((img, i) => (
                                <img key={i} src={img} alt={`${pitch.title} - image ${i + 1}`} className={`${styles.heroImage} ${isUnsuccessful ? styles.heroImageUnsuccessful : ''}`} />
                            ))}
                        </div>
                    ) : (
                        <div className={styles.heroPlaceholder}>
                            <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--outline-variant)' }}>image</span>
                        </div>
                    )}

                    {/* Countdown Badge */}
                    <div className={`${styles.countdownBadge} ${isUnsuccessful ? styles.badgeUnsuccessful : ''}`}>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>{isUnsuccessful ? 'cancel' : 'timer'}</span>
                        {isUnsuccessful ? 'Unsuccessful' : isExpired ? 'Expired' : pitch.daysLeft > 0 ? `${pitch.daysLeft}d remaining` : 'Ends today'}
                    </div>

                    {/* Top-Right Action Buttons */}
                    <div className={styles.heroActionRight}>
                        <button className={styles.heroIconBtn} onClick={handleShare} title="Share this pitch">
                            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>share</span>
                        </button>
                        <button className={styles.heroIconBtn} onClick={handleToggleBookmark} title={isBookmarked ? "Remove bookmark" : "Bookmark this pitch"}>
                            <span className="material-symbols-outlined" style={isBookmarked ? { fontSize: '24px', fontVariationSettings: "'FILL' 1", color: "#ffffffe6" } : { fontSize: '24px' }}>bookmark</span>
                        </button>
                    </div>



                    {/* Dot indicators */}
                    {gallery.length > 1 && (
                        <div className={styles.heroDots}>
                            {gallery.map((_, i) => (
                                <button
                                    key={i}
                                    className={i === activeSlide ? styles.dotActive : styles.dot}
                                    onClick={() => setActiveSlide(i)}
                                    aria-label={`Go to image ${i + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </section>

                {/* Thumbnail strip */}
                {gallery.length > 1 && (
                    <div className={styles.thumbnailStrip}>
                        {gallery.map((img, i) => (
                            <button
                                key={i}
                                className={`${styles.thumbnail} ${i === activeSlide ? styles.thumbnailActive : ''}`}
                                onClick={() => setActiveSlide(i)}
                            >
                                <img src={img} alt={`Thumbnail ${i + 1}`} className={styles.thumbnailImg} />
                            </button>
                        ))}
                    </div>
                )}

                {/* Detail Card */}
                <div className={styles.detailCard}>
                    {/* Header & Description */}
                    <div className={styles.cardHeader}>
                        <div>
                            <h1 className={styles.pitchTitle}>{pitch.title}</h1>
                        </div>
                        <div className={styles.priceBox}>
                            <div className={styles.price}>₹{pitch.costPerUnit.toLocaleString('en-IN')}</div>
                            <div className={styles.priceUnit}>per {pitch.unitType}</div>
                        </div>
                    </div>
                    <p className={styles.pitchDescTop}>{pitch.description}</p>


                    {/* Host Info */}
                    <div className={styles.hostCard}>
                        <div className={styles.hostLeft}>
                            <div className={styles.hostAvatarWrap}>
                                {pitch.host.avatarUrl ? (
                                    <img src={pitch.host.avatarUrl} alt={pitch.host.name} className={styles.hostAvatarImg} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                                ) : (
                                    <div className={styles.hostAvatar}>{pitch.host.name.charAt(0)}</div>
                                )}
                                <div className={styles.verifiedDot}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '12px', color: 'white', fontVariationSettings: "'FILL' 1" }}>verified</span>
                                </div>
                            </div>
                            <div>
                                <div className={styles.hostNameRow}>
                                    <span className={styles.hostName}>{pitch.host.name}</span>
                                    <span className={styles.verifiedBadge}>VERIFIED HOST</span>
                                </div>
                                <div className={styles.hostRating}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--secondary)', fontVariationSettings: "'FILL' 1" }}>star</span>
                                    <span className={styles.ratingVal}>{pitch.host.rating}</span>
                                    <span className={styles.ratingCount}>({pitch.host.pitchesHosted} pitches hosted)</span>
                                </div>
                            </div>
                        </div>
                        <button className={styles.viewClanBtn} onClick={() => router.push(`/users/${pitch.hostId}`)} aria-label="View Host Profile">
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chevron_right</span>
                        </button>
                    </div>

                    {/* Progress */}
                    <div className={styles.progressSection}>
                        <div className={styles.progressTop}>
                            <div>
                                <span className={styles.progressSubLabel}>Pitch Progress</span>
                                <span className={styles.progressMain}>
                                    {goalMet
                                        ? `${committedUnits} of ${pitch.maxCapacity} filled (Goal Met)`
                                        : `${committedUnits} of ${pitch.minOrder} to reach goal`}
                                </span>
                            </div>
                            <div className={styles.avatarStack}>
                                {['M', 'F', 'M', 'F'].slice(0, 3).map((_, i) => (
                                    <div key={i} className={styles.stackAvatar}>{String.fromCharCode(65 + i)}</div>
                                ))}
                                {committedUnits > 3 && (
                                    <div className={`${styles.stackAvatar} ${styles.stackMore}`}>+{committedUnits - 3}</div>
                                )}
                            </div>
                        </div>
                        <div className={styles.progressTrack}>
                            <div className={`${styles.progressFill} ${isUnsuccessful ? styles.progressFillUnsuccessful : ''}`} style={{ width: `${progressPct}%` }} />
                        </div>
                        <p className={styles.urgencyNote}>
                            {isFull || isActivated
                                ? <strong className={styles.urgencyNum}>All spots filled!</strong>
                                : <>Only <strong className={styles.urgencyNum}>{spotsLeft} {pluralizeUnit(spotsLeft, pitch.unit)} left</strong>!</>
                            }
                        </p>
                    </div>


                    {/* View Product Source link */}
                    {pitch.productLink && (
                        <a href={pitch.productLink} target="_blank" rel="noopener noreferrer" className={styles.productSourceLink}>
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>open_in_new</span>
                            View Product Source
                        </a>
                    )}

                    {/* Pickup Info */}
                    <div className={styles.pickupCard}>
                        <div className={styles.pickupIcon}>
                            <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>location_on</span>
                        </div>
                        <div>
                            <h4 className={styles.pickupTitle}>Pickup Info</h4>
                            <p className={styles.pickupAddr}>
                                {pitch.pickupInfo.address}<br />
                                <strong>{pitch.pickupInfo.time}</strong>
                            </p>
                        </div>
                    </div>

                    {/* Pitch Policies */}
                    {pitch.pitchPolicies && (
                        <div className={styles.policiesCard}>
                            <div className={styles.policiesHeader}>
                                <span className="material-symbols-outlined" style={{ fontSize: '1.25rem', color: 'var(--primary)' }}>policy</span>
                                <h3 className={styles.policiesTitle}>Pitch Policies</h3>
                            </div>
                            <div className={styles.policiesGrid}>
                                {/* Return Policy */}
                                <div className={styles.policyItem}>
                                    <div className={styles.policyIconWrap}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>assignment_return</span>
                                    </div>
                                    <div>
                                        <span className={styles.policyLabel}>Return Policy</span>
                                        <span className={styles.policyValue}>
                                            {pitch.pitchPolicies.returnPolicy === 'no_returns' && 'No Returns — All sales final'}
                                            {pitch.pitchPolicies.returnPolicy === 'exchange_only' && 'Exchange Only — Within 24h of pickup'}
                                            {pitch.pitchPolicies.returnPolicy === 'full_refund_24h' && 'Full Refund — Within 24h of pickup'}
                                            {pitch.pitchPolicies.returnPolicy === 'custom' && (pitch.pitchPolicies.returnPolicyCustom || 'Custom policy')}
                                        </span>
                                    </div>
                                </div>
                                {/* Quit/Drop Rules */}
                                <div className={styles.policyItem}>
                                    <div className={styles.policyIconWrap}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>exit_to_app</span>
                                    </div>
                                    <div>
                                        <span className={styles.policyLabel}>Quit / Drop Rules</span>
                                        <span className={styles.policyValue}>
                                            Free exit before threshold • {pitch.pitchPolicies.cancellationFeePercent > 0
                                                ? `${pitch.pitchPolicies.cancellationFeePercent}% fee after threshold`
                                                : 'No fee after threshold'
                                            } • No quit after order placed
                                        </span>
                                    </div>
                                </div>
                                {/* Refund Info */}
                                <div className={styles.policyItem}>
                                    <div className={styles.policyIconWrap}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>payments</span>
                                    </div>
                                    <div>
                                        <span className={styles.policyLabel}>Refund Deductions</span>
                                        <span className={styles.policyValue}>
                                            {pitch.pitchPolicies.platformFeePercent}% platform fee on all refunds
                                            {pitch.pitchPolicies.cancellationFeePercent > 0
                                                ? ` + ${pitch.pitchPolicies.cancellationFeePercent}% cancellation fee (post-threshold)`
                                                : ''
                                            }
                                        </span>
                                    </div>
                                </div>
                                {/* Seller Authenticity */}
                                {pitch.pitchPolicies.sellerName && pitch.pitchPolicies.sellerId && (
                                    <div className={styles.policyItem}>
                                        <div className={styles.policyIconWrap}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>verified_user</span>
                                        </div>
                                        <div>
                                            <span className={styles.policyLabel}>Seller Authenticity</span>
                                            <span className={styles.policyValue}>
                                                <strong>Name:</strong> {pitch.pitchPolicies.sellerName} <br />
                                                <strong>ID:</strong> {pitch.pitchPolicies.sellerId}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Discussion */}
                    {isMemberOfClan ? (
                        <div className={styles.discussionSection}>
                            <div className={styles.discussionHeader}>
                                <h3 className={styles.discussionTitle}>Pitch Discussion</h3>
                                <span className={styles.messageBadge}>{pitch.discussion.length} Messages</span>
                            </div>
                            <div className={styles.messages}>
                                {pitch.discussion.map(msg => (
                                    <div key={msg.id} className={`${styles.messageRow} ${msg.isHost ? styles.messageRowHost : ''}`}>
                                        {!msg.isHost && <div className={styles.msgAvatar}>{msg.user.charAt(0)}</div>}
                                        <div className={`${styles.msgBubble} ${msg.isHost ? styles.msgBubbleHost : ''}`}>
                                            <div className={styles.msgMeta}>
                                                <span className={styles.msgUser}>
                                                    {msg.user}
                                                    {msg.isHost && <span className={styles.hostTag}>HOST</span>}
                                                </span>
                                                <span className={styles.msgTime}>{msg.time}</span>
                                            </div>
                                            <p className={styles.msgText}>{msg.text}</p>
                                        </div>
                                        {msg.isHost && <div className={styles.msgAvatar}>{msg.user.charAt(0)}</div>}
                                    </div>
                                ))}
                            </div>
                            <button className={styles.viewAllBtn}>
                                View all conversation
                                <span className="material-symbols-outlined">keyboard_arrow_down</span>
                            </button>
                        </div>
                    ) : (
                        <div className={styles.discussionSection}>
                            <div className={styles.discussionHeader}>
                                <h3 className={styles.discussionTitle}>Pitch Discussion</h3>
                                <span className={styles.messageBadge}>{pitch.discussion.length} Messages</span>
                            </div>
                            <div style={{ padding: '2rem 1rem', textAlign: 'center', background: 'var(--surface-container-lowest)', borderRadius: '1rem', marginTop: '1rem' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '32px', color: 'var(--outline)' }}>forum</span>
                                <p style={{ margin: '0.5rem 0 1rem', color: 'var(--on-surface-variant)' }}>Join clan to see discussion and chat with members.</p>
                                <button className={styles.viewAllBtn} onClick={() => {
                                    if (isGuest) router.push('/');
                                    else router.push(`/clans/${pitch.clanId}/preview`);
                                }}>Join Clan</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Spacer for sticky CTA */}
                <div style={{ height: '100px' }} />
            </main>

            {/* Sticky CTA */}
            <div className={styles.stickyCtaBar}>
                <div className={styles.stickyInner}>

                    {hasJoined ? (
                        <div className={styles.joinedActions}>
                            <span className={styles.joinedLabel}>
                                <span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1", color: 'var(--primary)' }}>check_circle</span>
                                Joined
                            </span>
                            <button className={styles.leavePitchBtn} onClick={handleLeavePitch}>
                                Leave Pitch
                            </button>
                        </div>
                    ) : onWaitlist ? (
                        <div className={styles.joinedActions}>
                            <span className={styles.joinedLabel} style={{ color: 'var(--on-surface)' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1", color: 'var(--on-surface)' }}>hourglass_empty</span>
                                On Waitlist
                            </span>
                            <button className={styles.leavePitchBtn} onClick={handleLeaveWaitlist}>
                                Leave Waitlist
                            </button>
                        </div>
                    ) : ctaState.variant === 'unsuccessful' ? (
                        <div className={styles.unsuccessfulMessage}>
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>error</span>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <span style={{fontWeight: '700', fontSize: '14px'}}>Pitch Unsuccessful</span>
                                <span style={{fontSize: '12px', color: 'var(--on-surface-variant)'}}>Minimum goal was not met in time.</span>
                            </div>
                        </div>
                    ) : (
                        <button
                            className={`${styles.imInBtn} ${ctaState.disabled ? styles.imInBtnDisabled : ''}`}
                            disabled={ctaState.disabled}
                            onClick={() => {
                                if (ctaState.disabled) return;
                                if (ctaState.action === 'sign_in') {
                                    router.push('/');
                                } else if (ctaState.action === 'join_clan') {
                                    router.push(`/clans/${pitch.clanId}/preview`);
                                } else if (ctaState.action === 'join_waitlist') {
                                    setOnWaitlist(true);
                                    setWaitlistCount(prev => prev + 1);
                                    showToast('You have joined the waitlist!');
                                } else {
                                    setShowJoinModal(true);
                                }
                            }}
                        >
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                                {ctaState.variant === 'expired' ? 'timer_off' : ctaState.variant === 'waitlist' ? 'group_add' : 'shopping_cart'}
                            </span>
                            {ctaState.label}
                        </button>
                    )}
                </div>
            </div>

            {/* Join Pitch Modal */}
            <JoinPitchModal
                pitch={pitch}
                spotsLeft={spotsLeft}
                isOpen={showJoinModal}
                onClose={() => setShowJoinModal(false)}
                onConfirm={({ quantity, note }) => {
                    setShowJoinModal(false);
                    router.push(`/pitches/${pitch.id}/payment?qty=${quantity}`);
                }}
            />

            {/* Toast Notification */}
            {toast && (
                <div className={styles.toast}>
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>info</span>
                    {toast.message}
                </div>
            )}
        </>
    );
}
