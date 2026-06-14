'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import BottomNav from '@/components/layout/BottomNav';
import { mockClans } from '@/data/clans';
import styles from './page.module.css';

// Mock social circle data
const SOCIAL_CLANS = [
    {
        id: 'clan-1',
        featured: true,
        name: 'Prestige Lakeside Towers',
        location: 'Whitefield, Bangalore',
        verified: true,
        friendCount: 2,
        friendText: '2 friends are members',
        icon: 'apartment',
        bgColor: '#f0fdf4',
    },
    {
        id: 'clan-2',
        featured: false,
        name: 'Brigade Metropolis',
        location: 'Mahadevapura, 1.2km away',
        memberCount: '450+',
        friendCount: 3,
        friendText: '3 people from your contacts recently joined this clan.',
    },
];

// Placeholder cover colors for public clans
const COVER_COLORS = [
    'linear-gradient(135deg, #065f46, #047857)',
    'linear-gradient(135deg, #1e3a5f, #2563eb)',
    'linear-gradient(135deg, #78350f, #b45309)',
];

const COVER_BADGES = ['Premium', null, 'New'];

export default function BrowseClans() {
    const [viewMode, setViewMode] = useState('list');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredClans = mockClans.filter(c => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return c.name.toLowerCase().includes(q) || c.location?.toLowerCase().includes(q);
    });

    return (
        <>
            <Navbar />
            <main className={styles.page}>
                <div className={styles.container}>
                    {/* ── Social Circle Section ── */}
                    <section className={styles.socialSection}>
                        <div className={styles.sectionHeader}>
                            <div>
                                <h2 className={styles.sectionTitle}>Clans from your social circle</h2>
                                <p className={styles.sectionSubtitle}>Communities your friends have already joined</p>
                            </div>
                            <div className={styles.headerActions}>
                                <div className={styles.viewToggle}>
                                    <button
                                        className={`${styles.toggleBtn} ${viewMode === 'list' ? styles.toggleActive : ''}`}
                                        onClick={() => setViewMode('list')}
                                    >
                                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>list</span>
                                        List View
                                    </button>
                                    <button
                                        className={`${styles.toggleBtn} ${viewMode === 'map' ? styles.toggleActive : ''}`}
                                        onClick={() => setViewMode('map')}
                                    >
                                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>map</span>
                                        Map View
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={styles.bentoGrid}>
                            {/* Featured Social Card */}
                            <div className={styles.featuredCard}>
                                <div className={styles.featuredInner}>
                                    <div className={styles.featuredTop}>
                                        <div>
                                            <span className={styles.verifiedBadge}>
                                                <span className="material-symbols-outlined" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>verified</span>
                                                Verified Society
                                            </span>
                                            <h3 className={styles.featuredName}>Prestige Lakeside Towers</h3>
                                            <p className={styles.featuredLocation}>
                                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>location_on</span>
                                                Whitefield, Bangalore
                                            </p>
                                        </div>
                                        <div className={styles.featuredIconBox}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: 'var(--primary)' }}>apartment</span>
                                        </div>
                                    </div>
                                    <div className={styles.featuredBottom}>
                                        <div className={styles.avatarRow}>
                                            {['A', 'R', 'P'].map((l, i) => (
                                                <div key={i} className={styles.stackAvatar} style={{ zIndex: 3 - i }}>{l}</div>
                                            ))}
                                            <div className={`${styles.stackAvatar} ${styles.stackMore}`} style={{ zIndex: 0 }}>+12</div>
                                            <span className={styles.friendText}>2 friends are members</span>
                                        </div>
                                        <Link href="/clans/clan-1" className={styles.viewDetailsBtn}>View Details</Link>
                                    </div>
                                </div>
                                <div className={styles.featuredDeco} />
                            </div>

                            {/* Secondary Social Card */}
                            <div className={styles.secondaryCard}>
                                <div>
                                    <span className={styles.nearbyBadge}>Nearby</span>
                                    <h3 className={styles.secondaryName}>Brigade Metropolis</h3>
                                    <p className={styles.secondaryLocation}>Mahadevapura, 1.2km away</p>
                                    <div className={styles.memberRow}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1", color: 'var(--secondary)' }}>group</span>
                                        <span className={styles.memberCount}>450+ members</span>
                                    </div>
                                    <p className={styles.contactText}>3 people from your contacts recently joined this clan.</p>
                                </div>
                                <button className={styles.joinClanOutlineBtn}>Join Clan</button>
                            </div>
                        </div>
                    </section>

                    {/* ── Public Clans Section ── */}
                    <section className={styles.publicSection}>
                        <div className={styles.sectionHeader}>
                            <div>
                                <h2 className={styles.sectionTitle}>Public Clans</h2>
                                <p className={styles.sectionSubtitle}>Join bustling communities near you</p>
                            </div>
                            <div className={styles.headerActions}>
                                <button className={styles.viewAllBtn}>VIEW ALL</button>
                            </div>
                        </div>

                        <div className={styles.publicGrid}>
                            {filteredClans.map((clan, i) => (
                                <div key={clan.id} className={styles.publicCard}>
                                    <div
                                        className={styles.publicCover}
                                        style={{ 
                                            background: clan.coverImage ? `url(${clan.coverImage}) center/cover no-repeat` : COVER_COLORS[i % COVER_COLORS.length] 
                                        }}
                                    >
                                        <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: 'rgba(255,255,255,0.3)' }}>apartment</span>
                                        {COVER_BADGES[i % COVER_BADGES.length] && (
                                            <span className={`${styles.coverBadge} ${COVER_BADGES[i % COVER_BADGES.length] === 'New' ? styles.coverBadgeNew : styles.coverBadgePremium}`}>
                                                {COVER_BADGES[i % COVER_BADGES.length]}
                                            </span>
                                        )}
                                    </div>
                                    <h4 className={styles.publicName}>{clan.name}</h4>
                                    <p className={styles.publicLocation}>{clan.location}</p>
                                    <div className={styles.publicStats}>
                                        <div className={styles.publicStat}>
                                            <span className={styles.statLabel}>Active Members</span>
                                            <span className={styles.statValue}>{clan.memberCount}+</span>
                                        </div>
                                        <div className={styles.statDivider} />
                                        <div className={styles.publicStat}>
                                            <span className={styles.statLabel}>Daily Pitches</span>
                                            <span className={styles.statValue}>{clan.activePitchCount || 5}</span>
                                        </div>
                                    </div>
                                    <Link href={`/clans/${clan.id}`} className={styles.publicViewBtn}>View Details</Link>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ── Map CTA Banner ── */}
                    <section className={styles.mapBanner}>
                        <div className={styles.mapBannerContent}>
                            <h2 className={styles.mapBannerTitle}>Explore your neighborhood visually</h2>
                            <p className={styles.mapBannerText}>Switch to Map View to see the most active clans on your street.</p>
                            <button className={styles.mapBannerBtn}>
                                <span className="material-symbols-outlined">map</span>
                                Switch to Map View
                            </button>
                        </div>
                    </section>
                </div>
            </main>
            <BottomNav />

            {/* FAB */}
            <Link href="/clans/create" className={styles.fab}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.75rem' }}>add</span>
            </Link>
        </>
    );
}
