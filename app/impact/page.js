'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';

export default function ImpactPage() {
    const router = useRouter();
    const { isLoggedIn } = useAuth();

    return (
        <div className={styles.page}>
            {/* ── Header ── */}
            <header className={styles.header}>
                <Link href="/" className={styles.logo}>GroupBuy</Link>
                <nav className={styles.headerNav}>
                    <Link href="/" className={styles.navLink}>Home</Link>
                    <Link href="/how-it-works-2" className={styles.navLink}>How it works</Link>
                    <span className={styles.navLinkActive}>Our Impact</span>
                </nav>
                <div className={styles.headerRight}>
                    <Link href={isLoggedIn ? '/clans/browse' : '/auth/verify'} className={styles.joinBtn}>
                        {isLoggedIn ? 'Browse Clans' : 'Get Started'}
                    </Link>
                </div>
            </header>

            <main className={styles.mainContent}>
                {/* ── Hero Section ── */}
                <section className={styles.hero}>
                    <span className={styles.heroBadge}>2025 Impact Report</span>
                    <h1 className={styles.heroTitle}>
                        Metrics that matter. <br />
                        <span className={styles.heroTitleAccent}>Communities that care.</span>
                    </h1>
                    <p className={styles.heroDesc}>
                        When we buy together, we don't just save money. We reduce our carbon footprint, empower local artisans, and strengthen the bonds of our communities.
                    </p>
                </section>

                {/* ── Metrics Bento Grid ── */}
                <section className={styles.bentoSection}>
                    <div className={styles.bentoGrid}>
                        {/* Large Metric */}
                        <div className={`${styles.bentoCard} ${styles.bentoCardLarge}`}>
                            <div className={styles.bentoIcon}>
                                <span className="material-symbols-outlined">co2</span>
                            </div>
                            <div className={styles.bentoContent}>
                                <div className={styles.bentoValue}>12,400 kg</div>
                                <div className={styles.bentoLabel}>CO2 Emissions Saved</div>
                                <p className={styles.bentoDesc}>
                                    By consolidating hundreds of individual deliveries into single, community-wide drops at local hubs, we drastically cut down on last-mile delivery emissions.
                                </p>
                            </div>
                        </div>

                        {/* Standard Metric 1 */}
                        <div className={styles.bentoCard}>
                            <div className={styles.bentoIcon} style={{ background: '#fce8cc', color: '#9d5d00' }}>
                                <span className="material-symbols-outlined">payments</span>
                            </div>
                            <div className={styles.bentoContent}>
                                <div className={styles.bentoValue}>₹1.2M+</div>
                                <div className={styles.bentoLabel}>Community Savings</div>
                                <p className={styles.bentoDesc}>
                                    Total wealth retained by our communities through wholesale unlocking and bulk discounting.
                                </p>
                            </div>
                        </div>

                        {/* Standard Metric 2 */}
                        <div className={styles.bentoCard}>
                            <div className={styles.bentoIcon} style={{ background: '#e3eafc', color: '#1a4bb8' }}>
                                <span className="material-symbols-outlined">storefront</span>
                            </div>
                            <div className={styles.bentoContent}>
                                <div className={styles.bentoValue}>150+</div>
                                <div className={styles.bentoLabel}>Local Artisans</div>
                                <p className={styles.bentoDesc}>
                                    Independent farmers, bakers, and makers supported directly, bypassing traditional retail middlemen.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Storytelling Section 1 ── */}
                <section className={styles.storySection}>
                    <div className={styles.storyInner}>
                        <div className={styles.storyImageWrap}>
                            <img 
                                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200" 
                                alt="Fresh produce at a local farm" 
                                className={styles.storyImage} 
                            />
                        </div>
                        <div className={styles.storyText}>
                            <h2 className={styles.storyTitle}>Farm to Community. Directly.</h2>
                            <p className={styles.storyDesc}>
                                We are shifting the paradigm of e-commerce. Instead of food sitting in warehouses or traveling thousands of miles, GroupBuy connects your community directly to the source. Produce is harvested only after a Pitch is fully backed, ensuring zero food waste and maximum freshness.
                            </p>
                            <div className={styles.storyQuote}>
                                "Since partnering with GroupBuy communities, we've eliminated our retail overhead. We know exactly how much to harvest, and it goes straight to the community."
                            </div>
                            <div className={styles.storyAuthor}>
                                <strong>Rajesh K.</strong>
                                <span>— Organic Farmer, LocalMarkt</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Storytelling Section 2 ── */}
                <section className={styles.storySection}>
                    <div className={`${styles.storyInner} ${styles.storyReverse}`}>
                        <div className={styles.storyImageWrap}>
                            <img 
                                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=1200" 
                                alt="Community members gathering" 
                                className={styles.storyImage} 
                            />
                        </div>
                        <div className={styles.storyText}>
                            <h2 className={styles.storyTitle}>Rebuilding the Commons.</h2>
                            <p className={styles.storyDesc}>
                                Modern living has isolated us. GroupBuy isn't just about saving money; it's about giving people in your trusted circle a reason to interact. When you pick up your order from the designated hub, you connect with the people you share your community with.
                            </p>
                            <div className={styles.storyQuote}>
                                "I've been in my apartment complex for 3 years, but I only started knowing my neighbors after we started coordinating our weekly organic fruit orders."
                            </div>
                            <div className={styles.storyAuthor}>
                                <strong>Priya S.</strong>
                                <span>— Clan Lead, Shantiniketan</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── CTA Section ── */}
                <section className={styles.ctaSection}>
                    <h2 className={styles.ctaTitle}>Make an impact today.</h2>
                    <p className={styles.ctaSubtitle}>
                        Join thousands of others who are reshaping commerce to be local, sustainable, and community-driven.
                    </p>
                    <Link href={isLoggedIn ? '/clans/browse' : '/auth/verify'} className={styles.ctaBtn}>
                        {isLoggedIn ? 'Browse Local Clans' : 'Join the Movement'} <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                </section>
            </main>

            {/* ── Footer ── */}
            <footer className={styles.footer}>
                <div className={styles.footerLeft}>
                    © 2026 GroupBuy. Community Commerce.
                </div>
                <div className={styles.footerRight}>
                    <Link href="/terms">Terms</Link>
                    <Link href="/privacy">Privacy</Link>
                </div>
            </footer>
        </div>
    );
}
