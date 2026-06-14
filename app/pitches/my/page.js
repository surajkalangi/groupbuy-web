'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import { mockPitches } from '@/data/pitches';
import styles from '../page.module.css';

const PARTICIPATING_FILTERS = ['ALL', 'ACTIVE', 'READY FOR PICKUP', 'COMPLETED', 'EXPIRED'];
const HOSTING_FILTERS = ['ALL', 'ACTIVE', 'ORDER PLACED', 'READY FOR PICKUP', 'DRAFT', 'COMPLETED', 'EXPIRED'];
const SAVED_FILTERS = ['ALL', 'ACTIVE', 'ORDER PLACED', 'COMPLETED', 'EXPIRED'];

// Mock "my pitches" entries — participating
const participatingPitches = [
    {
        ...mockPitches[0],
        myStatus: 'active',
        subtitle: 'Weekly Harvest Delivery',
        progress: { current: 42, goal: 50, pct: 84 },
        hostName: 'Anjali Sharma',
        hostAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCz9umOT1LFOzjA53RJh5tEcpJAmw9NI1vv2sPwVa8nsdkkC7Vz1fvobnNcCxMb5tDCadgrf-Eo4bSunI_GjECp3rpcyaaP76TNtcEeB8oF8HI2TnZAWG0s2kDE9xFJ4EJvxmzeVMvenl8Vd7johfJNO2L1hDrR5g5t9HDOdO9uSSXJ5-X5wpb94rBlqXvj16nZM2G4lCpwfVHHTD2svkWUiHD4fT2cgeoEkuG4lBpYI2eyFsFWS27AjfnkmW8pW-7RptV3VmiJWAiN',
    },
    {
        ...mockPitches[2],
        clanName: 'Tech Park West',
        myStatus: 'active',
        subtitle: 'Boutique Bakery Batch',
        isSaved: false,
        progress: { current: 28, goal: 30, pct: 93 },
        hostName: 'Arjun Reddy',
        hostAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWqt_1DI18gIO24KOi28x5cnH4LXoVbznWkcblOLlPyUcNF42jYxrKeyQ7Q2QFqv9MjJn6XGlrq_TmstJ_OtgWGQSK74YegVmSczJtB6Q_uK2Y3l2ny-2H6jN0vAZHuJDZfGDmhpbIeOrFOJeMq3UrY6lakZpBN7bR3H-NVMDXOC9mHj3ahFbRh1c8KISyI_yRfrWjyOEnHzdDDD8sYikL4Axs_0xyFrBaIscFx8flZY2v9oMMJF_ah74wtw0BXzW8RM78WFyCtBiv',
    },
    {
        ...mockPitches[1],
        myStatus: 'active',
        subtitle: 'Plant-based detergents',
        progress: { current: 4, goal: 10, pct: 40 },
        hostName: 'Rahul Verma',
        hostAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMjOUyrqzPmv55DYufWdACwTYtwBWz-OOAQ1W9OGtYhcI-1KY6imGOMvlVagEHQumDjBtNvi0hqrpd2luTISscJoYySI0nmdMb6pSgsQAUF1hjQuJkG5ED6M-JXVDdFq96yE7fgjmde6Y47fYs8NoUrgpjNckOXUeyEEjLXjKT_FwlFEBc7D2yXnZtV5bsO_RSHwiZkuTw4tZpkNhDeHy-OQou3GDDEPJsbJullLYbNpekhVgHlbHiy2yPCEl4tmcoiKXyMWR-bWe6',
    },
];

// Mock hosting pitches
const hostingPitches = [
    {
        ...mockPitches[0],
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
        ...mockPitches[2],
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
        ...mockPitches[3],
        id: 'pitch-5',
        title: 'Handcrafted Ceramic Mugs',
        costPerUnit: 350,
        unitType: 'mug',
        image: '/images/ceramic_mugs.png',
        hostStatus: 'expired',
        subtitle: 'Rustic, speckled glaze ceramic coffee mugs.',
        progress: { current: 6, goal: 10, pct: 60 },
    },
];

