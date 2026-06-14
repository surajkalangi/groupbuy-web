'use client';

import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function PitchPreviewPage() {
    const router = useRouter();

    // In a real app, this data would come from a store/context populated by the create flow
    const previewData = {
        title: 'Heritage Monsoon Mangoes (5kg Box)',
        description: 'Premium Alphonso mangoes sourced directly from Ratnagiri farms. Each box contains hand-picked, naturally ripened mangoes with no chemical treatment. Perfect for the community to enjoy the best of the season at wholesale prices.',
        image: '/images/mango-hero.png',
        price: 600,
        unitType: 'box',
        maxCapacity: 20,
        minOrder: 5,
        committedUnits: 0,
        deadline: '2026-10-24T18:00',
        payment: 'UPI Escrow',
        visibility: 'Public',
        host: { name: 'Aditya Sharma', reputation: 4.9 },
        categories: ['HERITAGE COLLECTION', 'LIMITED BATCH'],
    };

    const handlePublish = () => {
        router.push('/pitches/pitch-1/published');
    };

    const handleSaveDraft = () => {
        router.push('/pitches/create/draft-saved');
    };

    return (
        <main className={styles.page}>
            {/* ── Header ── */}
            <header className={styles.header}>
                <button onClick={() => router.back()} className={styles.closeBtn} aria-label="Close preview">
                    <span className="material-symbols-outlined">close</span>
                </button>
                <span className={styles.headerTitle}>Pitch Preview</span>
                <button onClick={() => router.back()} className={styles.closeLink}>Close Preview</button>
            </header>

            <div className={styles.container}>
                {/* ── Product Image ── */}
                <div className={styles.imageSection}>
                    <img src={previewData.image} alt={previewData.title} className={styles.productImage} />
                    {/* Countdown Badge */}
                    <div className={styles.countdownBadge}>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>timer</span>
                        Ends in 3d
                    </div>
                    {/* Top-Right Action Buttons */}
                    <div className={styles.heroActionRight}>
                        <button className={styles.heroIconBtn} title="Share this pitch">
                            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>share</span>
                        </button>
                        <button className={styles.heroIconBtn} title="Bookmark this pitch">
                            <span className="material-symbols-outlined" style={{ fontSize: '24px', fontVariationSettings: "'FILL' 0", color: 'inherit' }}>bookmark</span>
                        </button>
                    </div>
                </div>

                <div className={styles.detailCard}>
                    {/* ── Header & Description ── */}
                    <div className={styles.cardHeader}>
                        <div>
                            <h1 className={styles.pitchTitle}>{previewData.title}</h1>
                        </div>
                        <div className={styles.priceBox}>
                            <div className={styles.price}>₹{previewData.price}</div>
                            <div className={styles.priceUnit}>per {previewData.unitType}</div>
                        </div>
                    </div>
                    <p className={styles.pitchDescTop}>{previewData.description}</p>

                {/* ── Host Info ── */}
                <div className={styles.hostCard}>
                    <div className={styles.hostLeft}>
                        <div className={styles.hostAvatarWrap}>
                            <div className={styles.hostAvatar}>{previewData.host.name.charAt(0)}</div>
                            <div className={styles.verifiedDot}>
                                <span className="material-symbols-outlined" style={{ fontSize: '12px', color: 'white', fontVariationSettings: "'FILL' 1" }}>verified</span>
                            </div>
                        </div>
                        <div>
                            <div className={styles.hostNameRow}>
                                <span className={styles.hostName}>{previewData.host.name}</span>
                                <span className={styles.verifiedBadge}>VERIFIED HOST</span>
                            </div>
                            <div className={styles.hostRating}>
                                <span className={styles.ratingVal}>New Host</span>
                            </div>
                        </div>
                    </div>
                    <button className={styles.viewClanBtn} aria-label="View Host Profile">
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chevron_right</span>
                    </button>
                </div>

                {/* ── Progress ── */}
                <div className={styles.progressSection}>
                    <div className={styles.progressTop}>
                        <div>
                            <span className={styles.progressSubLabel}>Pitch Progress</span>
                            <span className={styles.progressMain}>
                                0 of {previewData.minOrder || 5} to reach goal
                            </span>
                        </div>
                    </div>
                    <div className={styles.progressTrack}>
                        <div className={styles.progressFill} style={{ width: `0%` }} />
                    </div>
                    <p className={styles.urgencyNote}>
                        Waiting for first participant to join!
                    </p>
                </div>

                {/* ── Pickup Info ── */}
                <div className={styles.pickupCard}>
                    <div className={styles.pickupIcon}>
                        <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>location_on</span>
                    </div>
                    <div>
                        <h4 className={styles.pickupTitle}>Pickup Info</h4>
                        <p className={styles.pickupAddr}>
                            Sector 1, HSR Layout, Bengaluru<br />
                            <strong>Friday, 4:00 PM - 7:00 PM</strong>
                        </p>
                    </div>
                </div>

                {/* ── Pitch Policies ── */}
                <div className={styles.policiesCard}>
                    <div className={styles.policiesHeader}>
                        <span className="material-symbols-outlined" style={{ fontSize: '1.25rem', color: 'var(--primary)' }}>policy</span>
                        <h3 className={styles.policiesTitle}>Pitch Policies</h3>
                    </div>
                    <div className={styles.policiesGrid}>
                        <div className={styles.policyItem}>
                            <div className={styles.policyIconWrap}>
                                <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>assignment_return</span>
                            </div>
                            <div>
                                <span className={styles.policyLabel}>Return Policy</span>
                                <span className={styles.policyValue}>Exchange Only — Within 24h of pickup</span>
                            </div>
                        </div>
                        <div className={styles.policyItem}>
                            <div className={styles.policyIconWrap}>
                                <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>exit_to_app</span>
                            </div>
                            <div>
                                <span className={styles.policyLabel}>Quit / Drop Rules</span>
                                <span className={styles.policyValue}>Free exit before threshold • No quit after order placed</span>
                            </div>
                        </div>
                    </div>
                </div>

                </div> {/* End detailCard */}

                {/* ── Legal Note ── */}
                <p className={styles.legalNote}>
                    By publishing, you agree to fulfill orders once the minimum target is reached.
                    Funds are held in escrow for buyer safety.
                </p>

                {/* ── Action Bar ── */}
                <div className={styles.actionBar}>
                    <button onClick={() => router.back()} className={styles.editBtn}>
                        <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>edit</span>
                        Back to Edit
                    </button>
                    <button onClick={handlePublish} className={styles.publishBtn}>
                        Publish Now
                        <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>rocket_launch</span>
                    </button>
                </div>

                {/* Save as Draft */}
                <button onClick={handleSaveDraft} className={styles.draftBtn}>
                    Save as Draft
                </button>
            </div>
        </main>
    );
}
