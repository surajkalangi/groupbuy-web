'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { mockClans } from '@/data/clans';
import { mockPitches } from '@/data/pitches';
import PitchCard from '@/components/pitch/PitchCard';
import styles from './page.module.css';

export default function ClanPreviewPage() {
    const params = useParams();
    const router = useRouter();
    const { isGuest, isLoggedIn, isClanMember, joinClan, currentUser } = useAuth();
    const [joinRequested, setJoinRequested] = useState(false);

    const clan = mockClans.find(c => c.id === params.clanId);
    if (!clan) {
        return (
            <main className={styles.page}>
                <div className={styles.notFound}>
                    <h1>Clan not found</h1>
                    <p>This invite link may be expired or invalid.</p>
                    <Link href={isLoggedIn ? '/feed' : '/'} className={styles.backBtn}>← Back to GroupBuy</Link>
                </div>
            </main>
        );
    }

    const isMemberOfClan = isClanMember(clan.id);
    const isOpenJoin = clan.privacy === 'open';
    const isApprovalRequired = clan.privacy === 'approval_required';

    // Determine which pitches to show based on access rules
    const clanPitches = mockPitches.filter(p => p.clanId === clan.id && (p.status === 'active' || p.status === 'activated'));
    const visiblePitches = clanPitches.filter(p => {
        if (isMemberOfClan) return true; // Members see everything
        if (p.visibility === 'public') return true; // Public pitches always visible
        // Private pitches: visible only if open-join clan
        return isOpenJoin;
    });
    const hiddenPrivateCount = clanPitches.length - visiblePitches.length;

    const handleJoinClan = () => {
        if (isGuest) {
            router.push('/');
            return;
        }
        if (isOpenJoin) {
            joinClan(clan.id);
            router.push(`/clans/${clan.id}/welcome`);
        } else {
            setJoinRequested(true);
        }
    };

    const handleViewPitch = (pitchId) => {
        router.push(`/pitches/${pitchId}`);
    };

    const howItWorksSteps = [
        { icon: 'group_add', title: 'Join Clan', desc: 'Accept the invite and become part of your local tower community.' },
        { icon: 'local_grocery_store', title: 'Participate', desc: 'Join active pitches for farm-fresh produce and premium bulk goods.' },
        { icon: 'verified_user', title: 'Secure Pay', desc: 'Complete your purchase instantly via secure UPI integration.' },
        { icon: 'inventory_2', title: 'Pick up', desc: 'Collect your items from the designated local tower hub.' },
    ];

    return (
        <main className={styles.page}>
            {/* ── Header ── */}
            <header className={styles.header}>
                <Link href={isLoggedIn ? '/feed' : '/'} className={styles.logo}>GroupBuy</Link>
                <div className={styles.headerRight}>
                    <Link href="/how-it-works" className={styles.headerLink}>About</Link>
                    {isGuest ? (
                        <Link href="/" className={styles.loginBtn}>Log In</Link>
                    ) : (
                        <Link href="/feed" className={styles.loginBtn}>Go to Feed →</Link>
                    )}
                </div>
            </header>

            {/* ── Hero Section ── */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <span className={styles.verifiedBadge}>
                        <span className="material-symbols-outlined" style={{ fontSize: '0.75rem', fontVariationSettings: "'FILL' 1" }}>verified</span>
                        VERIFIED COMMUNITY
                    </span>
                    <h1 className={styles.clanName}>{clan.name}</h1>
                    <p className={styles.clanLocation}>
                        <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>location_on</span>
                        {clan.location}
                    </p>
                    <p className={styles.clanDesc}>{clan.description}</p>

                    <div className={styles.heroActions}>
                        {joinRequested ? (
                            <div className={styles.requestSent}>
                                <span className="material-symbols-outlined" style={{ fontSize: '1.25rem', color: 'var(--primary)' }}>check_circle</span>
                                Request Sent — we'll notify you when approved
                            </div>
                        ) : isMemberOfClan ? (
                            <Link href={`/clans/${clan.id}`} className={styles.joinBtn}>
                                Go to Clan →
                            </Link>
                        ) : (
                            <button onClick={handleJoinClan} className={styles.joinBtn}>
                                Join this Clan →
                            </button>
                        )}
                        <div className={styles.avatarStack}>
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className={styles.stackAvatar} style={{ zIndex: 4 - i }}>
                                    <span className={styles.avatarLetter}>
                                        {['A', 'R', 'P', 'M'][i]}
                                    </span>
                                </div>
                            ))}
                            <span className={styles.memberCount}>+{clan.memberCount - 4}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.heroImage}>
                    <img
                        src={clan.coverImage || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80"}
                        alt={`${clan.name} cover`}
                        className={styles.coverImg}
                    />
                </div>
            </section>

            {/* ── How It Works ── */}
            <section className={styles.howSection}>
                <h2 className={styles.sectionTitle}>How it works</h2>
                <div className={styles.howGrid}>
                    {howItWorksSteps.map(step => (
                        <div key={step.title} className={styles.howCard}>
                            <div className={styles.howIcon}>
                                <span className="material-symbols-outlined">{step.icon}</span>
                            </div>
                            <h3 className={styles.howTitle}>{step.title}</h3>
                            <p className={styles.howDesc}>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Active Pitches ── */}
            <section className={styles.pitchesSection}>
                <div className={styles.pitchesHeader}>
                    <div>
                        <h2 className={styles.sectionTitleDark}>Active in this Clan</h2>
                        <p className={styles.pitchesSubtitle}>Live opportunities to save with your neighbors.</p>
                    </div>
                    <Link href={`/clans/${clan.id}`} className={styles.seeAllLink}>
                        See all Pitches
                        <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>chevron_right</span>
                    </Link>
                </div>

                <div className={styles.pitchGrid}>
                    {visiblePitches.map(pitch => (
                        <PitchCard key={pitch.id} pitch={pitch} />
                    ))}

                    {/* Members Only Placeholder */}
                    {hiddenPrivateCount > 0 && (
                        <div className={styles.lockedCard}>
                            <div className={styles.lockedOverlay}>
                                <span className="material-symbols-outlined" style={{ fontSize: '2.5rem' }}>lock</span>
                                <span className={styles.lockedBadge}>MEMBERS ONLY</span>
                                <p className={styles.lockedText}>Exclusive deals are available for clan members.</p>
                                <button onClick={handleJoinClan} className={styles.unlockBtn}>
                                    Join Clan to Unlock
                                </button>
                                <span className={styles.lockedCount}>
                                    🔒 {hiddenPrivateCount} exclusive deal{hiddenPrivateCount > 1 ? 's' : ''} for members
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {visiblePitches.length === 0 && hiddenPrivateCount === 0 && (
                    <div className={styles.emptyPitches}>
                        <span className="material-symbols-outlined" style={{ fontSize: '2.5rem', color: 'var(--on-surface-muted)' }}>storefront</span>
                        <p>No active pitches right now. Join the clan to be the first!</p>
                    </div>
                )}
            </section>

            {/* ── Bottom CTA Banner ── */}
            <section className={styles.ctaBanner}>
                <h2 className={styles.ctaTitle}>Ready to save with your neighbors at {clan.name.split(' ')[0]}?</h2>
                <p className={styles.ctaSub}>Join {clan.memberCount} verified residents today and start getting better products at better prices.</p>
                <div className={styles.ctaActions}>
                    {joinRequested ? (
                        <span className={styles.requestSentBanner}>✓ Join Request Sent</span>
                    ) : isMemberOfClan ? (
                        <Link href={`/clans/${clan.id}`} className={styles.ctaPrimary}>Go to Clan</Link>
                    ) : (
                        <button onClick={handleJoinClan} className={styles.ctaPrimary}>Join Clan Now</button>
                    )}
                    <Link href="/how-it-works" className={styles.ctaSecondary}>Learn More</Link>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer className={styles.footer}>
                <span className={styles.footerBrand}>GroupBuy</span>
                <span className={styles.footerTagline}>Empowering communities through collective commerce.</span>
                <div className={styles.footerLinks}>
                    <a href="#">PRIVACY</a>
                    <a href="#">TERMS</a>
                    <a href="#">SUPPORT</a>
                </div>
            </footer>
        </main>
    );
}