// Mock saved pitches
const savedPitches = [
    {
        ...mockPitches[0],
        savedStatus: 'active',
        timeLeft: '2D 14H LEFT',
        goalPercent: 85,
        hostName: 'Anjali Sharma',
        hostAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCz9umOT1LFOzjA53RJh5tEcpJAmw9NI1vv2sPwVa8nsdkkC7Vz1fvobnNcCxMb5tDCadgrf-Eo4bSunI_GjECp3rpcyaaP76TNtcEeB8oF8HI2TnZAWG0s2kDE9xFJ4EJvxmzeVMvenl8Vd7johfJNO2L1hDrR5g5t9HDOdO9uSSXJ5-X5wpb94rBlqXvj16nZM2G4lCpwfVHHTD2svkWUiHD4fT2cgeoEkuG4lBpYI2eyFsFWS27AjfnkmW8pW-7RptV3VmiJWAiN',
    },
    {
        ...mockPitches[1],
        savedStatus: 'order_placed',
        timeLeft: 'SUCCESSFULLY FUNDED',
        goalPercent: 100,
        hostName: 'Rahul Verma',
        hostAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMjOUyrqzPmv55DYufWdACwTYtwBWz-OOAQ1W9OGtYhcI-1KY6imGOMvlVagEHQumDjBtNvi0hqrpd2luTISscJoYySI0nmdMb6pSgsQAUF1hjQuJkG5ED6M-JXVDdFq96yE7fgjmde6Y47fYs8NoUrgpjNckOXUeyEEjLXjKT_FwlFEBc7D2yXnZtV5bsO_RSHwiZkuTw4tZpkNhDeHy-OQou3GDDEPJsbJullLYbNpekhVgHlbHiy2yPCEl4tmcoiKXyMWR-bWe6',
    },
    {
        ...mockPitches[3],
        savedStatus: 'expired',
        timeLeft: 'ENDED 2 DAYS AGO',
        goalPercent: 42,
        hostName: 'Vikram Singh',
        hostAvatar: null,
    },
];

const SUBTITLES = {
    participating: "Review and track the community group-buys you're currently participating.",
    hosting: 'Manage your active community pitches and track group buying progress.',
    saved: 'Managing your saved community collective buys.',
};

