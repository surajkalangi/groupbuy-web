'use client';

import { use, Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { mockPitches } from '@/data/pitches';
import { pluralizeUnit } from '@/utils/pluralize';
import Navbar from '@/components/layout/Navbar';
import styles from './page.module.css';

const UPI_APPS = [
    { id: 'gpay', name: 'Google Pay', icon: 'payments', color: '#4285F4' },
    { id: 'phonepe', name: 'PhonePe', icon: 'account_balance_wallet', color: '#5f259f' },
    { id: 'upi', name: 'Pay via UPI ID', icon: 'qr_code_2', color: '#00a1d6' },
];

function PaymentContent({ pitchId }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { isLoggedIn } = useAuth();
    const qty = parseInt(searchParams.get('qty')) || 2;
    
    const pitch = mockPitches.find(p => p.id === pitchId) || mockPitches[0];
    const amount = pitch.costPerUnit * qty;
    
    const [selectedUpi, setSelectedUpi] = useState('gpay');

    return (
        <div className={styles.page}>
            <Navbar backHref={`/pitches/${pitchId}`} />
            
            <main className={styles.main}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Authorize Commitment</h1>
                    <p className={styles.subtitle}>Securing your spot in the pitch.</p>
                </div>

                <div className={styles.card}>
                    {/* Top Row: Pitch Info */}
                    <div className={styles.pitchInfoRow}>
                        <div className={styles.pitchImage} style={{ backgroundImage: `url(${pitch.image})` }} />
                        <div className={styles.pitchDetails}>
                            <span className={styles.eyebrow}>ACTIVE PITCH</span>
                            <h2 className={styles.pitchTitle}>{pitch.title}</h2>
                            <p className={styles.pitchQty}>{qty} {pluralizeUnit(qty, pitch.unitType)}</p>
                        </div>
                        <div className={styles.totalBlock}>
                            <span className={styles.totalEyebrow}>TOTAL PAYABLE</span>
                            <span className={styles.totalAmount}>₹{amount.toLocaleString('en-IN')}</span>
                        </div>
                    </div>

                    {/* Escrow Guarantee */}
                    <div className={styles.escrowBox}>
                        <div className={styles.escrowIconWrap}>
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shield_lock</span>
                        </div>
                        <div className={styles.escrowTextContent}>
                            <h3 className={styles.escrowTitle}>Escrow Trust Guarantee</h3>
                            <p className={styles.escrowText}>
                                Your funds will be <strong>blocked via UPI, NOT debited yet.</strong> Money is only released to the host once delivery is verified by the community. If the pitch goal is not met, your mandate is automatically cancelled at no cost.
                            </p>
                        </div>
                    </div>

                    {/* UPI Selector */}
                    <div className={styles.upiSection}>
                        <h4 className={styles.upiHeading}>Select UPI Mandate App</h4>
                        <div className={styles.upiGrid}>
                            {UPI_APPS.map(app => (
                                <button 
                                    key={app.id} 
                                    className={`${styles.upiBtn} ${selectedUpi === app.id ? styles.activeUpi : ''}`}
                                    onClick={() => setSelectedUpi(app.id)}
                                >
                                    <div className={styles.upiAppIconBox}>
                                        <div className={styles.fakeLogo} style={{ backgroundColor: app.color }}>
                                            <span className="material-symbols-outlined">{app.icon}</span>
                                        </div>
                                    </div>
                                    <span className={styles.upiAppName}>{app.name}</span>
                                    {selectedUpi === app.id && <div className={styles.activeDot} />}
                                </button>
                            ))}
                        </div>
                    </div>



                    {/* CTA */}
                    <button 
                        className={styles.ctaBtn}
                        onClick={() => router.push(`/pitches/${pitchId}/confirmation?qty=${qty}`)}
                    >
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                        Authorize ₹{amount.toLocaleString('en-IN')} via UPI
                    </button>
                </div>

                {/* Footer Security Badges */}
                <div className={styles.securityFooter}>
                    <div className={styles.secBadge}>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                        PCI DSS COMPLIANT
                    </div>
                    <div className={styles.secBadge}>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance</span>
                        SECURE ESCROW
                    </div>
                    <div className={styles.secBadge}>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
                        ENCRYPTED
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function PaymentPage({ params }) {
    const { pitchId } = use(params);
    return (
        <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading payment details...</div>}>
            <PaymentContent pitchId={pitchId} />
        </Suspense>
    );
}
