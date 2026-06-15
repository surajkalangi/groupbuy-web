'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import BottomNav from '@/components/layout/BottomNav';
import { mockUsers } from '@/data/users';
import styles from '../page.module.css';
import AuthGuard from '@/components/auth/AuthGuard';

export default function PublicProfilePage({ params }) {
    const resolvedParams = use(params);
    const router = useRouter();
    
    // Find user or default to first mock user
    const user = mockUsers.find(u => u.id === resolvedParams.userId) || mockUsers[0];

    return (
        <AuthGuard>
        <div className={styles.page}>
            <Navbar />
            <main className={styles.main}>
                {/* Profile header */}
                <section className={styles.profileHeader}>
                    <button className={styles.backBtn} onClick={() => router.back()} style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'transparent', border: 'none', color: 'var(--on-surface)', cursor: 'pointer' }}>
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <div className={styles.profileLeft} style={{ marginTop: '2rem' }}>
                        <div className={styles.avatarWrap}>
                            <div className={styles.avatarCircle}>
                                <span className={styles.avatarLetter}>{user.name.charAt(0)}</span>
                            </div>
                            <div className={styles.verifiedDot}>
                                <span className="material-symbols-outlined" style={{ fontSize: '1.125rem', fontVariationSettings: "'FILL' 1", color: 'white' }}>verified</span>
                            </div>
                        </div>
                        <div>
                            <h1 className={styles.profileName}>{user.name}</h1>
                            <p className={styles.profileLocation}>
                                <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>location_on</span>
                                Member since {user.createdAt || 'Jan 2023'}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Bento stats grid */}
                <div className={styles.statsGrid}>
                    {/* Reputation card */}
                    <div className={styles.reputationCard}>
                        <div className={styles.repoDeco} />
                        <div className={styles.repoContent}>
                            <div>
                                <span className={styles.repoEyebrow}>Community Reputation</span>
                                <h2 className={styles.repoHeading}>Reliable — {user.reputation}/100</h2>
                                <p className={styles.repoSub}>Highly rated by the community</p>
                            </div>
                            <div className={styles.trustMeterWrap}>
                                <div className={styles.trustMeterLabels}>
                                    <span>Trust Level</span>
                                    <span>{user.reputation}%</span>
                                </div>
                                <div className={styles.trustMeterTrack}>
                                    <div className={styles.trustMeterFill} style={{ width: `${user.reputation}%` }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick stats */}
                    <div className={styles.quickStats}>
                        <div className={styles.statCard}>
                            <span className={styles.statNum} style={{ color: 'var(--primary)' }}>12</span>
                            <span className={styles.statLabel}>Pitches Joined</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statNum} style={{ color: 'var(--secondary)' }}>{user.hostedPitches || 0}</span>
                            <span className={styles.statLabel}>Pitches Hosted</span>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--on-surface-muted)', fontSize: '0.875rem' }}>Joined 2 Clans in your area</p>
                </div>
            </main>
            <BottomNav />
        </div>
        </AuthGuard>
    );
}
