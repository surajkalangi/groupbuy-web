'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import AuthGuard from '@/components/auth/AuthGuard';
import Avatar from '@/components/ui/Avatar';
import { mockPitches } from '@/data/pitches';
import { mockClans } from '@/data/clans';
import styles from '../page.module.css';

const PARTICIPATING_FILTERS = ['ALL', 'ACTIVE', 'READY FOR PICKUP', 'COMPLETED', 'EXPIRED'];
const HOSTING_FILTERS = ['ALL', 'ACTIVE', 'ORDER PLACED', 'READY FOR PICKUP', 'DRAFT', 'COMPLETED', 'EXPIRED'];
const SAVED_FILTERS = ['ALL', 'ACTIVE', 'ORDER PLACED', 'COMPLETED', 'EXPIRED'];

// Helper to robustly find a pitch
const getPitch = (id) => mockPitches.find(p => p.id === id) || mockPitches[0];

// Mock "my pitches" entries — participating
const participatingPitches = [
    {
        ...getPitch('pitch-1'),
        myStatus: 'active',
        subtitle: 'Fresh Hass Avocados from wholesale market',
        progress: { current: 18, goal: 24, pct: 75 },
    },
    {
        ...getPitch('pitch-3'),
        myStatus: 'active',
        subtitle: 'Homemade Almond Dark Chocolate Granola Jar',
        isSaved: false,
        progress: { current: 3, goal: 10, pct: 30 },
    },
    {
        ...getPitch('pitch-2'),
        myStatus: 'active',
        subtitle: 'Artisan Sourdough Loaf (Cold-Fermented)',
        progress: { current: 4, goal: 10, pct: 40 },
    },
    {
        ...getPitch('pitch-coorg-plantation-trip'),
        myStatus: 'active',
        subtitle: 'Coorg Coffee Estate & Tadiandamol Trek Long Weekend',
        progress: { current: 2, goal: 4, pct: 50 },
    },
    {
        ...getPitch('pitch-ns-kazakhstan'),
        myStatus: 'active',
        subtitle: 'Network School Kazakhstan - September Batch',
        progress: { current: 1, goal: 5, pct: 20 },
    },
    {
        ...getPitch('pitch-netflix'),
        myStatus: 'active',
        subtitle: 'Netflix Premium Subscription Share (4K HDR)',
        progress: { current: 2, goal: 3, pct: 66 },
    },
    {
        ...getPitch('pitch-bg-poker-set'),
        myStatus: 'expired',
        subtitle: 'Clay Poker Chip Set (300 Piece Casino Grade)',
        progress: { current: 2, goal: 4, pct: 50 },
    }
];

// Mock hosting pitches
const hostingPitches = [
    {
        ...getPitch('pitch-1'),
        id: 'pitch-6',
        title: 'Artisan Veggie Bundle',
        costPerUnit: 100,
        unitType: 'bundle',
        image: '/images/artisan_veggie_bundle.png',
        hostStatus: 'active',
        subtitle: 'Weekly Harvest Delivery',
        progress: { current: 42, goal: 50, pct: 84 },
        participantAvatars: [
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80',
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
        ],
        joinedCount: 39,
    },
    {
        id: 'host-draft-1',
        title: 'A2 Desi Milk Subscription',
        subtitle: 'Farm-fresh A2 milk from free-grazing Gir cows, delivered daily.',
        hostStatus: 'draft',
        unitType: 'Litre',
        costPerUnit: null,
        image: null,
        draftMessage: 'Complete details to launch this pitch',
    },
    {
        ...getPitch('pitch-3'),
        id: 'pitch-7',
        title: 'Spicy Mango Pickle',
        costPerUnit: 250,
        unitType: 'jar',
        image: '/images/spicy_mango_pickle.png',
        hostStatus: 'order_placed',
        subtitle: 'Authentic homemade spicy mango pickle.',
        progress: { current: 30, goal: 30, pct: 100 },
        participantAvatars: [
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
        ],
        joinedCount: 27,
    },
    {
        id: 'host-draft-2',
        title: 'Cold Pressed Oil',
        subtitle: 'Authentic wood-pressed oil. Pure and unrefined.',
        hostStatus: 'draft',
        unitType: 'Litre',
        costPerUnit: 185,
        image: '/images/wood_pressed_oil.png',
        draftMessage: 'Almost ready to be published',
        draftReady: true,
    },
    {
        ...getPitch('pitch-4'),
        id: 'pitch-4',
        title: 'Wayanad Estate-Direct Single-Origin Spice Box',
        hostStatus: 'active',
        subtitle: 'Single-origin spices from Wayanad',
        costPerUnit: 1200,
        unitType: 'kit',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80',
        progress: { current: 3, goal: 5, pct: 60 },
        participantAvatars: [
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80',
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
        ],
        joinedCount: 3,
    },
    {
        ...getPitch('pitch-bg-poker-set'),
        id: 'pitch-bg-poker-set',
        hostStatus: 'expired',
        subtitle: 'Clay Poker Chip Set (300 Piece Casino Grade)',
        progress: { current: 2, goal: 4, pct: 50 },
        participantAvatars: [
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
        ],
        joinedCount: 2,
    },
];

