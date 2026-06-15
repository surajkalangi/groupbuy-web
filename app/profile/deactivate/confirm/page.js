'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';
import AuthGuard from '@/components/auth/AuthGuard';

export default function ConfirmDeletePage() {
    const router = useRouter();
    const { isLoggedIn } = useAuth();
    const [option, setOption] = useState('delete'); // pre-selected as per design

    const handleConfirm = () => {
        if (option === 'break') {
            router.push('/profile/deactivate/success');
        } else {
            router.push('/profile/deactivate/deleted');
        }
    };

    return (
        <AuthGuard>
        <main className={styles.page}>
            {/* Fixed glassmorphic navbar */}
            <nav className={styles.navbar}>
                <div className={styles.navInner}>
                    <Link href={isLoggedIn ? '/feed' : '/'} className={styles.logo}>GroupBuy</Link>
                    <div className={styles.navActions}>
                        <button className={styles.helpBtn}>
                            <span className="material-symbols-outlined">help_outline</span>
                        </button>
                    </div>
                </div>
                <div className={styles.navDivider} />
            </nav>

            {/* Main content */}
            <div className={styles.container}>
                {/* Hero section — centered */}
                <section className={styles.heroSection}>
                    <h1 className={styles.heading}>Wait, are you sure?</h1>
                    <p className={styles.subtext}>Your contribution to the community means a lot. Before you go, choose how you want to handle your account.</p>
                </section>

                {/* Choice cards — single column, stacked */}
                <div className={styles.optionCards}>

                    {/* Option 1: Take a Break (Recommended) */}
                    <label className={styles.optionLabel} onClick={() => setOption('break')}>
                        <input
                            type="radio"
                            name="account_action"
                            className={styles.hiddenRadio}
                            checked={option === 'break'}
                            onChange={() => setOption('break')}
                        />
                        <div className={`${styles.optionCard} ${option === 'break' ? styles.optionBreakActive : styles.optionBreakDefault}`}>
                            {/* Recommended corner badge */}
                            <div className={styles.recommendedBadge}>Recommended</div>

                            {/* Icon */}
                            <div className={`${styles.optionIconWrap} ${styles.optionIconGreen}`}>
                                <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>bedtime</span>
                            </div>

                            {/* Text */}
                            <div className={styles.optionText}>
                                <h3 className={styles.optionTitle}>Take a Break (Deactivate)</h3>
                                <p className={styles.optionDesc}>Your profile, clan memberships, and pitches will be hidden from everyone. You can return and reactivate everything whenever you&apos;re ready.</p>
                            </div>

                            {/* Radio indicator */}
                            <div className={`${styles.radioCircle} ${option === 'break' ? styles.radioCircleGreen : ''}`}>
                                {option === 'break' && <div className={styles.radioInnerDot} />}
                            </div>
                        </div>
                    </label>

                    {/* Option 2: Permanent Deletion (pre-selected) */}
                    <label className={styles.optionLabel} onClick={() => setOption('delete')}>
                        <input
                            type="radio"
                            name="account_action"
                            className={styles.hiddenRadio}
                            checked={option === 'delete'}
                            onChange={() => setOption('delete')}
                        />
                        <div className={`${styles.optionCard} ${option === 'delete' ? styles.optionDeleteActive : ''}`}>
                            {/* Icon */}
                            <div className={`${styles.optionIconWrap} ${styles.optionIconRed}`}>
                                <span className="material-symbols-outlined" style={{ color: 'var(--error)' }}>delete_forever</span>
                            </div>

                            {/* Text */}
                            <div className={styles.optionText}>
                                <h3 className={styles.optionTitle}>Permanent Deletion</h3>
                                <p className={styles.optionDesc}>This action is final. Your reputation score, history, and all account data will be erased forever. This cannot be undone.</p>
                            </div>

                            {/* Check/radio indicator */}
                            <div className={`${styles.radioCircle} ${option === 'delete' ? styles.radioCircleRed : ''}`}>
                                {option === 'delete' && (
                                    <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#ffffff', fontWeight: 700 }}>check</span>
                                )}
                            </div>
                        </div>
                    </label>
                </div>

                {/* Action Buttons */}
                <div className={styles.actions}>
                    <Link href="/profile" className={styles.keepBtn}>Nevermind, keep my profile</Link>
                    <button onClick={handleConfirm} className={styles.confirmBtn}>
                        Proceed with Selection
                    </button>
                </div>

                {/* Trust badge */}
                <div className={styles.trustBadge}>
                    <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>verified_user</span>
                    <span className={styles.trustText}>Secure Community Protection</span>
                </div>
            </div>
        </main>
        </AuthGuard>
    );
}
