'use client';

import { Suspense, use } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import { mockPitches } from '@/data/pitches';
import { pluralizeUnit } from '@/utils/pluralize';
import styles from './page.module.css';
import AuthGuard from '@/components/auth/AuthGuard';

function ConfirmationContent({ pitchId }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pitch = mockPitches.find(p => p.id === pitchId) || mockPitches[0];
    
    // Get actual values from URL
    const qty = parseInt(searchParams.get('qty')) || 2;
    const discount = parseInt(searchParams.get('discount')) || 0;
    
    const subtotal = qty * pitch.costPerUnit;
    const total = subtotal - discount;
    const deliveryDate = 'March 25, 2026'; // Mock date

    const formatUnit = (count, unit) => {
        const pluralized = pluralizeUnit(count, unit);
        return pluralized.charAt(0).toUpperCase() + pluralized.slice(1);
    };

    return (
        <div className={styles.container}>
            {/* Success Icon */}
            <div className={styles.successIcon}>
                <span className="material-symbols-outlined" style={{ fontSize: '36px', color: 'white', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <div className={styles.headerText}>
                <h1 className={styles.heading}>You&apos;re In! 🎉</h1>
                <p className={styles.subtext}>You&apos;ve successfully joined the community pitch.</p>
            </div>

            {/* Order Summary Card */}
            <div className={styles.summaryCard}>
                <div className={styles.productRow}>
                    <div className={styles.productInfo}>
                        <span className={styles.productLabel}>PRODUCT</span>
                        <h3 className={styles.productName}>{pitch.title}</h3>
                    </div>
                    {pitch.image && (
                        <img src={pitch.image} alt={pitch.title} className={styles.productThumb} />
                    )}
                </div>

                <div className={styles.metaGrid}>
                    <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>QUANTITY</span>
                        <span className={styles.metaVal}>{qty} {formatUnit(qty, pitch.unitType)}</span>
                    </div>
                    <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>TOTAL COMMITMENT</span>
                        <span className={`${styles.metaVal} ${styles.metaValBold}`}>₹{total.toLocaleString('en-IN')}</span>
                    </div>
                    <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>EXPECTED DELIVERY</span>
                        <span className={`${styles.metaVal} ${styles.metaValBold}`}>{deliveryDate}</span>
                    </div>
                    <div className={styles.metaItem}>
                        <div className={styles.blockedChip}>
                            <span className="material-symbols-outlined" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>lock</span>
                            ₹{total.toLocaleString('en-IN')} blocked via UPI
                        </div>
                    </div>
                </div>
            </div>

            {/* What happens next */}
            <div className={styles.nextSection}>
                <div className={styles.nextHeader}>
                    <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontVariationSettings: "'FILL' 1", fontSize: '20px' }}>info</span>
                    <h3 className={styles.nextTitle}>What happens next?</h3>
                </div>
                <div className={styles.nextBody}>
                    <p className={styles.nextText}>
                        We&apos;ve temporarily blocked the funds. They will <strong>only be debited</strong> once the community reaches the minimum goal of {pitch.minOrder || 5} {formatUnit(pitch.minOrder || 5, pitch.unitType)}. If the goal isn&apos;t met, the block will be automatically released.
                    </p>
                </div>
            </div>

            {/* Share CTA */}
            <button className={styles.shareBtn}>
                <span className="material-symbols-outlined">share</span>
                Share with friends to reach goal
            </button>

            {/* Actions Group */}
            <div className={styles.actionGroup}>
                <button className={styles.secondaryBtn} onClick={() => router.push(`/pitches/${pitchId}`)}>
                    View Pitch Detail
                </button>
                <button className={styles.homeBtn} onClick={() => router.push('/feed')}>
                    Go to Home
                </button>
            </div>
        </div>
    );
}

export default function Confirmation({ params }) {
    const { pitchId } = use(params);
    
    return (
        <AuthGuard>
        <>
            <Navbar />
            <main className={styles.page}>
                <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading confirmation...</div>}>
                    <ConfirmationContent pitchId={pitchId} />
                </Suspense>
            </main>
        </>
        </AuthGuard>
    );
}