// Mock saved pitches
const savedPitches = [
    {
        ...getPitch('pitch-1'),
        savedStatus: 'active',
        timeLeft: 'ENDS TOMORROW',
        goalPercent: 75,
    },
    {
        ...getPitch('pitch-2'),
        savedStatus: 'order_placed',
        timeLeft: 'SUCCESSFULLY FUNDED',
        goalPercent: 100,
    },
    {
        ...getPitch('pitch-gokarna-dandeli-trip'),
        savedStatus: 'active',
        timeLeft: '4D LEFT',
        goalPercent: 78,
    },
    {
        ...getPitch('pitch-ns-kazakhstan'),
        savedStatus: 'active',
        timeLeft: '30D LEFT',
        goalPercent: 20,
    },
    {
        ...getPitch('pitch-netflix'),
        savedStatus: 'active',
        timeLeft: '10D LEFT',
        goalPercent: 66,
    },
    {
        ...getPitch('pitch-diwali-mithai'),
        savedStatus: 'active',
        timeLeft: '8D LEFT',
        goalPercent: 60,
    },
    {
        ...getPitch('pitch-bg-poker-set'),
        savedStatus: 'expired',
        timeLeft: 'ENDED',
        goalPercent: 50,
    }
];

const SUBTITLES = {
    participating: "Review and track the community group-buys you're currently participating in.",
    hosting: 'Manage your active community pools and track group buying progress.',
    saved: 'Managing your saved community collective pools.',
};

const TITLES = {
    participating: 'My Pools',
    hosting: 'Hosting Dashboard',
    saved: 'My Pools',
};

function BookmarkButton({ initialSaved = true }) {
    const [isSaved, setIsSaved] = useState(initialSaved);

    const toggleSave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsSaved(!isSaved);
    };

    return (
        <button 
            className={styles.savedBookmarkBtn} 
            onClick={toggleSave}
            aria-label={isSaved ? "Remove from saved" : "Save pool"}
        >
            <span className="material-symbols-outlined" style={isSaved ? { fontVariationSettings: "'FILL' 1", color: "#ffffffe6" } : {}}>
                bookmark
            </span>
        </button>
    );
}

function MyPitchesContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const defaultTab = searchParams.get('tab') || 'participating';
    const [tab, setTab] = useState(defaultTab);
    const [filter, setFilter] = useState('ALL');

    useEffect(() => {
        const urlTab = searchParams.get('tab');
        if (urlTab && ['participating', 'hosting', 'saved'].includes(urlTab)) {
            setTab(urlTab);
        }
    }, [searchParams]);

    const handleTabChange = (newTab) => {
        setTab(newTab);
        setFilter('ALL');
        router.push(`/pitches/my?tab=${newTab}`, { scroll: false });
    };

    const filterList = tab === 'hosting' ? HOSTING_FILTERS : tab === 'saved' ? SAVED_FILTERS : PARTICIPATING_FILTERS;

    return (
        <>
            <Navbar />
            <main className={styles.page}>
                <div className={`${styles.container} ${styles.containerWide}`}>
                    {/* Header */}
                    <div className={styles.pageHeader}>
                        <h1 className={styles.pageTitle}>{TITLES[tab]}</h1>
                        <p className={styles.pageSubtitle}>{SUBTITLES[tab]}</p>

                        {/* Top Segmented Tab Switcher */}
                        <div className={styles.topTabs}>
                            <button
                                className={`${styles.topTab} ${tab === 'participating' ? styles.topTabActive : ''}`}
                                onClick={() => handleTabChange('participating')}
                            >
                                <span className="material-symbols-outlined" style={tab === 'participating' ? { fontVariationSettings: "'FILL' 1" } : undefined}>group</span>
                                Participating
                            </button>
                            <button
                                className={`${styles.topTab} ${tab === 'hosting' ? styles.topTabActive : ''}`}
                                onClick={() => handleTabChange('hosting')}
                            >
                                <span className="material-symbols-outlined" style={tab === 'hosting' ? { fontVariationSettings: "'FILL' 1" } : undefined}>storefront</span>
                                Hosting
                            </button>
                            <button
                                className={`${styles.topTab} ${tab === 'saved' ? styles.topTabActive : ''}`}
                                onClick={() => handleTabChange('saved')}
                            >
                                <span className="material-symbols-outlined" style={tab === 'saved' ? { fontVariationSettings: "'FILL' 1" } : undefined}>bookmark</span>
                                Saved
                            </button>
                        </div>
                    </div>

                    {/* Status Filters */}
                    <div className={styles.filterRow}>
                        {filterList.map(f => (
                            <button
                                key={f}
                                className={`${styles.filterChip} ${filter === f ? styles.filterChipActive : ''}`}
                                onClick={() => setFilter(f)}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    {/* ═══ Participating Tab ═══ */}
                    {tab === 'participating' && (() => {
                        const filtered = participatingPitches.filter(p =>
                            filter === 'ALL' || (p.myStatus && p.myStatus.toUpperCase() === filter)
                        );
                        return (
                            <>
                                <div className={styles.savedGrid}>
                                    {filtered.map(p => {
                                        const isExpired = p.myStatus === 'expired' || p.status === 'expired';
                                        const isCompleted = p.myStatus === 'completed' || p.status === 'completed';
                                        const isReadyForPickup = p.myStatus === 'ready_for_pickup' || p.status === 'ready_for_pickup';
                                        
                                        const pClanId = p.clanIds?.[0] || p.clanId;
                                        const clanObj = mockClans.find(c => c.id === pClanId);
                                        let badgeCls = styles.savedBadgeActive;
                                        let statusLabel = clanObj ? clanObj.name : (p.clanIds && p.clanIds.length === 0 ? 'DIRECT POOL' : 'ACTIVE');
                                        if (isExpired) {
                                            badgeCls = styles.savedBadgeExpired;
                                            statusLabel = 'EXPIRED';
                                        } else if (isCompleted) {
                                            badgeCls = styles.savedBadgeCompleted;
                                            statusLabel = 'COMPLETED';
                                        } else if (isReadyForPickup) {
                                            badgeCls = styles.savedBadgeActive;
                                            statusLabel = 'READY FOR PICKUP';
                                        }

                                        const goalMet = p.committedUnits >= p.minOrder;
                                        const progressLabel = isExpired
                                            ? `${p.committedUnits}/${p.minOrder} FILLED (GOAL NOT MET)`
                                            : goalMet 
                                                ? `${p.committedUnits}/${p.maxCapacity} FILLED`
                                                : `${p.committedUnits}/${p.minOrder} TO REACH GOAL`;
                                        const pct = isExpired
                                            ? Math.min(100, (p.committedUnits / p.minOrder) * 100)
                                            : goalMet 
                                                ? Math.min(100, (p.committedUnits / p.maxCapacity) * 100) 
                                                : Math.min(100, (p.committedUnits / p.minOrder) * 100);
                                        const hostDisplayName = p.hostName || p.host?.name || 'Community Host';
                                        const hostAvatarSrc = p.hostAvatar || p.host?.avatarUrl;

                                        return (
                                        <div key={p.id} className={`${styles.savedCard} ${isExpired ? styles.savedCardExpired : ''} ${isCompleted ? styles.savedCardCompleted : ''}`}>
                                            <div className={`${styles.savedImageWrap} ${isExpired ? styles.savedImageGrayscale : ''}`}>
                                                {p.image ? (
                                                    <img src={p.image} alt={p.title} className={styles.savedImage} />
                                                ) : (
                                                    <div className={styles.savedImagePlaceholder}>
                                                        <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: 'var(--outline-variant)' }}>image</span>
                                                    </div>
                                                )}
                                                <span className={`${styles.savedStatusOverlay} ${badgeCls} ${!isExpired && !isCompleted && !isReadyForPickup ? styles.clanBadgeOverlay : ''}`}>
                                                    {statusLabel}
                                                </span>
                                                <BookmarkButton initialSaved={p.isSaved !== false} />
                                            </div>
                                            <div className={styles.savedBody}>
                                                <div className={styles.savedTitleRow}>
                                                    <div className={styles.textClampWrap}>
                                                        <h3 className={`${styles.savedTitle} ${isExpired ? styles.savedTitleMuted : ''}`}>{p.title}</h3>
                                                        <p className={`${styles.savedDesc} ${isExpired ? styles.savedDescMuted : ''}`}>{p.subtitle}</p>
                                                    </div>
                                                    <span className={`${styles.savedPrice} ${isExpired ? styles.savedPriceMuted : ''}`}>
                                                        ₹{Number(p.costPerUnit || 0).toLocaleString('en-IN')}
                                                        <span className={styles.savedPriceUnit}>/{p.unitType}</span>
                                                    </span>
                                                </div>
                                                <div className={styles.savedGoalSection}>
                                                    <div className={styles.savedGoalHeader}>
                                                        <span>{isExpired ? 'GOAL NOT MET' : isCompleted ? 'FULLY FUNDED' : 'PROGRESS'}</span>
                                                        <span className={isExpired ? styles.savedGoalPctMuted : styles.savedGoalPct}>{progressLabel}</span>
                                                    </div>
                                                    <div className={styles.savedGoalTrack}>
                                                        <div className={`${styles.savedGoalFill} ${isExpired ? styles.savedGoalFillMuted : ''} ${isCompleted ? styles.hostProgressCompleted : ''}`} style={{ width: `${pct}%` }} />
                                                    </div>
                                                </div>
                                                <div className={styles.savedHostRow}>
                                                    <div className={styles.savedHostInfo}>
                                                        <div className={styles.savedHostAvatarWrap}>
                                                            <Avatar 
                                                                name={hostDisplayName} 
                                                                src={hostAvatarSrc} 
                                                                size="sm" 
                                                                className={isExpired ? styles.savedImageGrayscale : ''} 
                                                            />
                                                            {(p.host?.isVerifiedVendor || p.isVerifiedVendor) && (
                                                                <span className={styles.vendorCheck} title="Verified Direct Manufacturer / Brand">
                                                                    <span className="material-symbols-outlined" style={{ fontSize: '10px', fontVariationSettings: "'FILL' 1" }}>verified</span>
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className={styles.savedHostLabel}>HOST</p>
                                                            <p className={`${styles.savedHostName} ${isExpired ? styles.savedTitleMuted : ''}`}>
                                                                {hostDisplayName}
                                                                {(p.hostRating || p.host?.rating) && (
                                                                    <span className={styles.savedHostRating}> · {p.hostRating || p.host?.rating} ★</span>
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <button className={`${styles.savedBtnView} ${isExpired ? styles.savedBtnViewExpired : ''}`} onClick={() => router.push(`/pitches/${p.id}`)}>
                                                        Details
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                    })}
                                    {filtered.length === 0 && (
                                        <div className={styles.emptyState} style={{ gridColumn: '1 / -1' }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--outline-variant)' }}>shopping_bag</span>
                                            <p>No pitches found for this filter.</p>
                                        </div>
                                    )}
                                </div>
                                {/* Finding Your People section */}
                                <div className={styles.fyp}>
                                    <div className={styles.fypText}>
                                        <h2 className={styles.fypTitle}>Finding Your People</h2>
                                        <p className={styles.fypDesc}>Participating in pools is how you unlock collective purchasing power. Explore your community&apos;s active pools to save more on quality products and services.</p>
                                        <button className={styles.fypBtn} onClick={() => router.push('/discover')}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>explore</span>
                                            Explore Community Pools
                                        </button>
                                    </div>
                                    <div className={styles.fypQuote}>
                                        <div className={styles.fypQuoteInner}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '3.5rem', color: 'rgba(5,150,105,0.2)', fontVariationSettings: "'FILL' 1" }}>groups</span>
                                            <p className={styles.fypQuoteText}>&ldquo;Community isn&apos;t just a group of people, it&apos;s a shared purpose.&rdquo;</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        );
                    })()}

                    {/* ═══ Hosting Tab ═══ */}
                    {tab === 'hosting' && (() => {
                        const filtered = hostingPitches.filter(p => {
                            if (filter === 'ALL') return true;
                            return p.hostStatus && p.hostStatus.toUpperCase().replace(/_/g, ' ') === filter;
                        });
                        return (
                            <div className={styles.savedGrid}>
                                {filtered.map(p => {
                                    const isDraft = p.hostStatus === 'draft';
                                    const isCompleted = p.hostStatus === 'completed';
                                    const isExpired = p.hostStatus === 'expired';

                                    // Status badge classes
                                    let badgeCls = styles.savedBadgeActive;
                                    if (isDraft) badgeCls = styles.hostBadgeDraft;
                                    else if (isCompleted) badgeCls = styles.hostBadgeCompleted;
                                    else if (isExpired) badgeCls = styles.savedBadgeExpired;

                                    return (
                                        <div key={p.id} className={`${styles.savedCard} ${isDraft && !p.image ? styles.bentoDraft : ''} ${isExpired ? styles.savedCardExpired : ''} ${isDraft && p.image ? styles.bentoDraftReady : ''}`}>
                                            <div className={`${styles.savedImageWrap} ${isExpired ? styles.savedImageGrayscale : ''} ${isDraft && !p.image ? styles.bentoDraftImgWrap : ''}`}>
                                                {p.image ? (
                                                    <img src={p.image} alt={p.title} className={styles.savedImage} />
                                                ) : (
                                                    <div className={styles.savedImagePlaceholder}>
                                                        <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: 'var(--outline-variant)' }}>image_not_supported</span>
                                                    </div>
                                                )}
                                                <span className={`${styles.savedStatusOverlay} ${badgeCls}`}>
                                                    {isDraft ? 'DRAFT' : isCompleted ? 'CLOSED' : isExpired ? 'EXPIRED' : p.hostStatus === 'order_placed' ? 'ORDER PLACED' : p.hostStatus === 'ready_for_pickup' ? 'READY FOR PICKUP' : 'ACTIVE'}
                                                </span>
                                            </div>
                                            <div className={styles.savedBody}>
                                                <div className={styles.savedTitleRow}>
                                                    <div className={styles.textClampWrap}>
                                                        <h3 className={`${styles.savedTitle} ${isExpired ? styles.savedTitleMuted : ''}`}>{p.title}</h3>
                                                        <p className={`${styles.savedDesc} ${isExpired ? styles.savedDescMuted : ''}`}>{p.subtitle}</p>
                                                    </div>
                                                    <span className={`${styles.savedPrice} ${isExpired || (isDraft && !p.costPerUnit) ? styles.savedPriceMuted : ''}`}>
                                                        {p.costPerUnit ? `₹${Number(p.costPerUnit).toLocaleString('en-IN')}` : '₹--'}
                                                        <span className={styles.savedPriceUnit}>/{p.unitType}</span>
                                                    </span>
                                                </div>

                                                {isDraft && (
                                                    <>
                                                        <div className={`${styles.hostDraftNotice} ${p.draftReady ? styles.hostDraftReady : ''}`}>
                                                            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>{p.draftReady ? 'check_circle' : 'info'}</span>
                                                            {p.draftMessage}
                                                        </div>
                                                        <button className={styles.hostEditDraftBtn} onClick={() => router.push(`/pitches/create?draftId=${p.id}`)}>Edit Draft</button>
                                                    </>
                                                )}

                                                {/* Active / Completed state */}
                                                {!isDraft && p.progress && (
                                                    <>
                                                        <div className={styles.savedGoalSection}>
                                                            <div className={styles.savedGoalHeader}>
                                                                <span>{isCompleted ? 'FULLY FUNDED' : isExpired ? 'GOAL NOT MET' : 'PROGRESS'}</span>
                                                                <span className={isExpired ? styles.savedGoalPctMuted : styles.savedGoalPct}>{p.progress.current}/{p.progress.goal} FILLED</span>
                                                            </div>
                                                            <div className={styles.savedGoalTrack}>
                                                                <div className={`${styles.savedGoalFill} ${isExpired ? styles.savedGoalFillMuted : ''} ${isCompleted ? styles.hostProgressCompleted : ''}`} style={{ width: `${p.progress.pct}%` }} />
                                                            </div>
                                                        </div>
                                                        {/* Footer */}
                                                        <div className={styles.savedHostRow}>
                                                            {p.participantAvatars ? (
                                                                <div className={styles.hostAvatarStack}>
                                                                    {p.participantAvatars.map((av, i) => (
                                                                        <img key={i} src={av} alt="" className={styles.hostStackAvatar} />
                                                                    ))}
                                                                    <span className={styles.hostJoinedCount}>+{p.joinedCount} joined</span>
                                                                </div>
                                                            ) : <span />}
                                                            {isExpired ? (
                                                                <button className={styles.hostViewBtn} onClick={() => router.push(`/pitches/${p.id}`)}>View Details</button>
                                                            ) : (
                                                                <button className={`${styles.savedBtnView} ${isCompleted ? styles.hostManageMuted : ''}`} onClick={() => router.push(`/pitches/${p.id}/host-dashboard`)}>Manage</button>
                                                            )}
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                                {filtered.length === 0 && (
                                    <div className={styles.emptyState} style={{ gridColumn: '1 / -1' }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--outline-variant)' }}>storefront</span>
                                        <p>No hosted pitches found for this filter.</p>
                                    </div>
                                )}
                            </div>
                        );
                    })()}

                    {/* ═══ Saved Tab ═══ */}
                    {tab === 'saved' && (() => {
                        const filteredSaved = savedPitches.filter(p =>
                            filter === 'ALL' || (p.savedStatus && p.savedStatus.toUpperCase().replace(/_/g, ' ') === filter)
                        );
                        return (
                            <div className={styles.savedGrid}>
                                {filteredSaved.map(p => {
                                    const isExpired = p.savedStatus === 'expired';
                                    const isCompleted = p.savedStatus === 'completed' || p.savedStatus === 'order_placed';
                                    const statusLabel = p.savedStatus.toUpperCase().replace(/_/g, ' ');
                                    const badgeCls = isExpired ? styles.savedBadgeExpired : isCompleted ? styles.savedBadgeCompleted : styles.savedBadgeActive;

                                    const goalMet = p.committedUnits >= p.minOrder;
                                    const progressLabel = goalMet 
                                        ? `${p.committedUnits}/${p.maxCapacity} FILLED`
                                        : `${p.committedUnits}/${p.minOrder} TO REACH GOAL`;
                                    const pct = goalMet 
                                        ? Math.min(100, (p.committedUnits / p.maxCapacity) * 100) 
                                        : Math.min(100, (p.committedUnits / p.minOrder) * 100);
                                    const hostDisplayName = p.hostName || p.host?.name || 'Community Host';
                                    const hostAvatarSrc = p.hostAvatar || p.host?.avatarUrl;

                                    return (
                                        <div key={p.id} className={`${styles.savedCard} ${isExpired ? styles.savedCardExpired : ''} ${isCompleted ? styles.savedCardCompleted : ''}`}>
                                            <div className={`${styles.savedImageWrap} ${isExpired ? styles.savedImageGrayscale : ''}`}>
                                                {p.image ? (
                                                    <img src={p.image} alt={p.title} className={styles.savedImage} />
                                                ) : (
                                                    <div className={styles.savedImagePlaceholder}>
                                                        <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: 'var(--outline-variant)' }}>image</span>
                                                    </div>
                                                )}
                                                <BookmarkButton initialSaved={true} />
                                                <span className={`${styles.savedStatusOverlay} ${badgeCls}`}>{statusLabel}</span>
                                            </div>
                                            <div className={styles.savedBody}>
                                                <div className={styles.savedTitleRow}>
                                                    <div className={styles.textClampWrap}>
                                                        <h3 className={`${styles.savedTitle} ${isExpired ? styles.savedTitleMuted : ''}`}>{p.title}</h3>
                                                        {p.description && (
                                                            <p className={`${styles.savedDesc} ${isExpired ? styles.savedDescMuted : ''}`}>
                                                                {p.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <span className={`${styles.savedPrice} ${isExpired ? styles.savedPriceMuted : ''}`}>₹{Number(p.costPerUnit || 0).toLocaleString('en-IN')}<span className={styles.savedPriceUnit}>/{p.unitType}</span></span>
                                                </div>

                                                <div className={styles.savedGoalSection}>
                                                    <div className={styles.savedGoalHeader}>
                                                        <span>PROGRESS</span>
                                                        <span className={`${styles.savedGoalPct} ${isExpired ? styles.savedGoalPctMuted : ''}`}>{progressLabel}</span>
                                                    </div>
                                                    <div className={styles.savedGoalTrack}>
                                                        <div className={`${styles.savedGoalFill} ${isExpired ? styles.savedGoalFillMuted : ''}`} style={{ width: `${pct}%` }} />
                                                    </div>
                                                </div>
                                                <div className={styles.savedHostRow}>
                                                    <div className={styles.savedHostInfo}>
                                                        <div className={styles.savedHostAvatarWrap}>
                                                            <Avatar 
                                                                name={hostDisplayName} 
                                                                src={hostAvatarSrc} 
                                                                size="sm" 
                                                                className={isExpired ? styles.savedImageGrayscale : ''} 
                                                            />
                                                            {(p.host?.isVerifiedVendor || p.isVerifiedVendor) && (
                                                                <span className={styles.vendorCheck} title="Verified Direct Manufacturer / Brand">
                                                                    <span className="material-symbols-outlined" style={{ fontSize: '10px', fontVariationSettings: "'FILL' 1" }}>verified</span>
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className={styles.savedHostLabel}>HOST</p>
                                                            <p className={`${styles.savedHostName} ${isExpired ? styles.savedTitleMuted : ''}`}>
                                                                {hostDisplayName}
                                                                {(p.hostRating || p.host?.rating) && (
                                                                    <span className={styles.savedHostRating}> · {p.hostRating || p.host?.rating} ★</span>
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {isExpired ? (
                                                        <button className={styles.savedBtnDisabled}>Expired</button>
                                                    ) : isCompleted ? (
                                                        <button className={styles.savedBtnDisabled}>Closed</button>
                                                    ) : (
                                                        <button className={styles.savedBtnView} onClick={() => router.push(`/pitches/${p.id}`)}>View Details</button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                {filteredSaved.length === 0 && (
                                    <div className={styles.emptyState} style={{ gridColumn: '1 / -1' }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--outline-variant)' }}>bookmark_border</span>
                                        <p>No saved pools found for this filter.</p>
                                    </div>
                                )}
                            </div>
                        );
                    })()}
                </div>
            </main>

            {/* FAB — Create Pitch */}
            <button className={styles.fab} style={{ bottom: 'calc(75px + var(--space-6))', zIndex: 10 }} onClick={() => router.push('/pitches/create')}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
            </button>

            {/* ═══ Bottom Nav — 3 Tabs ═══ */}
            <nav className={styles.myPitchesBottomNav}>
                <button
                    className={`${styles.bnTab} ${tab === 'participating' ? styles.bnTabActive : ''}`}
                    onClick={() => handleTabChange('participating')}
                >
                    <span className="material-symbols-outlined" style={tab === 'participating' ? { fontVariationSettings: "'FILL' 1" } : undefined}>group</span>
                    <span className={styles.bnLabel}>Participating</span>
                </button>
                <button
                    className={`${styles.bnTab} ${tab === 'hosting' ? styles.bnTabActive : ''}`}
                    onClick={() => handleTabChange('hosting')}
                >
                    <span className="material-symbols-outlined" style={tab === 'hosting' ? { fontVariationSettings: "'FILL' 1" } : undefined}>storefront</span>
                    <span className={styles.bnLabel}>Hosting</span>
                </button>
                <button
                    className={`${styles.bnTab} ${tab === 'saved' ? styles.bnTabActive : ''}`}
                    onClick={() => handleTabChange('saved')}
                >
                    <span className="material-symbols-outlined" style={tab === 'saved' ? { fontVariationSettings: "'FILL' 1" } : undefined}>bookmark</span>
                    <span className={styles.bnLabel}>Saved</span>
                </button>
            </nav>
        </>
    );
}

export default function MyPitches() {
    return (
        <AuthGuard>
        <Suspense fallback={<div>Loading...</div>}>
            <MyPitchesContent />
        </Suspense>
        </AuthGuard>
    );
}
