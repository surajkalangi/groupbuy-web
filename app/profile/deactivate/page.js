'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';
import AuthGuard from '@/components/auth/AuthGuard';

const REASONS = [
    'Moving to a different location',
    'Receiving too many notifications',
    'Privacy and data concerns',
    'Other',
];

export default function DeactivatePreviewPage() {
    const router = useRouter();
    const { isLoggedIn } = useAuth();
    const [option, setOption] = useState('break'); // 'break' or 'delete'
    const [reason, setReason] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleProceed = () => {
        if (option === 'break') {
            router.push('/profile/deactivate/success');
        } else {
            router.push('/profile/deactivate/confirm');
        }
    };

    return (
        <AuthGuard>
        <main className={styles.page}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.headerInner}>
                    <button onClick={() => router.back()} className={styles.backBtn}>
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <Link href={isLoggedIn ? '/feed' : '/'} className={styles.headerTitle}>GroupBuy</Link>
                </div>
            </header>

            <div className={styles.container}>
                {/* Hero Section */}
                <section className={styles.heroSection}>
                    <h1 className={styles.heading}>Deactivate or Delete Your Account</h1>
                    <p className={styles.subtext}>We&apos;re sorry to see you go. If you need a break or want to start fresh, please choose an option below.</p>
                </section>

                {/* Option Cards Grid */}
                <div className={styles.optionGrid}>
                    {/* Take a Break */}
                    <button
                        className={`${styles.optionCard} ${option === 'break' ? styles.optionBreakActive : ''}`}
                        onClick={() => setOption('break')}
                        type="button"
                    >
                        <div className={styles.optionTopRow}>
                            <div className={`${styles.optionIconWrap} ${styles.optionIconGreen}`}>
                                <span className="material-symbols-outlined">pause_circle</span>
                            </div>
                            <div className={`${styles.radioOuter} ${option === 'break' ? styles.radioOuterGreen : ''}`}>
                                <div className={`${styles.radioDot} ${option === 'break' ? styles.radioDotGreen : ''}`} />
                            </div>
                        </div>
                        <h3 className={styles.optionTitle}>Take a Break</h3>
                        <p className={styles.optionDesc}>Your profile and pitches will be hidden from the community. You can return anytime just by logging back in.</p>
                    </button>

                    {/* Permanent Deletion */}
                    <button
                        className={`${styles.optionCard} ${option === 'delete' ? styles.optionDeleteActive : ''}`}
                        onClick={() => setOption('delete')}
                        type="button"
                    >
                        <div className={styles.optionTopRow}>
                            <div className={`${styles.optionIconWrap} ${styles.optionIconRed}`}>
                                <span className="material-symbols-outlined">delete_forever</span>
                            </div>
                            <div className={`${styles.radioOuter} ${option === 'delete' ? styles.radioOuterRed : ''}`}>
                                <div className={`${styles.radioDot} ${option === 'delete' ? styles.radioDotRed : ''}`} />
                            </div>
                        </div>
                        <h3 className={styles.optionTitle}>Permanent Deletion</h3>
                        <p className={styles.optionDesc}>This is permanent. All your reputation, clan memberships, and history will be erased forever.</p>
                    </button>
                </div>

                {/* Community Impact Card */}
                <section className={styles.impactCard}>
                    <div className={styles.impactWatermark}>
                        <span className="material-symbols-outlined" style={{ fontSize: '120px' }}>warning</span>
                    </div>
                    <h4 className={styles.impactTitle}>Your Community Impact</h4>
                    <div className={styles.impactStats}>
                        <div className={styles.impactStat}>
                            <span className={styles.impactNumPrimary}>98/100</span>
                            <span className={styles.impactLabel}>Reputation Score</span>
                        </div>
                        <div className={styles.impactStat}>
                            <span className={styles.impactNum}>3</span>
                            <span className={styles.impactLabel}>Clans Joined</span>
                        </div>
                        <div className={styles.impactStat}>
                            <span className={styles.impactNum}>0</span>
                            <span className={styles.impactLabel}>Active Pitches</span>
                        </div>
                    </div>
                    <div className={styles.impactQuoteWrap}>
                        <p className={styles.impactQuote}>&quot;Your reputation reflects your contribution to 3 local neighborhoods in Bangalore.&quot;</p>
                    </div>
                </section>

                {/* Reason for Leaving */}
                <section className={styles.reasonSection}>
                    <label className={styles.reasonTitle}>Why are you leaving?</label>
                    <div className={styles.reasonList}>
                        {REASONS.map(r => (
                            <label key={r} className={styles.reasonOption} onClick={() => setReason(r)}>
                                <input
                                    type="radio"
                                    name="reason"
                                    value={r}
                                    checked={reason === r}
                                    onChange={() => setReason(r)}
                                    className={styles.radioInput}
                                />
                                <span className={styles.reasonText}>{r}</span>
                            </label>
                        ))}
                    </div>
                    <div className={styles.feedbackWrap}>
                        <textarea
                            className={styles.feedbackArea}
                            rows={3}
                            placeholder="Tell us more (optional)"
                            value={feedback}
                            onChange={e => setFeedback(e.target.value)}
                        />
                    </div>
                </section>

                {/* Actions */}
                <div className={styles.actions}>
                    <Link href="/profile/edit" className={styles.keepBtn}>Cancel and Keep My Profile</Link>
                    <button onClick={handleProceed} className={styles.deactivateBtn}>
                        {option === 'delete' ? 'Permanently Delete Account' : 'Deactivate My Account'}
                    </button>
                </div>

                <p className={styles.legal}>
                    By deactivating, you agree to our <Link href="/terms" className={styles.legalLink}>Terms of Service</Link>. Permanent deletion may take up to 30 days to process across all our systems.
                </p>
            </div>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className={styles.footerBadge}>
                    <span className="material-symbols-outlined" style={{ fontSize: '1.125rem', color: 'var(--primary-container)' }}>shield_with_heart</span>
                    <span className={styles.footerText}>Your Privacy is Our Priority</span>
                </div>
            </footer>
        </main>
        </AuthGuard>
    );
}
