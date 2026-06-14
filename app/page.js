'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';

export default function LandingPage() {
    const router = useRouter();
    const { isLoggedIn, isHydrated } = useAuth();

    // Redirect logged in users to the feed
    useEffect(() => {
        if (isHydrated && isLoggedIn) {
            router.replace('/feed');
        }
    }, [isLoggedIn, isHydrated, router]);

    // Don't render anything while checking auth state or if logged in
    if (!isHydrated || isLoggedIn) {
        return null; 
    }

    return (
        <main className={styles.page}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.logo}>GroupBuy</div>
                <nav className={styles.headerNav}>
                    <Link href="/how-it-works" className={styles.navLink}>How it works</Link>
                    <Link href="/impact" className={styles.navLink}>Our Impact</Link>
                </nav>
            </header>

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <div className={styles.tagLabel}>EDITORIAL HYPERLOCALISM</div>
                    <h1 className={styles.headline}>
                        Save More,<br />
                        <span className={styles.italicGreen}>Together</span>
                    </h1>
                    <p className={styles.subtext}>
                        Join trusted circles in your apartment or office. Buy in bulk, split costs, and unlock wholesale prices on everyday essentials — all with secure UPI payments.
                    </p>
                    <Link href="/auth/verify" className={styles.signInBtn}>
                        Sign in <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                    <div className={styles.socialProof}>
                        <div className={styles.avatarStack}>
                            <div className={styles.avatar} style={{ backgroundImage: 'url(https://i.pravatar.cc/150?img=68)' }}></div>
                            <div className={styles.avatar} style={{ backgroundImage: 'url(https://i.pravatar.cc/150?img=33)' }}></div>
                            <div className={styles.avatar} style={{ backgroundImage: 'url(https://i.pravatar.cc/150?img=12)' }}></div>
                        </div>
                        <span className={styles.socialText}>
                            Joined by <strong>1,200+</strong> neighbors this week
                        </span>
                    </div>
                </div>
                <div className={styles.heroVisuals}>
                    {/* Card 1 */}
                    <div className={`${styles.dealCard} ${styles.card1}`}>
                        <div className={styles.cardImage1} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&q=80)' }}>
                        </div>
                        <div className={styles.cardInfo}>
                            <div className={styles.cardTag1}>ORGANIC CLAN</div>
                            <div className={styles.cardRow}>
                                <div className={styles.cardTitle}>Farm Fresh Box</div>
                                <div className={styles.cardSave}>Save 40%</div>
                            </div>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className={`${styles.dealCard} ${styles.card2}`}>
                        <div className={styles.cardImage2} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1558002038-1055907df827?w=600&q=80)' }}>
                        </div>
                        <div className={styles.cardInfo}>
                            <div className={styles.cardTag2}>TECH POOL</div>
                            <div className={styles.cardRow}>
                                <div className={styles.cardTitle}>Smart Systems</div>
                                <div className={styles.cardSave}>Save 25%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Value Propositions */}
            <section className={styles.valuePropsSection}>
                <div className={styles.valuePropsGrid}>
                    <div className={styles.valueCard}>
                        <div className={styles.iconCircle}><span className="material-symbols-outlined">groups</span></div>
                        <h3>Pool with neighbors</h3>
                        <p>Combine orders for groceries, utilities, or gadgets. Larger orders mean lower prices for everyone in the commons.</p>
                    </div>
                    <div className={styles.valueCard}>
                        <div className={styles.iconCircle}><span className="material-symbols-outlined">account_balance_wallet</span></div>
                        <h3>Secure UPI escrow</h3>
                        <p>Money only moves when the deal is locked. Our secure escrow ensures your funds are safe until the goal is met.</p>
                    </div>
                    <div className={styles.valueCard}>
                        <div className={styles.iconCircle}><span className="material-symbols-outlined">verified_user</span></div>
                        <h3>Trusted circles</h3>
                        <p>Join verified clans based on your locality. Built on community reputation and verified identities.</p>
                    </div>
                </div>
            </section>

            {/* Empowering Local Economies */}
            <section className={styles.partnersSection}>
                <h2 className={styles.partnersTitle}>
                    Empowering <span className={styles.underlineGreen}>Local</span> Economies
                </h2>
                <div className={styles.partnersGrid}>
                    <div className={styles.partnerCard}>
                        <span className={`material-symbols-outlined ${styles.partnerIcon}`}>storefront</span>
                        <div className={styles.partnerName}>LocalMarkt</div>
                    </div>
                    <div className={styles.partnerCard}>
                        <span className={`material-symbols-outlined ${styles.partnerIcon}`}>diversity_3</span>
                        <div className={styles.partnerName}>Neighbourly</div>
                    </div>
                    <div className={styles.partnerCard}>
                        <span className={`material-symbols-outlined ${styles.partnerIcon}`}>eco</span>
                        <div className={styles.partnerName}>EcoUnion</div>
                    </div>
                    <div className={styles.partnerCard}>
                        <span className={`material-symbols-outlined ${styles.partnerIcon}`}>verified_user</span>
                        <div className={styles.partnerName}>SafePay</div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className={styles.footerLeft}>
                    © 2024 GroupBuy. Editorial Hyperlocalism. v1.0.2
                </div>
                <div className={styles.footerRight}>
                    <Link href="/terms">Terms of Service</Link>
                    <Link href="/privacy">Privacy Policy</Link>
                    <Link href="/guidelines">Community Guidelines</Link>
                </div>
            </footer>
        </main>
    );
}
