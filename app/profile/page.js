'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import BottomNav from '@/components/layout/BottomNav';
import styles from './page.module.css';

const MY_CLANS = [
    { id: 'clan-1', name: 'Prestige Lakeside Towers', role: 'MOD', icon: 'apartment', iconBg: 'secondary' },
    { id: 'clan-2', name: 'Tech Park West Foodies', role: 'Member', icon: 'work', iconBg: 'primary' },
];

const PREFS = [
    { id: 'notif', icon: 'notifications', label: 'Push Notifications', sub: 'Alerts for new pitch matches', color: '#dcfce7', enabled: true },
    { id: 'email', icon: 'mail', label: 'Email Weekly Recap', sub: 'Savings and community updates', color: '#ffedd5', enabled: false },
    { id: 'public', icon: 'visibility', label: 'Public Profile', sub: 'Allow others to see your reputation', color: '#eff6ff', enabled: true },
];

export default function ProfilePage() {
    const router = useRouter();
    const { logout } = useAuth();
    const [prefs, setPrefs] = useState(PREFS);

    const togglePref = (id) => setPrefs(ps => ps.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));

    return (
        <div className={styles.page}>
            <Navbar />
            <main className={styles.main}>
                {/* Profile header */}
                <section className={styles.profileHeader}>
                    <div className={styles.profileLeft}>
                        <div className={styles.avatarWrap}>
                            <div className={styles.avatarCircle}>
                                <span className={styles.avatarLetter}>S</span>
                            </div>
                            <div className={styles.verifiedDot}>
                                <span className="material-symbols-outlined" style={{ fontSize: '1.125rem', fontVariationSettings: "'FILL' 1", color: 'var(--on-secondary-container)' }}>verified</span>
                            </div>
                        </div>
                        <div>
                            <h1 className={styles.profileName}>Suraj Kalangi</h1>
                            <p className={styles.profileLocation}>
                                <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>location_on</span>
                                Prestige Lakeside, Bengaluru
                            </p>
                        </div>
                    </div>
                    <button className={styles.editBtn} onClick={() => router.push('/profile/edit')}>
                        <span className="material-symbols-outlined">edit</span>
                        Edit Profile
                    </button>
                </section>

                {/* Bento stats grid */}
                <div className={styles.statsGrid}>
                    {/* Reputation card */}
                    <div className={styles.reputationCard}>
                        <div className={styles.repoDeco} />
                        <div className={styles.repoContent}>
                            <div>
                                <span className={styles.repoEyebrow}>Reputation Score</span>
                                <h2 className={styles.repoHeading}>Reliable — 92/100</h2>
                                <p className={styles.repoSub}>Top 5% of community buyers in Bengaluru</p>
                            </div>
                            <div className={styles.trustMeterWrap}>
                                <div className={styles.trustMeterLabels}>
                                    <span>Trust Level</span>
                                    <span>92%</span>
                                </div>
                                <div className={styles.trustMeterTrack}>
                                    <div className={styles.trustMeterFill} style={{ width: '92%' }} />
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
                            <span className={styles.statNum} style={{ color: 'var(--secondary)' }}>3</span>
                            <span className={styles.statLabel}>Pitches Hosted</span>
                        </div>
                    </div>
                </div>

                {/* My Clans + Preferences */}
                <div className={styles.bottomGrid}>
                    {/* My Clans */}
                    <div className={styles.clansCol}>
                        <h3 className={styles.sectionTitle}>My Clans</h3>
                        <div className={styles.clanList}>
                            {MY_CLANS.map(clan => (
                                <Link key={clan.id} href={`/clans/${clan.id}`} className={styles.clanItem}>
                                    <div className={styles.clanLeft}>
                                        <div className={`${styles.clanIconBox} ${styles[`iconBg_${clan.iconBg}`]}`}>
                                            <span className="material-symbols-outlined">{clan.icon}</span>
                                        </div>
                                        <div>
                                            <h4 className={styles.clanName}>{clan.name}</h4>
                                            <p className={styles.clanRole}>{clan.role}</p>
                                        </div>
                                    </div>
                                    <span className="material-symbols-outlined" style={{ color: 'var(--on-surface-variant)', fontSize: '1.25rem' }}>chevron_right</span>
                                </Link>
                            ))}
                        </div>
                        <Link href="/auth/join-clan" className={styles.joinClanBtn}>
                            <span className="material-symbols-outlined">add</span>
                            Join New Clan
                        </Link>
                    </div>

                    {/* Preferences */}
                    <div className={styles.prefsCol}>
                        <h3 className={styles.sectionTitle}>Preferences</h3>
                        <div className={styles.prefsList}>
                            {prefs.map((pref, i) => (
                                <div key={pref.id} className={`${styles.prefRow} ${i < prefs.length - 1 ? styles.prefBorder : ''}`}>
                                    <div className={styles.prefLeft}>
                                        <div className={styles.prefIconWrap} style={{ background: pref.color }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>{pref.icon}</span>
                                        </div>
                                        <div>
                                            <p className={styles.prefLabel}>{pref.label}</p>
                                            <p className={styles.prefSub}>{pref.sub}</p>
                                        </div>
                                    </div>
                                    <button
                                        className={`${styles.toggle} ${pref.enabled ? styles.toggleOn : styles.toggleOff}`}
                                        onClick={() => togglePref(pref.id)}
                                    >
                                        <span className={`${styles.toggleThumb} ${pref.enabled ? styles.thumbOn : ''}`} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Sign out */}
                        <button className={styles.signOutBtn} onClick={() => {
                            logout();
                            router.push('/auth/signed-out');
                        }}>
                            <span className="material-symbols-outlined">logout</span>
                            Sign out
                        </button>
                    </div>
                </div>


            </main>
            <BottomNav />
        </div>
    );
}
