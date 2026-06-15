'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import BottomNav from '@/components/layout/BottomNav';
import PitchCard from '@/components/pitch/PitchCard';
import { mockPitches } from '@/data/pitches';
import { mockClans } from '@/data/clans';
import { mockUsers } from '@/data/users';
import styles from './page.module.css';

const CATEGORIES = [
    { id: 'all', label: 'All', icon: 'apps' },
    { id: 'produce', label: 'Fresh Produce', icon: 'eco' },
    { id: 'bakery', label: 'Bakery', icon: 'bakery_dining' },
    { id: 'spices', label: 'Spices & Pantry', icon: 'lunch_dining' },
    { id: 'electronics', label: 'Electronics', icon: 'devices' },
    { id: 'home', label: 'Home & Living', icon: 'chair' },
];

const SORT_OPTIONS = ['Trending', 'Ending Soon', 'Most Funded', 'Newest'];

export default function DiscoverPage() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [activeSort, setActiveSort] = useState('Trending');
    const [searchQuery, setSearchQuery] = useState('');

    // All public pitches for discovery
    const publicPitches = mockPitches
        .filter(p => p.visibility === 'public' && (p.status === 'active' || p.status === 'activated'))
        .map(p => ({
            ...p,
            productName: p.title,
            clanName: mockClans.find(c => c.id === p.clanId)?.name,
            hostName: p.host?.name || 'Unknown Host',
            hostRating: p.host?.rating || 4.5,
            hostAvatar: mockUsers.find(u => u.id === p.hostId)?.avatarUrl || p.host?.avatarUrl,
        }));

    const filteredPitches = publicPitches.filter(p => {
        // Category filter
        if (activeCategory !== 'all' && p.category !== activeCategory) return false;
        // Search filter
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            return p.title.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q);
        }
        return true;
    });

    // Nearby clans preview
    const nearbyClans = mockClans.slice(0, 3);

    return (
        <>
            <Navbar />
            <main className={styles.page}>
                <div className={styles.container}>
                    {/* ── Hero Header ── */}
                    <div className={styles.heroHeader}>
                        <h1 className={styles.heading}>
                            Explore Nearby <span className={styles.headingAccent}>Community Pitches</span>
                        </h1>
                        <p className={styles.subtext}>
                            Join forces with your neighbors to unlock wholesale prices on premium local essentials. Trust-verified and community-led.
                        </p>
                    </div>

                    {/* ── Search ── */}
                    <div className={styles.searchWrap}>
                        <div className={styles.searchBar}>
                            <span className="material-symbols-outlined" style={{ color: 'var(--outline)' }}>search</span>
                            <input
                                type="search"
                                placeholder="Search for fresh produce, community deals, or clans..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className={styles.searchInput}
                            />
                        </div>
                    </div>

                    {/* ── Categories ── */}
                    <div className={styles.categories}>
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                className={`${styles.categoryChip} ${activeCategory === cat.id ? styles.categoryActive : ''}`}
                                onClick={() => setActiveCategory(cat.id)}
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>{cat.icon}</span>
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* ── Sort ── */}
                    <div className={styles.sortRow}>
                        <span className={styles.resultCount}>
                            {filteredPitches.length} {filteredPitches.length === 1 ? 'pitch' : 'pitches'} found
                            {activeCategory !== 'all' && ` in ${CATEGORIES.find(c => c.id === activeCategory)?.label}`}
                        </span>
                        <div className={styles.sortTabs}>
                            {SORT_OPTIONS.map(s => (
                                <button
                                    key={s}
                                    className={`${styles.sortTab} ${activeSort === s ? styles.sortActive : ''}`}
                                    onClick={() => setActiveSort(s)}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── Pitch Grid (shown first) ── */}
                    {filteredPitches.length > 0 ? (
                        <div className={styles.pitchGrid}>
                            {filteredPitches.map(pitch => (
                                <PitchCard key={pitch.id} pitch={pitch} showClanBadge />
                            ))}
                        </div>
                    ) : (
                        <div className={styles.emptyState}>
                            <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: 'var(--on-surface-muted)' }}>search_off</span>
                            <h3 className={styles.emptyTitle}>No pitches found</h3>
                            <p className={styles.emptyText}>Try adjusting your search or explore different categories.</p>
                        </div>
                    )}

                    {/* ── Nearby Clans Banner (shown after pitches) ── */}
                    <div className={styles.clansCarousel}>
                        <h3 className={styles.carouselTitle}>Communities Near You</h3>
                        <div className={styles.clanCards}>
                            {nearbyClans.map(clan => (
                                <Link key={clan.id} href={`/clans/${clan.id}/preview`} className={styles.clanMiniCard}>
                                    <div className={styles.clanMiniIcon}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '1.5rem' }}>apartment</span>
                                    </div>
                                    <div>
                                        <span className={styles.clanMiniName}>{clan.name}</span>
                                        <span className={styles.clanMiniMeta}>{clan.memberCount} members · {clan.activePitchCount} pitches</span>
                                    </div>
                                    <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--on-surface-muted)' }}>chevron_right</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* ── FAB ── */}
                    <Link href="/pitches/create" className={styles.fab} aria-label="Create new pitch">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </Link>
                </div>
            </main>
            <BottomNav />
        </>
    );
}
