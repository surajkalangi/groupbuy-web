'use client';

import { useState, useEffect, use, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import BottomNav from '@/components/layout/BottomNav';
import PitchCard from '@/components/pitch/PitchCard';
import { mockPitches } from '@/data/pitches';
import { mockClans } from '@/data/clans';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';

export default function SearchPage() {
    return (
        <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading search...</div>}>
            <SearchContent />
        </Suspense>
    );
}

function SearchContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialQuery = searchParams?.get('q') || '';
    
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [activeTab, setActiveTab] = useState('pitches'); // 'pitches' or 'clans'

    // Update query when url changes
    useEffect(() => {
        if (initialQuery !== searchQuery) {
            setSearchQuery(initialQuery);
        }
    }, [initialQuery]);

    const { isClanMember } = useAuth();

    // Data for search: returns public pools + private clan pools that the user is a member of
    const searchablePitches = mockPitches
        .filter(p => {
            const isStatusOk = p.status === 'active' || p.status === 'activated';
            if (!isStatusOk) return false;

            const pitchClanIds = p.clanIds || (p.clanId ? [p.clanId] : []);
            const noClanTagged = pitchClanIds.length === 0;

            // Direct link-only pools (no clan + private) are never discoverable via search
            if (noClanTagged && p.visibility === 'private') return false;

            // Public unaffiliated pools are searchable by everyone
            if (noClanTagged && p.visibility === 'public') return true;

            // If any tagged clan is open/public, it is searchable by everyone
            const hasOpenClan = pitchClanIds.some(id => mockClans.find(c => c.id === id)?.privacy === 'open');
            if (hasOpenClan) return true;

            // If all tagged clans are private/restricted, it is searchable ONLY if viewer is a member
            return pitchClanIds.some(id => isClanMember(id));
        })
        .map(p => {
            const pClanId = p.clanIds?.[0] || p.clanId;
            return {
                ...p,
                productName: p.title,
                clanName: mockClans.find(c => c.id === pClanId)?.name,
                hostName: p.host?.name || 'Unknown Host',
                hostRating: p.host?.rating || 4.5,
            };
        });

    const filteredPitches = searchablePitches.filter(p => {
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            return p.title.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q);
        }
        return true;
    });

    const filteredClans = mockClans.filter(c => {
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            return c.name.toLowerCase().includes(q) || c.location?.toLowerCase().includes(q) || c.description?.toLowerCase().includes(q);
        }
        return true;
    });

    const handleSearchChange = (e) => {
        const val = e.target.value;
        setSearchQuery(val);
        // Optional: Update URL without navigation
        if (typeof window !== 'undefined') {
            const url = new URL(window.location);
            if (val) url.searchParams.set('q', val);
            else url.searchParams.delete('q');
            window.history.replaceState({}, '', url);
        }
    };

    return (
        <>
            <Navbar />
            <main className={styles.page}>
                <div className={styles.container}>
                    {/* ── Search Header ── */}
                    <header className={styles.header}>
                        <button className={styles.backBtn} onClick={() => router.back()}>
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                        <div className={styles.searchBar}>
                            <span className="material-symbols-outlined" style={{ fontSize: '1.125rem', color: 'var(--on-surface-muted)' }}>search</span>
                            <input
                                type="search"
                                placeholder="Search pools, clans, or products..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className={styles.searchInput}
                                autoFocus
                            />
                            {searchQuery && (
                                <button className={styles.clearBtn} onClick={() => handleSearchChange({target: {value: ''}})}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>close</span>
                                </button>
                            )}
                        </div>
                    </header>

                    {/* ── Tabs ── */}
                    <div className={styles.tabs}>
                        <button
                            className={`${styles.tab} ${activeTab === 'pitches' ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab('pitches')}
                        >
                            Pools ({filteredPitches.length})
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === 'clans' ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab('clans')}
                        >
                            Clans ({filteredClans.length})
                        </button>
                    </div>

                    {/* ── Content ── */}
                    {activeTab === 'pitches' && (
                        <div>
                            {searchQuery && <div className={styles.resultCount}>{filteredPitches.length} pools found for "{searchQuery}"</div>}
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
                                    <p className={styles.emptyText}>Try adjusting your search terms.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'clans' && (
                        <div>
                            {searchQuery && <div className={styles.resultCount}>{filteredClans.length} clans found for "{searchQuery}"</div>}
                            {filteredClans.length > 0 ? (
                                <div className={styles.clanList}>
                                    {filteredClans.map(clan => (
                                        <Link key={clan.id} href={`/clans/${clan.id}/preview`} className={styles.clanCard}>
                                            <div className={styles.clanIcon}>
                                                <span className="material-symbols-outlined" style={{ fontSize: '1.5rem' }}>apartment</span>
                                            </div>
                                            <div>
                                                <span className={styles.clanName}>{clan.name}</span>
                                                <span className={styles.clanMeta}>{clan.memberCount} members · {clan.location}</span>
                                            </div>
                                            <span className="material-symbols-outlined" style={{ marginLeft: 'auto', color: 'var(--on-surface-muted)' }}>chevron_right</span>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className={styles.emptyState}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: 'var(--on-surface-muted)' }}>group_off</span>
                                    <h3 className={styles.emptyTitle}>No clans found</h3>
                                    <p className={styles.emptyText}>Try searching for a different area or community name.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
            <BottomNav />
        </>
    );
}
