'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';

const STEPS = [
    {
        num: '01',
        title: 'Join a Clan',
        desc: 'Search for your apartment complex or office. Join your neighbors in a verified local Clan.',
    },
    {
        num: '02',
        title: 'Pick a Pitch',
        desc: 'Browse curated bulk deals—from seasonal fruits to artisan sourdough—vetted for quality.',
    },
    {
        num: '03',
        title: 'Commit Funds',
        desc: 'Secure your share via a UPI mandate. No money leaves your account until the goal is reached.',
    },
    {
        num: '04',
        title: 'Bulk Order',
        desc: 'Once the minimum quantity is hit, the order is placed automatically at the wholesale price.',
    },
    {
        num: '05',
        title: 'Local Pickup',
        desc: 'Collect your items from the designated hub in your society. Simple, fresh, and local.',
    },
];

export default function HowItWorks2Page() {
    const router = useRouter();
    const { isLoggedIn } = useAuth();

    return (
        <div className={styles.page}>
            {/* ── Header ── */}
            <header className={styles.header}>
                <div className={styles.headerInner}>
                    <div className={styles.headerLeft}>
                        <Link href={isLoggedIn ? '/feed' : '/'} className={styles.logo}>GroupBuy</Link>
                    </div>
                    <nav className={styles.headerNav}>
                        <Link href={isLoggedIn ? '/feed' : '/'} className={styles.navLink}>Home</Link>
                        <span className={styles.navLinkActive}>How it Works</span>
                        <Link href="/discover" className={styles.navLink}>Explore</Link>
                    </nav>
                    <div className={styles.headerRight}>
                        <Link href={isLoggedIn ? '/clans/browse' : '/'} className={styles.joinClanBtn}>Join Clan</Link>
                        <span className="material-symbols-outlined" style={{ color: 'var(--on-surface-variant)', cursor: 'pointer' }}>account_circle</span>
                    </div>
                </div>
            </header>

            <main className={styles.mainContent}>
                {/* ── Hero Section ── */}
                <section className={styles.hero}>
                    <div className={styles.heroInner}>
                        <div className={styles.heroText}>
                            <span className={styles.heroBadge}>Hyperlocal Commerce</span>
                            <h1 className={styles.heroTitle}>
                                How <span className={styles.heroTitleAccent}>GroupBuy</span> Works
                            </h1>
                            <p className={styles.heroDesc}>
                                Unlock wholesale prices by pooling orders with your neighbors. GroupBuy connects local clans to premium artisans, making high-quality living affordable for everyone.
                            </p>
                        </div>
                        <div className={styles.heroImageWrap}>
                            <div className={styles.heroImageFrame}>
                                <img
                                    className={styles.heroImage}
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuClc1hTg9mdC4-D1PiGiXswhBimMD22kJ7PGyJOQWxtndMtTqbSG4kG2tjV9e4-mKy2dKG5UFPF1dfppGroPD6S3AKW4ySBDLIzYXs5zmd-6e-P2P2zYWoahDnXieEQb4bMjI0EaHmuUqnkQhwhfzzfTXcYxsQEJKw7xeNYb_BUxenvDCNsI3zUVacBaqO68ZaVZIfdtt89rGNBGPCeutj-K5PIIT8k-Z8UUmykk5T9YTxyDgHD8dQLlM_oEuoJZE98GjCWTh1u7z4C"
                                    alt="A vibrant community market scene with neighbors sharing fresh produce"
                                />
                            </div>
                            <div className={styles.collectiveCard}>
                                <div className={styles.collectiveCardHead}>
                                    <span className={`material-symbols-outlined ${styles.collectiveCardIcon}`}>handshake</span>
                                    <span className={styles.collectiveCardTitle}>Collective Power</span>
                                </div>
                                <p className={styles.collectiveCardDesc}>Join 450+ neighbors in the Prestige Shantiniketan Clan saving 25% monthly.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── The Power of the Collective — Bento Grid ── */}
                <section className={styles.bentoSection}>
                    <div className={styles.bentoHeader}>
                        <h2 className={styles.bentoTitle}>The Power of the Collective</h2>
                        <p className={styles.bentoSubtitle}>We've reimagined e-commerce by removing the middleman and focusing on community density.</p>
                    </div>
                    <div className={styles.bentoGrid}>
                        {/* Large Feature */}
                        <div className={styles.bentoLarge}>
                            <div>
                                <div className={styles.bentoLargeIconWrap}>
                                    <span className="material-symbols-outlined">groups</span>
                                </div>
                                <h3 className={styles.bentoLargeTitle}>Strength in Numbers</h3>
                                <p className={styles.bentoLargeDesc}>
                                    When you buy a single crate of Alphonso mangoes, you pay retail. When 50 families in your apartment complex buy together, you get farm-gate prices. We facilitate this handshake at a hyperlocal level.
                                </p>
                            </div>
                            <div className={styles.bentoStats}>
                                <div>
                                    <div className={styles.bentoStatValue}>30%</div>
                                    <div className={styles.bentoStatLabel}>Avg. Savings</div>
                                </div>
                                <div>
                                    <div className={styles.bentoStatValue}>0</div>
                                    <div className={styles.bentoStatLabel}>Delivery Fees</div>
                                </div>
                                <div>
                                    <div className={styles.bentoStatValue}>100%</div>
                                    <div className={styles.bentoStatLabel}>Direct Origin</div>
                                </div>
                            </div>
                        </div>
                        {/* Small Feature */}
                        <div className={styles.bentoSmall}>
                            <span className={`material-symbols-outlined ${styles.bentoSmallBgIcon}`}>local_shipping</span>
                            <h3 className={styles.bentoSmallTitle}>Optimized Logistics</h3>
                            <p className={styles.bentoSmallDesc}>
                                By delivering to one central hub per community (your Society Clubhouse), we slash shipping costs and ensure the freshest delivery.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ── Your Journey to Smarter Buying ── */}
                <section className={styles.journeySection}>
                    <div className={styles.journeyInner}>
                        <div className={styles.journeyHeaderRow}>
                            <div className={styles.journeyHeaderText}>
                                <h2 className={styles.journeyTitle}>Your Journey to Smarter Buying</h2>
                                <p className={styles.journeySubtitle}>Five simple steps to transform how your household consumes premium goods.</p>
                            </div>
                            <div className={styles.journeyDivider} />
                        </div>
                        <div className={styles.stepsGrid}>
                            {STEPS.map((step) => (
                                <div key={step.num} className={styles.step}>
                                    <div className={styles.stepNumber}>{step.num}</div>
                                    <h4 className={styles.stepTitle}>{step.title}</h4>
                                    <p className={styles.stepDesc}>{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Safe & Secure Payments ── */}
                <section className={styles.trustSection}>
                    <div className={styles.trustCenter}>
                        <div className={styles.trustHeader}>
                            <h2 className={styles.trustTitle}>Safe &amp; Secure Payments</h2>
                            <p className={styles.trustSubtitle}>We prioritize your security at every step of the transaction.</p>
                        </div>
                        <div className={styles.trustGrid}>
                            <div className={styles.trustItem}>
                                <div className={styles.trustIconWrapAmber}>
                                    <span className="material-symbols-outlined">security</span>
                                </div>
                                <div>
                                    <h4 className={styles.trustItemTitle}>UPI Escrow System</h4>
                                    <p className={styles.trustItemDesc}>We use UPI mandates to &lsquo;block&rsquo; funds. Your money only moves when the deal is confirmed and the artisan is ready to ship.</p>
                                </div>
                            </div>
                            <div className={styles.trustItem}>
                                <div className={styles.trustIconWrapGreen}>
                                    <span className="material-symbols-outlined">verified_user</span>
                                </div>
                                <div>
                                    <h4 className={styles.trustItemTitle}>Multi-Signature Security</h4>
                                    <p className={styles.trustItemDesc}>Large clan purchases require digital sign-offs from appointed Clan Leads, ensuring transparency in every transaction.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── CTA Section ── */}
                <section className={styles.ctaSection}>
                    <h2 className={styles.ctaTitle}>Ready to start saving<br />with your neighbors?</h2>
                    <div className={styles.ctaActions}>
                        <Link href={isLoggedIn ? '/clans/browse' : '/'} className={styles.ctaPrimary}>Join Clan</Link>
                        <Link href="#" className={styles.ctaSecondary}>Contact Support</Link>
                    </div>
                </section>
            </main>

            {/* ── Footer ── */}
            <footer className={styles.footer}>
                <div className={styles.footerInner}>
                    <span className={styles.footerBrand}>GroupBuy</span>
                    <div className={styles.footerLinks}>
                        <Link href="/how-it-works" className={styles.footerLink}>How it Works</Link>
                        <a href="#" className={styles.footerLink}>Trust &amp; Safety</a>
                        <a href="#" className={styles.footerLink}>Privacy Policy</a>
                        <a href="#" className={styles.footerLink}>Terms of Service</a>
                        <a href="#" className={styles.footerLink}>Contact Us</a>
                    </div>
                    <span className={styles.footerCopyright}>© 2026 GroupBuy. Hyperlocal Group Buying.</span>
                </div>
            </footer>
        </div>
    );
}
