'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import AuthGuard from '@/components/auth/AuthGuard';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import navStyles from '@/components/layout/Navbar.module.css';
import BottomNav from '@/components/layout/BottomNav';
import PitchCard from '@/components/pitch/PitchCard';
import { mockPitches } from '@/data/pitches';
import { mockClans } from '@/data/clans';
import styles from './page.module.css';

export default function HomeFeed() {
    const { isLoggedIn, isGuest, triggerRatingModal } = useAuth();
    const [activeFilter, setActiveFilter] = useState('all');

    const clanFilters = [
        { id: 'all', label: 'All Clans' },
        ...mockClans.map((c) => ({ id: c.id, label: c.name })),
    ];

    const activePitches = mockPitches.filter((p) => p.status === 'active' || p.status === 'activated');
    const filteredPitches = activeFilter === 'all'
        ? activePitches
        : activePitches.filter((p) => p.clanId === activeFilter);

    const pitchesWithClan = filteredPitches.map((p) => ({
        ...p,
        clanName: mockClans.find((c) => c.id === p.clanId)?.name,
        hostName: p.host?.name,
        hostRating: p.host?.rating,
        hostAvatar: p.host?.avatarUrl,
    }));

    return (
        <AuthGuard>
        <>
            <Navbar />
            <main className={styles.page}>
                <div className={styles.container}>
                    {/* Mobile-only search bar (hidden on desktop) */}
                    <div className={styles.mobileSearchBar}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            type="search"
                            placeholder="Search for pitches, products, or clans..."
                            className={styles.searchInput}
                        />
                    </div>

                    {/* Header */}
                    <div className={styles.header}>
                        <div>
                            <h1 className={styles.title}>Home Feed</h1>
                            <p className={styles.subtitle}>
                                Collective buying with your trusted community. Join a pitch to unlock better prices.
                            </p>
                        </div>
                        <div className={styles.viewControls}>
                            <button className={styles.viewBtn} aria-label="Filter">
                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>filter_list</span>
                            </button>
                            <button className={styles.viewBtn} aria-label="Grid view">
                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>grid_view</span>
                            </button>
                        </div>
                    </div>

                    {/* Clan Filters */}
                    <div className={styles.filters}>
                        {clanFilters.map((filter) => (
                            <button
                                key={filter.id}
                                className={`${styles.filterChip} ${activeFilter === filter.id ? styles.activeChip : ''}`}
                                onClick={() => setActiveFilter(filter.id)}
                            >
                                {activeFilter === filter.id && filter.id !== 'all' && (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                    </svg>
                                )}
                                {filter.label}
                            </button>
                        ))}
                    </div>

                    {/* Pitch Grid */}
                    {pitchesWithClan.length > 0 ? (
                        <div className={styles.pitchGrid}>
                            {pitchesWithClan.map((pitch) => (
                                <PitchCard
                                    key={pitch.id}
                                    pitch={pitch}
                                    showClanBadge={activeFilter === 'all'}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}>📦</div>
                            <h3 className={styles.emptyTitle}>No active pitches yet</h3>
                            <p className={styles.emptyText}>
                                Create the first pitch in your Clan and start saving together!
                            </p>
                            <Link href="/pitches/create" className={styles.emptyBtn}>
                                + Create a Pitch
                            </Link>
                        </div>
                    )}

                    {/* FAB */}
                    <Link href="/pitches/create" className={styles.fab} aria-label="Create new pitch">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </Link>

                    {/* Footer */}
                    <footer className={styles.footer}>
                        <p>© 2026 GROUPBUY. COMMUNITY COMMERCE. V1.0.2</p>
                        <div className={styles.footerLinks}>
                            <Link href="/terms">Terms of Service</Link>
                            <Link href="/privacy">Privacy Policy</Link>
                            <Link href="/guidelines">Community Guidelines</Link>
                        </div>
                    </footer>
                </div>
            </main>
            <BottomNav />
        </>
        </AuthGuard>
    );
}
