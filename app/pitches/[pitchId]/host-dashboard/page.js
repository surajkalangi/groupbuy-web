'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { mockPitches } from '@/data/pitches';
import { pluralizeUnit } from '@/utils/pluralize';
import Navbar from '@/components/layout/Navbar';
import BottomNav from '@/components/layout/BottomNav';
import styles from './page.module.css';

const STEPS = ['Activated', 'Order Placed', 'Ready for Pickup', 'Completed'];

const NAMES = ['Meera Nair', 'Rahul Sharma', 'Anjali Verma', 'Kiran Reddy', 'Vikram Singh', 'Pooja Iyer', 'Arjun Das', 'Sneha Patil', 'Rohan Gupta', 'Neha Kapoor'];

function generateParticipants(pitch) {
    if (!pitch.committedUnits) return [];
    const seed = pitch.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const count = Math.min(pitch.committedUnits, (seed % 5) + 3); // 3 to 7 participants max
    const participants = [];
    let remainingUnits = pitch.committedUnits;

    for (let i = 0; i < count; i++) {
        const name = NAMES[(seed + i) % NAMES.length];
        let qty = 1;
        remainingUnits -= 1;

        if (i === count - 1) {
            qty += remainingUnits;
            remainingUnits = 0;
        } else {
            const availableForExtra = remainingUnits - (count - 1 - i);
            if (availableForExtra > 0) {
                const extra = (seed + i) % Math.max(1, Math.floor(availableForExtra / 2) + 1);
                qty += extra;
                remainingUnits -= extra;
            }
        }

        participants.push({
            id: i + 1,
            name,
            clan: pitch.clanName,
            qty,
            payment: 'PAID',
            delivered: (seed + i) % 2 === 0
        });
    }
    return participants;
}

