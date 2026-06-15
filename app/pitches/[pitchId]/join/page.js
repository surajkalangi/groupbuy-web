'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import { mockPitches } from '@/data/pitches';
import { pluralizeUnit } from '@/utils/pluralize';
import styles from './page.module.css';
import AuthGuard from '@/components/auth/AuthGuard';


export default function JoinPitch({ params }) {
    const resolvedParams = use(params);
    const router = useRouter();
    const pitch = mockPitches.find(p => p.id === resolvedParams.pitchId) || mockPitches[0];
    const [qty, setQty] = useState(1);
    const [note, setNote] = useState('');

    const subtotal = qty * pitch.costPerUnit;
    const total = subtotal;

    return (
        <AuthGuard>
        <>
            <Navbar />
            <main className={styles.page}>
                <div className={styles.container}>
                    {/* Product Banner */}
                    <div className={styles.productBanner}>
                        {pitch.image ? (
                            <img src={pitch.image} alt={pitch.title} className={styles.bannerImg} />
                        ) : (
                            <div className={styles.bannerPlaceholder}>
                                <span className="material-symbols-outlined" style={{ fontSize: '40px', color: 'var(--outline-variant)' }}>image</span>
                            </div>
                        )}
                        <div className={styles.bannerOverlay}>
                            <span className={styles.bannerEyebrow}>CURRENT PITCH</span>
                            <h1 className={styles.bannerTitle}>{pitch.title}</h1>
                        </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className={styles.qtyRow}>
                        <div>
                            <span className={styles.qtyLabel}>Unit Price</span>
                            <div className={styles.unitPrice}>
                                <span className={styles.unitPriceAmt}>₹{pitch.costPerUnit.toLocaleString('en-IN')}</span>
                                <span className={styles.unitPriceUnit}>/{pitch.unitType}</span>
                            </div>
                        </div>
                        <div className={styles.qtyRight}>
                            <span className={styles.qtyLabel}>Select Quantity</span>
                            <div className={styles.stepper}>
                                <button
                                    className={styles.stepperBtn}
                                    onClick={() => setQty(v => Math.max(1, v - 1))}
                                >
                                    <span className="material-symbols-outlined">remove</span>
                                </button>
                                <span className={styles.stepperVal}>{qty}</span>
                                <button
                                    className={`${styles.stepperBtn} ${styles.stepperBtnActive}`}
                                    onClick={() => setQty(v => Math.min(pitch.totalUnits - pitch.committedUnits, v + 1))}
                                >
                                    <span className="material-symbols-outlined">add</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className={styles.summaryCard}>
                        <div className={styles.summaryRow}>
                            <span className={styles.summaryKey}>Subtotal ({qty} {pluralizeUnit(qty, pitch.unitType)})</span>
                            <span className={styles.summaryVal}>₹{(qty * pitch.costPerUnit).toLocaleString('en-IN')}</span>
                        </div>
                        <div className={styles.divider} />
                        <div className={styles.totalRow}>
                            <span className={styles.totalKey}>Total Amount</span>
                            <div className={styles.totalRight}>
                                <span className={styles.totalAmt}>₹{total.toLocaleString('en-IN')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Note */}
                    <div className={styles.noteSection}>
                        <label className={styles.noteLabel}>Note to Host (Optional)</label>
                        <textarea
                            className={styles.noteInput}
                            rows={3}
                            placeholder="e.g. Please leave at the security gate..."
                            value={note}
                            onChange={e => setNote(e.target.value)}
                        />
                    </div>

                    {/* Policies Agreement */}
                    {pitch.pitchPolicies && (
                        <div className={styles.policyAgreement}>
                            <div className={styles.policyAgreementHeader}>
                                <span className="material-symbols-outlined" style={{ fontSize: '1.125rem', color: 'var(--primary)' }}>policy</span>
                                <span className={styles.policyAgreementTitle}>Pitch Policies</span>
                            </div>
                            <div className={styles.policyRulesList}>
                                <div className={styles.policyRule}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--on-surface-variant)' }}>assignment_return</span>
                                    <span>
                                        {pitch.pitchPolicies.returnPolicy === 'no_returns' && 'No returns — all sales final'}
                                        {pitch.pitchPolicies.returnPolicy === 'exchange_only' && 'Exchange only within 24h of pickup'}
                                        {pitch.pitchPolicies.returnPolicy === 'full_refund_24h' && 'Full refund within 24h of pickup'}
                                        {pitch.pitchPolicies.returnPolicy === 'custom' && (pitch.pitchPolicies.returnPolicyCustom || 'Custom policy')}
                                    </span>
                                </div>
                                <div className={styles.policyRule}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--on-surface-variant)' }}>exit_to_app</span>
                                    <span>
                                        Free exit before threshold{pitch.pitchPolicies.cancellationFeePercent > 0
                                            ? ` · ${pitch.pitchPolicies.cancellationFeePercent}% fee after threshold`
                                            : ''
                                        } · No quit after order placed
                                    </span>
                                </div>
                            </div>
                            <p className={styles.policyConsent}>By joining, you agree to the host's pitch policies.</p>
                        </div>
                    )}

                    {/* CTA */}
                    <button
                        className={styles.confirmBtn}
                        onClick={() => router.push(`/pitches/${pitch.id}/payment?qty=${qty}`)}
                    >
                        Confirm & Pay
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                    <button className={styles.cancelBtn} onClick={() => router.back()}>Cancel</button>

                    {/* Trust Footer */}
                    <div className={styles.trustFooter}>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--primary)', fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                        <span>SAFE & TRUSTED COMMUNITY PURCHASE</span>
                    </div>
                </div>
            </main>
        </>
        </AuthGuard>
    );
}
