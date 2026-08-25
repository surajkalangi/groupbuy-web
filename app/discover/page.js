'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import BottomNav from '@/components/layout/BottomNav';
import PitchCard from '@/components/pitch/PitchCard';
import DistanceDropdown from '@/components/location/DistanceDropdown';
import { useLocation } from '@/context/LocationContext';
import { useAuth } from '@/context/AuthContext';
import { mockPitches } from '@/data/pitches';
import { mockClans } from '@/data/clans';
import { mockUsers } from '@/data/users';
import styles from './page.module.css';

const CATEGORIES = [
    { id: 'all', label: 'All Pools', icon: 'apps' },
    { id: 'home', label: 'Home Setup & Solar', icon: 'solar_power' },
    { id: 'wedding', label: 'Weddings & Events', icon: 'celebration' },
    { id: 'fitness', label: 'Gym & Fitness', icon: 'fitness_center' },
    { id: 'service', label: 'Home Services', icon: 'cleaning_services' },
    { id: 'baby', label: 'Baby & Parenting', icon: 'child_care' },
    { id: 'pets', label: 'Dog & Pet Care', icon: 'pets' },
    { id: 'digital', label: 'Digital Subscriptions', icon: 'devices' },
    { id: 'experience', label: 'Travel & Trips', icon: 'flight' },
];

const SORT_OPTIONS = ['Trending', 'Ending Soon', 'Most Funded', 'Newest'];

export default function DiscoverPage() {
    const { isClanMember } = useAuth();
    const { isPoolInRadius, proximityRadius } = useLocation();
    const [activeCategory, setActiveCategory] = useState('all');
    const [activeSort, setActiveSort] = useState('Trending');
    const [searchQuery, setSearchQuery] = useState('');

    // All public pitches for discovery: only pools tagged to at least one open/public clan
    const publicPitches = mockPitches
        .filter(p => {
            if (p.status !== 'active' && p.status !== 'activated') return false;
            if (p.visibility === 'private' || p.visibility === 'restricted' || p.visibility === 'unlisted') return false;
            
            const pClanIds = p.clanIds || (p.clanId ? [p.clanId] : []);
            if (pClanIds.length === 0) return p.visibility === 'public';
            
            // Check if any tagged clan is an open/public clan
            const hasOpenClan = pClanIds.some(id => {
                const clan = mockClans.find(c => c.id === id);
                return clan && clan.privacy === 'open';
            });
            
            return hasOpenClan;
        })
        .map(p => {
            const pClanId = p.clanIds?.[0] || p.clanId;
            return {
                ...p,
                productName: p.title,
                clanName: mockClans.find(c => c.id === pClanId)?.name,
                hostName: p.host?.name,
                hostRating: p.host?.rating,
                hostAvatar: p.host?.avatarUrl,
            };
        });

    const filteredPitches = publicPitches.filter(p => {
        // Category filter
        if (activeCategory !== 'all') {
            if (activeCategory === 'home' && p.category !== 'home' && p.category !== 'electronics' && p.category !== 'solar') return false;
            else if (activeCategory === 'wedding' && p.category !== 'wedding' && p.category !== 'gifts') return false;
            else if (activeCategory === 'service' && p.category !== 'service' && p.category !== 'cleaning' && p.category !== 'pest_control') return false;
            else if (activeCategory !== 'home' && activeCategory !== 'wedding' && activeCategory !== 'service' && p.category !== activeCategory) return false;
        }
        // Search filter
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            const matchTitle = p.title?.toLowerCase().includes(q);
            const matchDesc = p.description?.toLowerCase().includes(q);
            const matchClan = p.clanName?.toLowerCase().includes(q);
            if (!matchTitle && !matchDesc && !matchClan) return false;
        }
        // Geolocation Proximity filter
        const pClanIds = p.clanIds || (p.clanId ? [p.clanId] : []);
        const isMember = pClanIds.some(id => isClanMember(id));
        return isPoolInRadius(p, proximityRadius, { isMemberOfPoolClan: isMember });
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
                            Explore Nearby <span className={styles.headingAccent}>Community Pools</span>
                        </h1>
                        <p className={styles.subtext}>
                            Join forces with your community to unlock better prices on premium essentials. Trust-verified and community-led.
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

                    {/* ── Sort & Distance Controls ── */}
                    <div className={styles.sortRow}>
                        <span className={styles.resultCount}>
                            {filteredPitches.length} {filteredPitches.length === 1 ? 'pool' : 'pools'} found
                            {activeCategory !== 'all' && ` in ${CATEGORIES.find(c => c.id === activeCategory)?.label}`}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                            <DistanceDropdown basePitches={publicPitches} />
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
                            <h3 className={styles.emptyTitle}>No pools found</h3>
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
                                        <span className={styles.clanMiniMeta}>{clan.memberCount} members · {clan.activePitchCount} pools</span>
                                    </div>
                                    <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--on-surface-muted)' }}>chevron_right</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* ── FAB ── */}
                    <Link href="/pools/create" className={styles.fab} aria-label="Create new pool">
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
