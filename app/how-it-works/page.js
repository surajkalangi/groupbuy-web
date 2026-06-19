'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';

const JOURNEY_STEPS = [
    {
        num: '01',
        icon: 'group_add',
        title: 'Join Your Community',
        desc: 'Find your apartment complex, office, or friend group. Accept an invite or browse communities to get started.',
    },
    {
        num: '02',
        icon: 'campaign',
        title: 'Discover Pitches',
        desc: 'Browse active group-buy pitches for everything from farm-fresh produce to premium electronics — all at wholesale prices.',
    },
    {
        num: '03',
        icon: 'handshake',
        title: 'Commit & Pool',
        desc: 'Tap "I\'m In" to join a pitch. You only pay when enough members commit and the deal reaches its threshold.',
    },
    {
        num: '04',
        icon: 'verified_user',
        title: 'Secure Payment',
        desc: 'Pay securely via UPI with escrow protection. Your money is held safely until the deal is confirmed by the host.',
    },
    {
        num: '05',
        icon: 'inventory_2',
        title: 'Local Pickup',
        desc: 'Collect your order from a designated pickup point in your tower or office lobby. No delivery fees, no waiting at home.',
    },
];

const FEATURES = [
    {
        icon: 'groups',
        label: 'Strength in Numbers',
        title: 'Collective Buying Power',
        desc: 'When 20 members buy together, everyone gets wholesale pricing. The more people join, the lower the cost per unit.',
        stat: '15-40%',
        statLabel: 'Average savings',
    },
    {
        icon: 'route',
        label: 'Optimized Logistics',
        title: 'One Delivery, Zero Waste',
        desc: 'Instead of 20 separate deliveries, one bulk shipment arrives at a central hub. Lower carbon footprint, lower costs.',
        stat: '90%',
        statLabel: 'Less packaging waste',
    },
];

export default function HowItWorksPage() {
    const router = useRouter();
    const { isLoggedIn } = useAuth();

    return (
        <main className={styles.page}>
            {/* ── Header ── */}
            <header className={styles.header}>
                <button onClick={() => router.back()} className={styles.backBtn} aria-label="Go back">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <Link href={isLoggedIn ? '/feed' : '/'} className={styles.logo}>GroupBuy</Link>
                <div className={styles.headerRight}>
                    {isLoggedIn && (
                        <Link href="/discover" className={styles.headerLink}>Explore</Link>
                    )}
                </div>
            </header>

            {/* ── Hero ── */}
            <section className={styles.hero}>
                <div className={styles.heroOverlay}>
                    <span className={styles.heroBadge}>COMMUNITY COMMERCE</span>
                    <h1 className={styles.heroTitle}>
                        The Power of<br />
                        <span className={styles.heroAccent}>Buying Together</span>
                    </h1>
                    <p className={styles.heroSub}>
                        GroupBuy connects trusted communities to unlock better prices on quality products and services.
                        No middlemen, no markups — just your community pooling together.
                    </p>
                </div>
                <div className={styles.heroImage}>
                    <img
                        src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
                        alt="Community gathering"
                        className={styles.heroCover}
                    />
                    <div className={styles.collectiveCard}>
                        <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>trending_up</span>
                        <div>
                            <strong className={styles.collectiveTitle}>Collective Power</strong>
                            <p className={styles.collectiveDesc}>1,200+ members saving together this week</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Features ── */}
            <section className={styles.features}>
                <h2 className={styles.sectionTitle}>Why Group Buying Works</h2>
                <div className={styles.featureGrid}>
                    {FEATURES.map(f => (
                        <div key={f.title} className={styles.featureCard}>
                            <div className={styles.featureIconWrap}>
                                <span className="material-symbols-outlined" style={{ fontSize: '1.75rem' }}>{f.icon}</span>
                            </div>
                            <span className={styles.featureLabel}>{f.label}</span>
                            <h3 className={styles.featureTitle}>{f.title}</h3>
                            <p className={styles.featureDesc}>{f.desc}</p>
                            <div className={styles.featureStat}>
                                <span className={styles.featureStatNum}>{f.stat}</span>
                                <span className={styles.featureStatLabel}>{f.statLabel}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Journey Timeline ── */}
            <section className={styles.journeySection}>
                <h2 className={styles.sectionTitle}>Your Journey to Smarter Buying</h2>
                <p className={styles.sectionSub}>Five simple steps from discovery to doorstep.</p>

                <div className={styles.timeline}>
                    {JOURNEY_STEPS.map((step, i) => (
                        <div key={step.num} className={styles.timelineItem}>
                            <div className={styles.timelineLine}>
                                <div className={styles.timelineDot}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>{step.icon}</span>
                                </div>
                                {i < JOURNEY_STEPS.length - 1 && <div className={styles.timelineConnector} />}
                            </div>
                            <div className={styles.timelineContent}>
                                <span className={styles.stepNum}>STEP {step.num}</span>
                                <h3 className={styles.stepTitle}>{step.title}</h3>
                                <p className={styles.stepDesc}>{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Trust / Security ── */}
            <section className={styles.trustSection}>
                <div className={styles.trustInner}>
                    <span className="material-symbols-outlined" style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>shield</span>
                    <h2 className={styles.trustTitle}>Safe & Secure Payments</h2>
                    <p className={styles.trustDesc}>
                        Every transaction is protected by UPI escrow. Your money is held securely
                        until the host confirms the order and delivery is arranged. If the deal
                        doesn't reach the threshold, you get a full automatic refund.
                    </p>
                    <div className={styles.trustBadges}>
                        <div className={styles.trustBadge}>
                            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>lock</span>
                            UPI Escrow Protected
                        </div>
                        <div className={styles.trustBadge}>
                            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>undo</span>
                            Auto-Refund Guarantee
                        </div>
                        <div className={styles.trustBadge}>
                            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>verified_user</span>
                            Verified Communities
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className={styles.ctaBanner}>
                <h2 className={styles.ctaTitle}>Ready to save with your community?</h2>
                <p className={styles.ctaSub}>Join 1,200+ members already saving 15-40% on quality products and services.</p>
                <div className={styles.ctaActions}>
                    <Link href="/" className={styles.ctaPrimary}>Get Started →</Link>
                    {isLoggedIn && (
                        <Link href="/discover" className={styles.ctaSecondary}>Explore Pitches</Link>
                    )}
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