export default function HostDashboardPage({ params }) {
    const { pitchId } = use(params);
    const pitch = mockPitches.find(p => p.id === pitchId) || mockPitches[0];
    const isExpired = pitch.status === 'expired' || (pitch.daysLeft <= 0 && pitch.status === 'active');
    const [currentStep, setCurrentStep] = useState(() => {
        if (pitch.status === 'completed') return 3;
        if (pitch.status === 'activated') return 1;
        return 0; // activated
    });
    const isDeliveryStage = currentStep >= 2;
    const [participants, setParticipants] = useState(() => generateParticipants(pitch));
    const [recentlyRemindedIds, setRecentlyRemindedIds] = useState(new Set());
    const [hasRemindedIds, setHasRemindedIds] = useState(new Set());

    const totalCollected = pitch.committedUnits * pitch.costPerUnit;
    const platformFee = Math.round(totalCollected * 0.02);
    const hostPayout = totalCollected - platformFee;

    const markDelivered = (participantId) => {
        setParticipants(prev => prev.map(p => 
            p.id === participantId ? { ...p, delivered: true } : p
        ));
    };

    const markUncollected = (participantId) => {
        setParticipants(prev => prev.map(p => 
            p.id === participantId ? { ...p, uncollected: true } : p
        ));
    };

    const handleReminder = (participantId) => {
        setRecentlyRemindedIds(prev => new Set(prev).add(participantId));
        setHasRemindedIds(prev => new Set(prev).add(participantId));
        // Revert icon back after 2.5 seconds
        setTimeout(() => {
            setRecentlyRemindedIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(participantId);
                return newSet;
            });
        }, 2500);
    };

    const advanceStep = () => {
        if (currentStep < STEPS.length - 1) setCurrentStep(s => s + 1);
    };

    return (
        <>
            <Navbar />
            <div className={styles.page}>
                {/* Sidebar (desktop only) */}
                <aside className={styles.sidebar}>
                    <div className={styles.sidebarHeader}>
                        <h2 className={styles.sidebarTitle}>Host Portal</h2>
                        <p className={styles.sidebarSub}>Managing 3 active pitches</p>
                    </div>
                    <nav className={styles.sidebarNav}>
                        {[
                            { icon: 'dashboard', label: 'Dashboard', active: true },
                            { icon: 'local_mall', label: 'Active Pitches' },
                            { icon: 'person_search', label: 'Participants' },
                            { icon: 'leaderboard', label: 'Analytics' },
                            { icon: 'settings', label: 'Settings' },
                        ].map(item => (
                            <a key={item.label} href="#" className={`${styles.sidebarLink} ${item.active ? styles.sidebarLinkActive : ''}`}>
                                <span className="material-symbols-outlined">{item.icon}</span>
                                <span>{item.label}</span>
                            </a>
                        ))}
                    </nav>
                </aside>

                <main className={styles.main}>
                    {/* Pitch header */}
                    <section className={styles.pitchHeader}>
                        <div>
                            <nav className={styles.breadcrumb}>
                                <Link href="/pitches" className={styles.breadcrumbLink}>Pitches</Link>
                                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>chevron_right</span>
                                <span>Active Details</span>
                            </nav>
                            <h1 className={styles.pitchTitle}>{pitch.title}</h1>
                            <div className={styles.pitchMeta}>
                                <span className={styles.activatedBadge}>Activated</span>
                                <span className={styles.endsIn}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>
                                        {isExpired ? 'timer_off' : 'schedule'}
                                    </span>
                                    {isExpired ? 'Expired' : pitch.daysLeft > 0 ? `Ends in ${pitch.daysLeft} days` : 'Ends today'}
                                </span>
                            </div>
                        </div>
                        <div className={styles.headerActions}>
                            <Link href={`/pitches/${pitchId}/edit`} className={styles.editBtn}>
                                <span className="material-symbols-outlined">edit</span>
                                Edit Pitch
                            </Link>
                            <button className={styles.chatBtn}>
                                <span className="material-symbols-outlined">forum</span>
                                Pitch Chat
                            </button>
                        </div>
                    </section>

                    {/* Lifecycle stepper */}
                    <section className={styles.stepper}>
                        <div className={styles.stepperTrack}>
                            <div className={styles.stepperLine} style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }} />
                        </div>
                        {STEPS.map((step, i) => (
                            <div key={step} className={styles.stepItem}>
                                <div className={`${styles.stepCircle} ${i <= currentStep ? styles.stepActive : styles.stepInactive}`}>
                                    {i < currentStep ? (
                                        <span className="material-symbols-outlined" style={{ fontSize: '1rem', fontVariationSettings: "'FILL' 1" }}>check</span>
                                    ) : i + 1}
                                </div>
                                <span className={`${styles.stepLabel} ${i <= currentStep ? styles.stepLabelActive : ''}`}>{step}</span>
                            </div>
                        ))}
                    </section>

                    {/* Bento grid */}
                    <div className={styles.bentoGrid}>
                        {/* Collection Summary */}
                        <div className={styles.summaryCard}>
                            <div className={styles.summaryImg}>
                                {pitch.image ? (
                                    <img src={pitch.image} alt={pitch.title} className={styles.summaryImgCover} />
                                ) : (
                                    <div className={styles.summaryImgPlaceholder}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: 'var(--on-surface-variant)' }}>image</span>
                                    </div>
                                )}
                            </div>
                            <div className={styles.summaryInfo}>
                                <h3 className={styles.cardTitle}>Collection Summary</h3>
                                <div className={styles.summaryStats}>
                                    <div className={styles.statBox}>
                                        <p className={styles.statBoxLabel}>Total Collected</p>
                                        <p className={styles.statBoxVal} style={{ color: 'var(--primary)' }}>₹{totalCollected.toLocaleString('en-IN')}</p>
                                    </div>
                                    <div className={styles.statBox}>
                                        <p className={styles.statBoxLabel}>Participation</p>
                                        <p className={styles.statBoxVal} style={{ color: 'var(--secondary)' }}>{pitch.committedUnits}/{pitch.maxCapacity || 20} <span className={styles.statBoxUnit}>{pluralizeUnit(pitch.committedUnits, pitch.unitType)}</span></p>
                                    </div>
                                </div>
                                <div className={styles.progressSection}>
                                    <div className={styles.progressLabels}>
                                        <span>{pitch.committedUnits >= (pitch.minOrder || 5) ? 'Pitch Progress · Goal Met ✓' : 'Pitch Progress'}</span>
                                        <span>{(() => {
                                            const gMet = pitch.committedUnits >= (pitch.minOrder || 5);
                                            const pMax = gMet ? (pitch.maxCapacity || 20) : (pitch.minOrder || 5);
                                            return `${Math.min(100, Math.round((pitch.committedUnits / pMax) * 100))}% ${gMet ? 'Filled' : 'Funded'}`;
                                        })()}</span>
                                    </div>
                                    <div className={styles.progressTrack}>
                                        <div className={styles.progressFill} style={{
                                            width: `${(() => {
                                                const gMet = pitch.committedUnits >= (pitch.minOrder || 5);
                                                const pMax = gMet ? (pitch.maxCapacity || 20) : (pitch.minOrder || 5);
                                                return Math.min(100, (pitch.committedUnits / pMax) * 100);
                                            })()}%`
                                        }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Status Controls */}
                        <div className={styles.controlsCard}>
                            <h3 className={styles.cardTitle}>Status Controls</h3>
                            <div className={styles.controlsBtns}>
                                <button
                                    className={styles.primaryCtaBtn}
                                    onClick={advanceStep}
                                    disabled={currentStep >= STEPS.length - 1 || (currentStep === 2 && !participants.every(p => p.delivered || p.uncollected))}
                                    title={currentStep === 2 && !participants.every(p => p.delivered || p.uncollected) ? "All participants must be marked as Delivered or Uncollected first" : ""}
                                >
                                    <span className="material-symbols-outlined">
                                        {currentStep === 0 ? 'shopping_cart_checkout' : 
                                         currentStep === 1 ? 'inventory_2' : 'done_all'}
                                    </span>
                                    {currentStep === 0 ? 'Mark Order Placed' : currentStep === 1 ? 'Mark Ready for Pickup' : 'Mark Completed'}
                                </button>
                                <button className={styles.secondaryCtaBtn}>
                                    <span className="material-symbols-outlined">local_shipping</span>
                                    Update Tracking
                                </button>
                            </div>
                            <p className={styles.controlsNote}>
                                Update the status to notify all participants via SMS and notification.
                            </p>
                        </div>

                        {/* Participant Checklist */}
                        <div className={styles.checklistCard}>
                            <div className={styles.checklistHeader}>
                                <h3 className={styles.cardTitle}>Participant Checklist</h3>
                                <div className={styles.checklistBadges}>
                                    {isDeliveryStage ? (
                                        <span className={styles.pendingBadge}>{participants.filter(p => !p.delivered).length} Pending Delivery</span>
                                    ) : (
                                        <span className={styles.pendingBadge}>{participants.length} Participants</span>
                                    )}
                                </div>
                            </div>
                            {/* Table header */}
                            <div className={styles.tableHeader} style={!isDeliveryStage ? { gridTemplateColumns: '2.5fr 1fr' } : {}}>
                                <div className={styles.colMember}>Member</div>
                                <div className={styles.colCenter}>Qty</div>
                                {isDeliveryStage && <div className={styles.colRight}>Action</div>}
                            </div>
                            {participants.map(p => (
                                <div key={p.id} className={`${styles.tableRow} ${p.delivered ? styles.rowDelivered : ''}`} style={!isDeliveryStage ? { gridTemplateColumns: '2.5fr 1fr' } : {}}>
                                    <div className={styles.colMember}>
                                        <div className={styles.memberAvatar}>{p.name[0]}</div>
                                        <div>
                                            <p className={styles.memberName}>{p.name}</p>
                                            <p className={styles.memberClan}>CLAN: {p.clan.toUpperCase()}</p>
                                        </div>
                                    </div>
                                    <div className={styles.colCenter}>{p.qty} {pluralizeUnit(p.qty, pitch.unitType)}</div>
                                    {isDeliveryStage && (
                                        <div className={styles.colRight}>
                                            {p.delivered ? (
                                                <span className={styles.deliveredText}>✓ Delivered</span>
                                            ) : p.uncollected ? (
                                                <span className={styles.uncollectedText}>✗ Uncollected</span>
                                            ) : (
                                                <div className={styles.actionGroup}>
                                                    <button className={styles.markDeliveredBtn} onClick={() => markDelivered(p.id)}>Mark Delivered</button>
                                                    <button className={styles.reminderBtn} title="Send Reminder" onClick={() => handleReminder(p.id)}>
                                                        {recentlyRemindedIds.has(p.id) ? (
                                                            <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--primary)' }}>check_circle</span>
                                                        ) : (
                                                            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>notifications_active</span>
                                                        )}
                                                    </button>
                                                    <button className={styles.uncollectedBtn} title="Mark Uncollected" onClick={() => markUncollected(p.id)} disabled={!hasRemindedIds.has(p.id)} style={{ opacity: hasRemindedIds.has(p.id) ? 1 : 0.3, cursor: hasRemindedIds.has(p.id) ? 'pointer' : 'not-allowed' }}>
                                                        <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>block</span>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Settlement Summary */}
                        <div className={styles.settlementCard}>
                            <h3 className={styles.cardTitle}>Settlement Summary</h3>
                            <div className={styles.settlementRows}>
                                <div className={styles.settlementRow}>
                                    <span>Gross Collected</span>
                                    <span>₹{totalCollected.toLocaleString('en-IN')}.00</span>
                                </div>
                                <div className={styles.settlementRow}>
                                    <span>Platform Fee (2%)</span>
                                    <span className={styles.feeAmt}>- ₹{platformFee.toLocaleString('en-IN')}.00</span>
                                </div>
                                <div className={styles.settlementDivider} />
                                <div className={`${styles.settlementRow} ${styles.settlementTotal}`}>
                                    <span>Host Payout</span>
                                    <span className={styles.payoutAmt}>₹{hostPayout.toLocaleString('en-IN')}.00</span>
                                </div>
                            </div>
                            <div className={styles.escrowNote}>
                                <span className="material-symbols-outlined" style={{ color: 'var(--primary)', flexShrink: 0 }}>info</span>
                                <p>Funds are held securely by GroupBuy Escrow and will be released to your linked bank account 24 hours after completion.</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <BottomNav />
        </>
    );
}
