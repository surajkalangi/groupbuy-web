'use client';

import Link from 'next/link';
import AuthGuard from '@/components/auth/AuthGuard';
import styles from './page.module.css';

export default function WelcomePage() {
    return (
        <AuthGuard>
            <div className={styles.page}>
                {/* Top brand bar */}
                <header className={styles.topBar}>
                    <Link href="/feed" className={styles.brandName}>GroupBuy</Link>
                    <div className={styles.topBarSpacer} />
                </header>

                <div className={styles.blobTopRight} />
                <div className={styles.blobBottomLeft} />

                <main className={styles.main}>
                    <div className={styles.headerText}>
                        <h1 className={styles.heading}>Welcome to GroupBuy</h1>
                        <p className={styles.subtext}>
                            Your profile is all set! How would you like to get started?
                        </p>
                    </div>

                    <div className={styles.optionsStack}>
                        {/* Option 1: Join with Invite Code */}
                        <Link href="/auth/join-clan" className={`${styles.optionCard} ${styles.primaryOption}`}>
                            <div className={styles.iconWrap}>
                                <span className={`material-symbols-outlined ${styles.iconPrimary}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                                    diversity_3
                                </span>
                            </div>
                            <div className={styles.optionContent}>
                                <h3 className={styles.optionTitle}>I have an invite code</h3>
                                <p className={styles.optionDesc}>Join a private Clan using a link or code.</p>
                            </div>
                            <span className={`material-symbols-outlined ${styles.arrowIcon}`}>chevron_right</span>
                        </Link>

                        {/* Option 2: Browse public clans */}
                        <Link href="/clans/browse" className={styles.optionCard}>
                            <div className={styles.iconWrap}>
                                <span className={`material-symbols-outlined ${styles.iconSecondary}`}>
                                    explore
                                </span>
                            </div>
                            <div className={styles.optionContent}>
                                <h3 className={styles.optionTitle}>Browse nearby Clans</h3>
                                <p className={styles.optionDesc}>Find public communities in your neighborhood.</p>
                            </div>
                            <span className={`material-symbols-outlined ${styles.arrowIcon}`}>chevron_right</span>
                        </Link>

                        {/* Option 3: Explore feed */}
                        <Link href="/feed" className={styles.optionCard}>
                            <div className={styles.iconWrap}>
                                <span className={`material-symbols-outlined ${styles.iconTertiary}`}>
                                    local_mall
                                </span>
                            </div>
                            <div className={styles.optionContent}>
                                <h3 className={styles.optionTitle}>Skip for now</h3>
                                <p className={styles.optionDesc}>Explore the feed and see active deals right away.</p>
                            </div>
                            <span className={`material-symbols-outlined ${styles.arrowIcon}`}>chevron_right</span>
                        </Link>
                    </div>
                </main>
            </div>
        </AuthGuard>
    );
}
