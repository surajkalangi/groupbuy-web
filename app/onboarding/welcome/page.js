'use client';

import Link from 'next/link';
import AuthGuard from '@/components/auth/AuthGuard';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';

export default function WelcomePage() {
    const { currentUser } = useAuth();
    
    // Extract first name (if available) for the personalized greeting
    const firstName = currentUser?.name ? currentUser.name.split(' ')[0] : 'there';

    return (
        <AuthGuard>
            <div className={styles.page}>
                {/* Top brand bar (transparent for this page to match design) */}
                <header className={styles.topBar}>
                    <Link href="/feed" className={styles.brandName}>GroupBuy</Link>
                    <div className={styles.topBarSpacer} />
                </header>

                <div className={styles.blobTopRight} />
                <div className={styles.blobBottomLeft} />

                <main className={styles.main}>
                    {/* Header Area */}
                    <div className={styles.headerIconWrap}>
                        <span className={`material-symbols-outlined ${styles.headerIcon}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                            celebration
                        </span>
                    </div>

                    <div className={styles.headerText}>
                        <h1 className={styles.heading}>
                            Welcome to GroupBuy, <span className={styles.nameHighlight}>{firstName}!</span>
                        </h1>
                        <p className={styles.subtext}>
                            Your profile is set. You're now part of our platform where communities pool their buying power to unlock exceptional wholesale savings.
                        </p>
                    </div>

                    {/* Timeline Card */}
                    <div className={styles.timelineCard}>
                        <h2 className={styles.cardTitle}>3 Steps to Start Saving</h2>

                        <div className={styles.stepper}>
                            {/* Step 1 */}
                            <div className={styles.step}>
                                <div className={styles.stepNum}>1</div>
                                <div className={styles.stepContent}>
                                    <div className={styles.stepTitleWrap}>
                                        <h3 className={styles.stepTitle}>Find Your Community</h3>
                                        <span className={`material-symbols-outlined ${styles.stepIcon}`} style={{ fontVariationSettings: "'FILL' 1" }}>diversity_3</span>
                                    </div>
                                    <p className={styles.stepDesc}>
                                        Find a community by browsing nearby clans for public groups, or joining via invite using a code or link from a friend (apartment, office, etc.).
                                    </p>
                                    <div className={styles.stepActions}>
                                        <Link href="/clans/browse" className={styles.primaryBtn}>
                                            <span>Browse Nearby Clans</span>
                                            <span className={`material-symbols-outlined ${styles.primaryBtnIcon}`}>search</span>
                                        </Link>
                                        <Link href="/auth/join-clan" className={styles.secondaryBtn}>
                                            <span>Join via Invite</span>
                                            <span className={`material-symbols-outlined ${styles.secondaryBtnIcon}`}>link</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className={styles.step}>
                                <div className={styles.stepNum}>2</div>
                                <div className={styles.stepContent}>
                                    <div className={styles.stepTitleWrap}>
                                        <h3 className={styles.stepTitle}>Discover Deals</h3>
                                        <span className={`material-symbols-outlined ${styles.stepIconSecondary}`} style={{ fontVariationSettings: "'FILL' 1" }}>campaign</span>
                                    </div>
                                    <p className={styles.stepDesc}>
                                        Once in a clan, you can explore active collective buys (Pitches). From farm-fresh mangoes and group travel, to bulk discounts on car purchases, combine your buying power with your community to unlock massive savings you could never get alone.
                                    </p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className={styles.step}>
                                <div className={styles.stepNum}>3</div>
                                <div className={styles.stepContent}>
                                    <div className={styles.stepTitleWrap}>
                                        <h3 className={styles.stepTitle}>Commit & Save</h3>
                                        <span className={`material-symbols-outlined ${styles.stepIcon}`} style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                    </div>
                                    <p className={styles.stepDesc}>
                                        Click <strong>"I'm In"</strong> on a pitch. Once enough members join to hit the wholesale threshold, the deal triggers and everyone saves.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Link */}
                    <div className={styles.footerContainer}>
                        <Link href="/how-it-works" className={styles.learnLink}>
                            Still curious? Learn how GroupBuy works
                        </Link>
                    </div>
                </main>
            </div>
        </AuthGuard>
    );
}
