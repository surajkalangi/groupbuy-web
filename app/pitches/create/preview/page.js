'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import AuthGuard from '@/components/auth/AuthGuard';
import { useAuth } from '@/context/AuthContext';
import { pluralizeUnit } from '@/utils/pluralize';

export default function PitchPreviewPage() {
    const router = useRouter();
    const { currentUser } = useAuth();
    const [previewData, setPreviewData] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const rawDraft = sessionStorage.getItem('letsstack_draft_pitch');
            if (rawDraft) {
                try {
                    const parsed = JSON.parse(rawDraft);
                    setPreviewData(parsed);
                } catch (e) {
                    console.error('Error parsing draft preview:', e);
                }
            }
        }
    }, []);

    // Fallback if accessed without prior create step
    const data = previewData || {
        title: 'Daikin 1.5 Ton 5 Star Inverter Split AC (Free Installation & Copper Piping)',
        category: 'electronics',
        description: 'Daikin 1.5 Ton 5-Star Inverter Split AC (Copper Condenser, PM 2.5 Filter). By pooling 4+ unit orders directly with the regional distributor, we got the price down to ₹38,500/unit (Amazon retail ₹45,990). Includes free standard installation, 4m heavy copper piping, and outdoor wall bracket for society residents.',
        image: '/images/split-inverter-ac.jpg',
        price: 38500,
        costPerUnit: 38500,
        retailPrice: 45990,
        unitType: 'unit',
        maxCapacity: 6,
        minOrder: 4,
        committedUnits: 0,
        deadline: '2026-10-24T18:00',
        paymentMode: 'upi',
        deliveryType: 'doorstep',
        doorstepLocations: ['Hitec City', 'Gachibowli', 'Madhapur', 'Tellapur', 'Whitefields'],
        pickupInfo: {
            address: 'Free on-site measurement & installation at Ravidham Complex',
            locality: 'Whitefields',
            city: 'Bengaluru',
            lat: 12.9829,
            lng: 77.7456,
            time: 'Measurement this weekend, installation within 3 days',
        },
        pitchPolicies: {
            returnPolicy: 'custom',
            returnPolicyCustom: 'Brand warranty: 1-year comprehensive, 5-year PCB, 10-year compressor warranty from Daikin India.',
            cancellationFeePercent: 0,
            sellerName: 'Daikin Regional Authorised Distributor',
        },
        host: { name: currentUser?.name || 'Suraj Kalangi', rating: 4.8, isVerifiedVendor: currentUser?.isVerifiedVendor || false },
    };

    const handlePublish = () => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('letsstack_published_pitch', JSON.stringify(data));
        }
        router.push('/pitches/pitch-1/published');
    };

    const handleSaveDraft = () => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('letsstack_draft_pitch', JSON.stringify(data));
        }
        router.push('/pitches/create/draft-saved');
    };

    const unitPrice = data.costPerUnit || data.price || 0;
    const retailPrice = data.retailPrice || 0;
    const savingsPercent = retailPrice > unitPrice && unitPrice > 0
        ? Math.round(((retailPrice - unitPrice) / retailPrice) * 100)
        : null;

    const returnPolicyLabels = {
        instant_rejection_at_delivery: 'Instant Inspection & Handover Rejection',
        '7_days_replacement': '7-Day Replacement Guarantee',
        no_returns: 'No Returns / Final Sale (Perishables)',
        custom: 'Custom Host / Vendor Terms',
    };

    return (
        <AuthGuard>
            <main className={styles.page}>
                {/* ── Header ── */}
                <header className={styles.header}>
                    <button onClick={() => router.back()} className={styles.closeBtn} aria-label="Close preview" type="button">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                    <span className={styles.headerTitle}>Pool Live Preview</span>
                    <button onClick={() => router.back()} className={styles.closeLink} type="button">Back to Edit</button>
                </header>

                <div className={styles.container}>
                    {/* ── Product Image ── */}
                    <div className={styles.imageSection}>
                        <img
                            src={data.image || data.photos?.[0] || '/images/farm-mango-crates.jpg'}
                            alt={data.title}
                            className={styles.productImage}
                        />
                        {/* Countdown Badge */}
                        <div className={styles.countdownBadge}>
                            <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>timer</span>
                            Active Deal • Open for commitments
                        </div>
                        {/* Top-Right Action Buttons */}
                        <div className={styles.heroActionRight}>
                            <button className={styles.heroIconBtn} title="Share this pool" type="button">
                                <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>share</span>
                            </button>
                            <button className={styles.heroIconBtn} title="Save this pool" type="button">
                                <span className="material-symbols-outlined" style={{ fontSize: '24px', fontVariationSettings: "'FILL' 0", color: 'inherit' }}>bookmark</span>
                            </button>
                        </div>
                    </div>

                    <div className={styles.detailCard}>
                        {/* ── Header & Description ── */}
                        <div className={styles.cardHeader}>
                            <div>
                                <h1 className={styles.pitchTitle}>{data.title}</h1>
                                {savingsPercent !== null && (
                                    <div style={{ marginTop: '0.35rem' }}>
                                        <span style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.25rem',
                                            padding: '0.2rem 0.55rem',
                                            borderRadius: '999px',
                                            background: 'rgba(16, 185, 129, 0.15)',
                                            color: '#047857',
                                            fontSize: '0.75rem',
                                            fontWeight: '700'
                                        }}>
                                            🏷️ Save {savingsPercent}% vs Retail MRP (₹{retailPrice})
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className={styles.priceBox}>
                                <div className={styles.price}>₹{unitPrice.toLocaleString('en-IN')}</div>
                                <div className={styles.priceUnit}>per {data.unitType}</div>
                            </div>
                        </div>
                        <p className={styles.pitchDescTop}>{data.description}</p>

                        {/* ── Host Info ── */}
                        <div className={styles.hostCard}>
                            <div className={styles.hostLeft}>
                                <div className={styles.hostAvatarWrap}>
                                    <div className={styles.hostAvatar}>
                                        {data.host?.name?.charAt(0) || 'H'}
                                    </div>
                                    <div className={styles.verifiedDot}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '12px', color: 'white', fontVariationSettings: "'FILL' 1" }}>
                                            {data.pitchPolicies?.isVerifiedVendor ? 'verified' : 'check'}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <div className={styles.hostNameRow}>
                                        <span className={styles.hostName}>{data.host?.name || 'You (Host)'}</span>
                                        {data.pitchPolicies?.isVerifiedVendor ? (
                                            <span className={styles.verifiedBadge} style={{ background: '#2563eb', color: 'white' }}>
                                                ✓ VERIFIED PARTNER
                                            </span>
                                        ) : (
                                            <span className={styles.verifiedBadge}>COMMUNITY HOST</span>
                                        )}
                                    </div>
                                    <div className={styles.hostRating}>
                                        <span className={styles.ratingVal}>⭐ {data.host?.rating || '5.0'} Rating</span>
                                        {data.pitchPolicies?.sellerName && (
                                            <span style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', marginLeft: '0.5rem' }}>
                                                • Sourced via {data.pitchPolicies.sellerName}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── Progress Goal ── */}
                        <div className={styles.progressSection}>
                            <div className={styles.progressTop}>
                                <div>
                                    <span className={styles.progressSubLabel}>Pool Progress</span>
                                    <span className={styles.progressMain}>
                                        0 of {data.minOrder || 5} {pluralizeUnit(Number(data.minOrder) || 2, data.unitType)} to reach goal
                                    </span>
                                </div>
                                <span style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--primary)' }}>
                                    Cap: {data.maxCapacity} {pluralizeUnit(Number(data.maxCapacity) || 2, data.unitType)}
                                </span>
                            </div>
                            <div className={styles.progressTrack}>
                                <div className={styles.progressFill} style={{ width: `0%` }} />
                            </div>
                            <p className={styles.urgencyNote}>
                                Target Goal: ₹{((Number(data.minOrder) || 5) * unitPrice).toLocaleString('en-IN')} held in safe escrow.
                            </p>
                        </div>

                        {/* ── Fulfillment & Delivery Card ── */}
                        <div className={styles.pickupCard}>
                            <div className={styles.pickupIcon}>
                                <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>
                                    {data.deliveryType === 'doorstep' ? 'doorbell' : data.deliveryType === 'pan_india' ? 'package_2' : data.deliveryType === 'digital' ? 'devices' : 'location_on'}
                                </span>
                            </div>
                            <div>
                                <h4 className={styles.pickupTitle}>
                                    {data.deliveryType === 'doorstep' && '🚚 Doorstep Delivery'}
                                    {data.deliveryType === 'pickup' && '📍 Community Pickup Point'}
                                    {data.deliveryType === 'pan_india' && '📦 Pan-India Courier Delivery'}
                                    {data.deliveryType === 'digital' && '💻 Digital / Cloud Access'}
                                </h4>

                                {data.deliveryType === 'doorstep' && (
                                    <div>
                                        <p className={styles.pickupAddr}>
                                            Direct delivery to flat / doorstep across designated localities.
                                        </p>
                                        {data.doorstepLocations?.length > 0 && (
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.35rem' }}>
                                                {data.doorstepLocations.map(loc => (
                                                    <span key={loc} style={{
                                                        padding: '0.15rem 0.5rem',
                                                        borderRadius: '999px',
                                                        background: 'rgba(0, 135, 90, 0.12)',
                                                        color: '#00704a',
                                                        fontSize: '0.7rem',
                                                        fontWeight: '600',
                                                    }}>
                                                        📍 {loc}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {data.deliveryType === 'pickup' && (
                                    <p className={styles.pickupAddr}>
                                        {data.pickupInfo?.address || 'Community Clubhouse / Gate Drop'}<br />
                                        <strong>{data.pickupInfo?.time || 'Scheduled pickup slot'}</strong> • {data.pickupInfo?.locality}, {data.pickupInfo?.city}
                                    </p>
                                )}

                                {data.deliveryType === 'pan_india' && (
                                    <p className={styles.pickupAddr}>
                                        Dispatched via courier across all states in India. Tracking link shared upon dispatch.
                                    </p>
                                )}

                                {data.deliveryType === 'digital' && (
                                    <p className={styles.pickupAddr}>
                                        Instant activation license or invite delivered via email / secure app notification.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* ── Pitch Policies (PRD Section 3.6.2) ── */}
                        <div className={styles.policiesCard}>
                            <div className={styles.policiesHeader}>
                                <span className="material-symbols-outlined" style={{ fontSize: '1.25rem', color: 'var(--primary)' }}>policy</span>
                                <h3 className={styles.policiesTitle}>Pool Policies & Buyer Protection</h3>
                            </div>
                            <div className={styles.policiesGrid}>
                                <div className={styles.policyItem}>
                                    <div className={styles.policyIconWrap}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>assignment_return</span>
                                    </div>
                                    <div>
                                        <span className={styles.policyLabel}>Return Policy</span>
                                        <span className={styles.policyValue}>
                                            {returnPolicyLabels[data.pitchPolicies?.returnPolicy] || 'Inspection & Return Guaranteed'}
                                        </span>
                                    </div>
                                </div>

                                <div className={styles.policyItem}>
                                    <div className={styles.policyIconWrap}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>lock</span>
                                    </div>
                                    <div>
                                        <span className={styles.policyLabel}>Payment Escrow</span>
                                        <span className={styles.policyValue}>
                                            {data.paymentMode === 'upi' ? 'UPI Escrow Protected' : 'Cash on Delivery'}
                                        </span>
                                    </div>
                                </div>

                                {data.pitchPolicies?.returnPolicyCustom && (
                                    <div className={styles.policyItem} style={{ gridColumn: '1 / -1' }}>
                                        <div className={styles.policyIconWrap}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>notes</span>
                                        </div>
                                        <div>
                                            <span className={styles.policyLabel}>Specific Terms</span>
                                            <span className={styles.policyValue}>{data.pitchPolicies.returnPolicyCustom}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ── Action Buttons ── */}
                        <div className={styles.actions}>
                            <button className={styles.editBtn} onClick={() => router.back()} type="button">
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>edit</span>
                                Back to Edit
                            </button>
                            <button className={styles.publishBtn} onClick={handlePublish} type="button">
                                Publish Pool Now 🚀
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </AuthGuard>
    );
}