const TITLES = {
    participating: 'My Pitches',
    hosting: 'Hosting Dashboard',
    saved: 'My Pitches',
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
            aria-label={isSaved ? "Remove from saved" : "Save pitch"}
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
        router.push(`/pitches/my?tab=${newTab}`);
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
                            filter === 'ALL' || p.myStatus.toUpperCase() === filter
                        );
                        return (
                            <>
                                <div className={styles.savedGrid}>
                                    {filtered.map(p => {
                                        const goalMet = p.committedUnits >= p.minOrder;
                                        const progressLabel = goalMet 
                                            ? `${p.committedUnits}/${p.maxCapacity} FILLED`
                                            : `${p.committedUnits}/${p.minOrder} TO REACH GOAL`;
                                        const pct = goalMet 
                                            ? Math.min(100, (p.committedUnits / p.maxCapacity) * 100) 
                                            : Math.min(100, (p.committedUnits / p.minOrder) * 100);

                                        return (
                                        <div key={p.id} className={styles.savedCard}>
                                            <div className={styles.savedImageWrap}>
                                                {p.image ? (
                                                    <img src={p.image} alt={p.title} className={styles.savedImage} />
                                                ) : (
                                                    <div className={styles.savedImagePlaceholder}>
                                                        <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: 'var(--outline-variant)' }}>image</span>
                                                    </div>
                                                )}
                                                <span className={`${styles.savedStatusOverlay} ${styles.savedBadgeActive} ${styles.clanBadgeOverlay}`}>{p.clanName}</span>
                                                <BookmarkButton initialSaved={p.isSaved !== false} />
                                            </div>
                                            <div className={styles.savedBody}>
                                                <div className={styles.savedTitleRow}>
                                                    <div className={styles.textClampWrap}>
                                                        <h3 className={styles.savedTitle}>{p.title}</h3>
                                                        <p className={styles.savedDesc}>{p.subtitle}</p>
                                                    </div>
                                                    <span className={styles.savedPrice}>₹{p.costPerUnit?.toLocaleString('en-IN')}<span className={styles.savedPriceUnit}>/{p.unitType}</span></span>
                                                </div>
                                                <div className={styles.savedGoalSection}>
                                                    <div className={styles.savedGoalHeader}>
                                                        <span>PROGRESS</span>
                                                        <span className={styles.savedGoalPct}>{progressLabel}</span>
                                                    </div>
                                                    <div className={styles.savedGoalTrack}>
                                                        <div className={styles.savedGoalFill} style={{ width: `${pct}%` }} />
                                                    </div>
                                                </div>
                                                <div className={styles.savedHostRow}>
                                                    <div className={styles.savedHostInfo}>
                                                        {p.hostAvatar ? (
                                                            <img src={p.hostAvatar} alt={p.hostName} className={styles.savedHostAvatar} />
                                                        ) : (
                                                            <div className={styles.savedHostAvatarPlaceholder}>
                                                                <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--on-surface-variant)' }}>person</span>
                                                            </div>
                                                        )}
                                                        <div>
                                                            <p className={styles.savedHostLabel}>HOST</p>
                                                            <p className={styles.savedHostName}>{p.hostName}</p>
                                                        </div>
                                                    </div>
                                                    <button className={styles.savedBtnView} onClick={() => router.push(`/pitches/${p.id}`)}>Details</button>
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
                                        <p className={styles.fypDesc}>Participating in pitches is how you unlock collective purchasing power. Explore your neighborhood&apos;s active pitches to save more on high-quality essentials.</p>
                                        <button className={styles.fypBtn} onClick={() => router.push('/discover')}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>explore</span>
                                            Explore Community Pitches
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
                            return p.hostStatus.toUpperCase().replace(/_/g, ' ') === filter;
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
                                                        {p.costPerUnit ? `₹${p.costPerUnit.toLocaleString('en-IN')}` : '₹--'}
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
                            filter === 'ALL' || p.savedStatus.toUpperCase().replace(/_/g, ' ') === filter
                        );
                        return (
                            <div className={styles.savedGrid}>
                                {filteredSaved.map(p => {
                                    const isExpired = p.savedStatus === 'expired';
                                    const isCompleted = p.savedStatus === 'completed' || p.savedStatus === 'order_placed';
                                    const statusLabel = p.savedStatus.toUpperCase().replace(/_/g, ' ');
                                    const statusIcon = isCompleted ? 'check_circle' : isExpired ? 'history' : 'schedule';
                                    const badgeCls = isExpired ? styles.savedBadgeExpired : isCompleted ? styles.savedBadgeCompleted : styles.savedBadgeActive;

                                    const goalMet = p.committedUnits >= p.minOrder;
                                    const progressLabel = goalMet 
                                        ? `${p.committedUnits}/${p.maxCapacity} FILLED`
                                        : `${p.committedUnits}/${p.minOrder} TO REACH GOAL`;
                                    const pct = goalMet 
                                        ? Math.min(100, (p.committedUnits / p.maxCapacity) * 100) 
                                        : Math.min(100, (p.committedUnits / p.minOrder) * 100);

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
                                                    <span className={`${styles.savedPrice} ${isExpired ? styles.savedPriceMuted : ''}`}>₹{p.costPerUnit}<span className={styles.savedPriceUnit}>/{p.unitType}</span></span>
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
                                                        {p.hostAvatar ? (
                                                            <img src={p.hostAvatar} alt={p.hostName} className={styles.savedHostAvatar} />
                                                        ) : (
                                                            <div className={styles.savedHostAvatarPlaceholder}>
                                                                <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--on-surface-variant)' }}>person</span>
                                                            </div>
                                                        )}
                                                        <div>
                                                            <p className={styles.savedHostLabel}>HOST</p>
                                                            <p className={`${styles.savedHostName} ${isExpired ? styles.savedTitleMuted : ''}`}>{p.hostName}</p>
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
                                        <p>No saved pitches found for this filter.</p>
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
        <Suspense fallback={<div>Loading...</div>}>
            <MyPitchesContent />
        </Suspense>
    );
}
