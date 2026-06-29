'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { mockPitches } from '@/data/pitches';
import { mockClans } from '@/data/clans';
import { pluralizeUnit } from '@/utils/pluralize';
import styles from './page.module.css';
import AuthGuard from '@/components/auth/AuthGuard';

export default function EditPitchPage() {
    const { pitchId } = useParams();
    const router = useRouter();
    const pitch = mockPitches.find(p => p.id === pitchId) || mockPitches[0];

    const hasParticipants = pitch.committedUnits > 0;
    const goalTarget = pitch.minOrder || 5;
    const maxCap = pitch.maxCapacity || 20;
    const goalMet = pitch.committedUnits >= goalTarget;
    const progressMax = goalMet ? maxCap : goalTarget;
    const progressPct = Math.min(100, Math.round((pitch.committedUnits / progressMax) * 100));

    // Store original values for directional validation
    const originalCostPerUnit = pitch.costPerUnit || 0;
    const originalMinOrder = pitch.minOrder || 5;

    const initialFormData = useMemo(() => ({
        title: pitch.title,
        description: pitch.description || '',
        productLink: pitch.productLink || '',
        sellerName: pitch.pitchPolicies?.sellerName || '',
        sellerId: pitch.pitchPolicies?.sellerId || '',
        deadline: pitch.deadline?.split('T')[0] || '',
        pickupInstructions: pitch.pickupInfo
            ? `Pickup at ${pitch.pickupInfo.address} between ${pitch.pickupInfo.time}. Please bring your own carry bags.`
            : '',
        returnPolicy: pitch.pitchPolicies?.returnPolicy || 'no_returns',
        returnPolicyCustom: pitch.pitchPolicies?.returnPolicyCustom || '',
        cancellationFeePercent: pitch.pitchPolicies?.cancellationFeePercent ?? 10,
        discussionEnabled: false,
        estimatedSavings: pitch.estimatedSavings || '22',
        costPerUnit: pitch.costPerUnit || 0,
        minOrder: pitch.minOrder || 5,
        maxCapacity: pitch.maxCapacity || 20,
        paymentMode: pitch.paymentMode || 'upi',
        visibility: pitch.visibility || 'public',
        selectedClans: pitch.clanId ? [pitch.clanId] : [],
    }), [pitch]);

    const [formData, setFormData] = useState(initialFormData);

    const changedFields = useMemo(() => {
        const changes = [];
        const labelMap = {
            title: 'Title',
            description: 'Description',
            productLink: 'Product Link',
            sellerName: 'Seller Name',
            sellerId: 'Seller Verification',
            deadline: 'Deadline',
            pickupInstructions: 'Pickup Instructions',
            returnPolicy: 'Return Policy',
            returnPolicyCustom: 'Custom Return Policy',
            cancellationFeePercent: 'Cancellation Fee',
            discussionEnabled: 'Q&A Board',
            estimatedSavings: 'Estimated Savings',
            costPerUnit: 'Cost per Unit',
            minOrder: 'Min. Order Goal',
            maxCapacity: 'Max Capacity',
            paymentMode: 'Payment Mode',
            visibility: 'Visibility'
        };

        Object.keys(initialFormData).forEach(key => {
            if (key === 'selectedClans') {
                const initSet = new Set(initialFormData.selectedClans);
                const currSet = new Set(formData.selectedClans);
                if (initSet.size !== currSet.size || [...initSet].some(id => !currSet.has(id))) {
                    changes.push('Selected Clans');
                }
            } else if (formData[key] !== initialFormData[key]) {
                changes.push(labelMap[key] || key);
            }
        });
        return changes;
    }, [formData, initialFormData]);

    const [showClanDropdown, setShowClanDropdown] = useState(false);
    const clanDropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (clanDropdownRef.current && !clanDropdownRef.current.contains(e.target)) {
                setShowClanDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleClan = (clanId) => {
        setFormData(prev => ({
            ...prev,
            selectedClans: prev.selectedClans.includes(clanId)
                ? prev.selectedClans.filter(id => id !== clanId)
                : [...prev.selectedClans, clanId]
        }));
    };

    const removeClan = (clanId) => {
        setFormData(prev => ({
            ...prev,
            selectedClans: prev.selectedClans.filter(id => id !== clanId)
        }));
    };

    const gallery = pitch.gallery || (pitch.image ? [pitch.image] : []);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const formatIN = (val) => {
        if (val === '' || val === null || val === undefined) return '';
        const str = String(val).replace(/,/g, '').replace(/\./g, '');
        if (isNaN(Number(str))) return val;
        return new Intl.NumberFormat('en-IN').format(Number(str));
    };

    // Directional validation for cost (can only reduce)
    const handleCostChange = (rawValue) => {
        const value = rawValue.replace(/,/g, '').replace(/\./g, '');
        if (value !== '' && isNaN(Number(value))) return;
        const numVal = Number(value);
        if (hasParticipants && numVal > originalCostPerUnit) return;
        handleChange('costPerUnit', value);
    };

    // Directional validation for min order (can only lower)
    const handleMinOrderChange = (rawValue) => {
        const value = rawValue.replace(/,/g, '').replace(/\./g, '');
        if (value !== '' && isNaN(Number(value))) return;
        const numVal = Number(value);
        if (hasParticipants && numVal > originalMinOrder) return;
        handleChange('minOrder', value);
    };

    // Directional validation for max capacity (can only increase, min = committedUnits)
    const handleMaxCapacityChange = (rawValue) => {
        const value = rawValue.replace(/,/g, '').replace(/\./g, '');
        if (value !== '' && isNaN(Number(value))) return;
        const numVal = Number(value);
        if (hasParticipants && numVal < pitch.committedUnits) return;
        handleChange('maxCapacity', value);
    };

    const handleEstimatedSavingsChange = (value) => {
        let val = value;
        if (val !== '') {
            const num = parseInt(val, 10);
            if (isNaN(num)) return;
            if (num < 0) val = '0';
            else if (num > 99) val = '99';
            else val = num.toString();
        }
        handleChange('estimatedSavings', val);
    };

    const handleSave = () => {
        router.push(`/pitches/${pitchId}`);
    };

    return (
        <AuthGuard>
        <>
            {/* Sticky Edit Header */}
            <header className={styles.editHeader}>
                <div className={styles.editHeaderInner}>
                    <div className={styles.topBarLeft}>
                        <button onClick={() => router.back()} className={styles.backBtn} aria-label="Go back">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                        <h1 className={styles.topBarTitle}>Edit Pitch</h1>
                    </div>
                    <button className={styles.moreBtn}>
                        <span className="material-symbols-outlined">more_vert</span>
                    </button>
                </div>
            </header>
            <main className={styles.page}>
                <div className={styles.container}>

                    {/* Progress + Locked Warning Banner */}
                    <section className={styles.progressBanner}>
                        <div className={styles.progressSide}>
                            <div className={styles.progressHeadRow}>
                                <h2 className={styles.progressHeading}>Pitch Progress</h2>
                            </div>
                            <p className={styles.progressSubtext}>
                                {goalMet
                                    ? (pitch.committedUnits >= maxCap
                                        ? `🎉 Max capacity reached! All ${maxCap} ${pluralizeUnit(maxCap, pitch.unitType)} have been filled.`
                                        : `🎉 Goal reached! ${pitch.committedUnits} of ${maxCap} ${pluralizeUnit(maxCap, pitch.unitType)} filled toward max capacity.`)
                                    : `You have reached ${progressPct}% of your goal. Keep going!`}
                            </p>
                            <div className={styles.progressTrack}>
                                <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
                            </div>
                            <div className={styles.progressStats}>
                                <span>
                                    {goalMet
                                        ? (pitch.committedUnits >= maxCap
                                            ? `${pitch.committedUnits} of ${maxCap} ${pluralizeUnit(maxCap, pitch.unitType)} filled · Fully Booked ✓`
                                            : `${pitch.committedUnits} of ${maxCap} ${pluralizeUnit(maxCap, pitch.unitType)} filled · Goal Met ✓`)
                                        : `${pitch.committedUnits} of ${goalTarget} ${pluralizeUnit(goalTarget, pitch.unitType)} to reach goal`}
                                </span>
                                <span>{goalMet ? `Capacity: ${maxCap}` : `Goal: ${goalTarget}`}</span>
                            </div>
                        </div>
                        {hasParticipants && (
                            <>
                                <div className={styles.bannerDivider} />
                                <div className={styles.warningBox}>
                                    <div className={styles.warningRow}>
                                        <span className="material-symbols-outlined" style={{ color: 'var(--error)' }}>warning</span>
                                        <div>
                                            <p className={styles.warningTitle}>Locked Fields</p>
                                            <p className={styles.warningText}>
                                                Some fields are locked or restricted because participants have already committed. Pricing can only be reduced, the goal can only be lowered, and policies cannot be changed.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </section>

                    {/* Participant Notification Banner */}
                    {hasParticipants && (
                        <div className={styles.notificationBanner}>
                            <div className={styles.notificationBannerIcon}>
                                <span className="material-symbols-outlined" style={{ fontSize: '1.125rem', color: 'var(--primary)' }}>campaign</span>
                            </div>
                            <p className={styles.notificationBannerText}>
                                <strong>Heads up:</strong> Any changes you save will be notified to all participants of this pitch. Make sure your updates are accurate before saving.
                            </p>
                        </div>
                    )}

                    {/* Bento Grid */}
                    <div className={styles.bentoGrid}>
                        <div className={styles.leftCol}>
                            {/* ── Product Details ── */}
                            <section className={`${styles.card} ${styles.order1}`}>
                                <h3 className={styles.cardTitle}>Product Details</h3>
                                <div className={styles.fieldStack}>
                                    {/* Title — Editable with warning */}
                                    <div className={styles.field}>
                                        <label className={styles.label}>Pitch Title</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={e => handleChange('title', e.target.value)}
                                            className={styles.input}
                                        />
                                        {hasParticipants && (
                                            <div className={styles.titleWarning}>
                                                <span className="material-symbols-outlined" style={{ fontSize: '0.75rem' }}>info</span>
                                                Changing the title will notify participants
                                            </div>
                                        )}
                                    </div>

                                    {/* Description — Always editable */}
                                    <div className={styles.field}>
                                        <label className={styles.label}>Description</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={e => handleChange('description', e.target.value)}
                                            className={styles.textarea}
                                            rows={3}
                                        />
                                    </div>

                                    {/* Photos — Always editable */}
                                    <div className={styles.field}>
                                        <label className={styles.label}>Product Photos</label>
                                        <div className={styles.photoGrid}>
                                            {gallery.slice(0, 2).map((img, i) => (
                                                <div key={i} className={styles.photoItem}>
                                                    <img src={img} alt={`Product ${i + 1}`} className={styles.photoImg} />
                                                    <div className={styles.photoOverlay}>
                                                        <span className="material-symbols-outlined" style={{ color: 'white' }}>delete</span>
                                                    </div>
                                                </div>
                                            ))}
                                            <button className={styles.addPhotoBtn} type="button">
                                                <span className="material-symbols-outlined" style={{ fontSize: '1.75rem' }}>add_a_photo</span>
                                                <span className={styles.addPhotoLabel}>Add Photo</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Product Link — Always editable */}
                                    <div className={styles.field}>
                                        <div className={styles.labelRow}>
                                            <label className={styles.label}>Product Link</label>
                                            <span className={styles.optionalBadge}>OPTIONAL</span>
                                        </div>
                                        <div className={styles.inputWithIcon}>
                                            <span className="material-symbols-outlined" style={{ color: 'var(--on-surface-muted)' }}>link</span>
                                            <input
                                                className={styles.inputPlain}
                                                type="url"
                                                placeholder="https://original-source.com/product"
                                                value={formData.productLink}
                                                onChange={e => handleChange('productLink', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    {/* Seller Details — Locked when participants exist */}
                                    <div className={styles.field}>
                                        <div className={styles.labelRow}>
                                            <label className={styles.label}>Seller Details</label>
                                            {hasParticipants ? (
                                                <span className={styles.lockedBadge}>
                                                    <span className="material-symbols-outlined" style={{ fontSize: '10px' }}>lock</span>
                                                    LOCKED
                                                </span>
                                            ) : (
                                                <span className={styles.optionalBadge}>OPTIONAL</span>
                                            )}
                                        </div>
                                        {hasParticipants ? (
                                            <>
                                                <div className={styles.lockedDisplayRow}>
                                                    <span className="material-symbols-outlined" style={{ fontSize: '1.125rem', color: 'var(--on-surface-variant)' }}>storefront</span>
                                                    <span className={styles.lockedDisplayValue}>{formData.sellerName || 'Not provided'}</span>
                                                    <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--on-surface-variant)' }}>lock</span>
                                                </div>
                                                {formData.sellerId && (
                                                    <div className={styles.lockedDisplayRow}>
                                                        <span className="material-symbols-outlined" style={{ fontSize: '1.125rem', color: 'var(--on-surface-variant)' }}>badge</span>
                                                        <span className={styles.lockedDisplayValue}>{formData.sellerId}</span>
                                                        <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--on-surface-variant)' }}>lock</span>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', flexDirection: 'column' }}>
                                                    <input
                                                        className={styles.input}
                                                        type="text"
                                                        placeholder="Seller Name (e.g. Columbus Vacations)"
                                                        value={formData.sellerName}
                                                        onChange={e => handleChange('sellerName', e.target.value)}
                                                    />
                                                    <input
                                                        className={styles.input}
                                                        type="text"
                                                        placeholder="Identification No. (e.g. GSTIN / FSSAI)"
                                                        value={formData.sellerId}
                                                        onChange={e => handleChange('sellerId', e.target.value)}
                                                    />
                                                </div>
                                                <p className={styles.fieldHint} style={{ lineHeight: '1.4', marginTop: '0.5rem' }}>
                                                    <strong>Disclaimer:</strong> Providing seller details is optional (as you may be the producer yourself). However, if no third-party seller is declared, <strong>you (the Host) will be held fully liable</strong> for any issues arising from the product/service.
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </section>

                            {/* ── Pitch Policies ── */}
                            <section className={`${styles.card} ${styles.order4}`}>
                                <div className={styles.labelRow} style={{ marginBottom: '1rem' }}>
                                    <h3 className={styles.cardTitle} style={{ marginBottom: 0 }}>Pitch Policies</h3>
                                    {hasParticipants && (
                                        <span className={styles.lockedBadge}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '10px' }}>lock</span>
                                            LOCKED
                                        </span>
                                    )}
                                </div>
                                <div className={styles.fieldStackSpaced}>
                                    {/* Return Policy */}
                                    <div className={`${styles.field} ${hasParticipants ? styles.fieldLocked : ''}`}>
                                        <label className={styles.label}>Return Policy</label>
                                        <select
                                            value={formData.returnPolicy}
                                            onChange={e => handleChange('returnPolicy', e.target.value)}
                                            className={styles.input}
                                            disabled={hasParticipants}
                                        >
                                            <option value="no_returns">No Returns — All sales final</option>
                                            <option value="exchange_only">Exchange Only — Within 24h of pickup</option>
                                            <option value="full_refund_24h">Full Refund — Within 24h of pickup</option>
                                            <option value="custom">Custom Policy</option>
                                        </select>
                                    </div>
                                    {formData.returnPolicy === 'custom' && (
                                        <div className={`${styles.field} ${hasParticipants ? styles.fieldLocked : ''}`}>
                                            <label className={styles.label}>Custom Return Policy</label>
                                            <textarea
                                                value={formData.returnPolicyCustom}
                                                onChange={e => handleChange('returnPolicyCustom', e.target.value)}
                                                className={styles.textarea}
                                                rows={3}
                                                placeholder="Describe your return policy (max 500 chars)..."
                                                maxLength={500}
                                                disabled={hasParticipants}
                                            />
                                        </div>
                                    )}
                                    {/* Cancellation Fee */}
                                    <div className={`${styles.field} ${hasParticipants ? styles.fieldLocked : ''}`}>
                                        <label className={styles.label}>Cancellation Fee (after threshold met)</label>
                                        <div className={styles.feeOptions}>
                                            {[0, 5, 10].map(pct => (
                                                <button
                                                    key={pct}
                                                    type="button"
                                                    className={`${styles.feeOption} ${formData.cancellationFeePercent === pct ? styles.feeOptionActive : ''}`}
                                                    onClick={() => !hasParticipants && handleChange('cancellationFeePercent', pct)}
                                                    disabled={hasParticipants}
                                                >
                                                    {pct === 0 ? 'No Fee' : `${pct}%`}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className={styles.policyInfoBox}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--primary)', flexShrink: 0 }}>info</span>
                                        <p className={styles.policyInfoText}>
                                            {hasParticipants
                                                ? 'Policies cannot be modified after participants have committed. Participants joined under these terms.'
                                                : 'A 2% platform processing fee is always applied on refunds. Cancellation fee applies when participants quit after the pitch threshold is met but before the order is placed.'}
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className={styles.rightCol}>
                            {/* ── Pricing & Quantity ── */}
                            <section className={`${styles.card} ${styles.order2}`}>
                                <h3 className={styles.cardTitle}>Pricing & Quantity</h3>
                                <div className={styles.fieldStack}>
                                    {/* Unit Type — Always locked (display only) */}
                                    <div className={`${styles.field} ${styles.fieldLocked}`}>
                                        <label className={styles.label}>Unit Type</label>
                                        <div className={styles.lockedDisplayRow}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '1.125rem', color: 'var(--on-surface-variant)' }}>straighten</span>
                                            <span className={styles.lockedDisplayValue}>{pitch.unitType || 'unit'}</span>
                                            <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--on-surface-variant)' }}>lock</span>
                                        </div>
                                    </div>

                                    {/* Cost per Unit — Can only be REDUCED */}
                                    <div className={styles.field}>
                                        <label className={styles.label}>Cost per {pitch.unitType}</label>
                                        <div className={styles.lockedInputWrap}>
                                            <span className={styles.currencySymbol}>₹</span>
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                value={formatIN(formData.costPerUnit)}
                                                onChange={e => handleCostChange(e.target.value)}
                                                className={styles.inputInline}
                                            />
                                        </div>
                                        {hasParticipants && (
                                            <div className={styles.directionalNote}>
                                                <span className="material-symbols-outlined" style={{ fontSize: '0.75rem' }}>info</span>
                                                Price can only be reduced
                                            </div>
                                        )}
                                    </div>

                                    {/* Minimum Order Goal — Can only be LOWERED */}
                                    <div className={styles.field}>
                                        <label className={styles.label}>Minimum Order Goal</label>
                                        <div className={styles.lockedInputWrap}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem', color: 'var(--on-surface-variant)' }}>flag</span>
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                value={formatIN(formData.minOrder)}
                                                onChange={e => handleMinOrderChange(e.target.value)}
                                                className={styles.inputInline}
                                            />
                                        </div>
                                        {hasParticipants && (
                                            <div className={styles.directionalNote}>
                                                <span className="material-symbols-outlined" style={{ fontSize: '0.75rem' }}>info</span>
                                                Goal can only be lowered
                                            </div>
                                        )}
                                    </div>

                                    {/* Max Capacity — Can be INCREASED, not reduced below committed */}
                                    <div className={styles.field}>
                                        <label className={styles.label}>Total {pluralizeUnit(formData.maxCapacity, pitch.unitType)} Available</label>
                                        <div className={styles.lockedInputWrap}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem', color: 'var(--on-surface-variant)' }}>inventory_2</span>
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                value={formatIN(formData.maxCapacity)}
                                                onChange={e => handleMaxCapacityChange(e.target.value)}
                                                className={styles.inputInline}
                                            />
                                        </div>
                                        {hasParticipants && (
                                            <div className={styles.directionalNote}>
                                                <span className="material-symbols-outlined" style={{ fontSize: '0.75rem' }}>info</span>
                                                Capacity can't be reduced below {pluralizeUnit(formData.committedUnits, pitch.unitType)} committed
                                            </div>
                                        )}
                                    </div>

                                    {/* Estimated Savings — Always editable */}
                                    <div className={styles.field}>
                                        <label className={styles.label}>Estimated Savings (%)</label>
                                        <div className={styles.lockedInputWrap}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem', color: 'var(--on-surface-variant)' }}>percent</span>
                                            <input
                                                type="number"
                                                value={formData.estimatedSavings}
                                                onChange={e => handleEstimatedSavingsChange(e.target.value)}
                                                className={styles.inputInline}
                                                placeholder="e.g. 22"
                                                min="0"
                                                max="99"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* ── Pitch Discussion ── */}
                            <section className={`${styles.card} ${styles.order3}`}>
                                <div className={styles.discussionHeader}>
                                    <div>
                                        <h3 className={styles.cardTitle} style={{ marginBottom: '0.25rem' }}>Pitch Discussion</h3>
                                        <p className={styles.label} style={{ textTransform: 'none', letterSpacing: 'normal' }}>Allow participants to chat and ask questions.</p>
                                    </div>
                                    <label className={styles.toggleSwitch}>
                                        <input type="checkbox" checked={formData.discussionEnabled} onChange={e => handleChange('discussionEnabled', e.target.checked)} />
                                        <span className={styles.toggleSlider}></span>
                                    </label>
                                </div>
                            </section>

                            {/* ── Rules & Logistics ── */}
                            <section className={`${styles.card} ${styles.order5}`}>
                                <h3 className={styles.cardTitle}>Rules & Logistics</h3>
                                <div className={styles.fieldStackSpaced}>
                                    {/* Deadline — Always editable */}
                                    <div className={styles.field}>
                                        <label className={styles.label}>Join Deadline</label>
                                        <input
                                            type="date"
                                            value={formData.deadline}
                                            onChange={e => handleChange('deadline', e.target.value)}
                                            className={styles.input}
                                        />
                                    </div>

                                    {/* Pickup Instructions — Locked when participants exist */}
                                    <div>
                                        <div className={`${styles.field} ${hasParticipants ? styles.fieldLocked : ''}`}>
                                            <div className={styles.labelRow}>
                                                <label className={styles.label}>Pickup Instructions</label>
                                                {hasParticipants && (
                                                    <span className={styles.lockedBadge}>
                                                        <span className="material-symbols-outlined" style={{ fontSize: '10px' }}>lock</span>
                                                        LOCKED
                                                    </span>
                                                )}
                                            </div>
                                            <textarea
                                                value={formData.pickupInstructions}
                                                onChange={e => handleChange('pickupInstructions', e.target.value)}
                                                className={styles.textarea}
                                                rows={3}
                                                disabled={hasParticipants}
                                            />
                                        </div>
                                        {hasParticipants && (
                                            <div className={styles.pickupDisclaimer} style={{ marginTop: '0.75rem' }}>
                                                <div className={styles.pickupDisclaimerTop}>
                                                    <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--primary)', flexShrink: 0, width: '1.75rem', textAlign: 'center', display: 'inline-block' }}>info</span>
                                                    <p className={styles.policyInfoText}>
                                                        Pickup instructions cannot be modified because participants joined under these terms.
                                                    </p>
                                                </div>
                                                <div className={styles.pickupDisclaimerBottom}>
                                                    <strong style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', flexShrink: 0, width: '1.75rem', textAlign: 'center', display: 'inline-block' }}>Tip:</strong>
                                                    <p className={styles.pickupDisclaimerText} style={{ margin: 0 }}>
                                                        If changes are necessary, please coordinate via Pitch Discussion or create a fresh pitch.
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Payment Mode — Locked when participants exist */}
                                    <div className={`${styles.field} ${hasParticipants ? styles.fieldLocked : ''}`}>
                                        <div className={styles.labelRow}>
                                            <label className={styles.label}>Payment Mode</label>
                                            {hasParticipants && (
                                                <span className={styles.lockedBadge}>
                                                    <span className="material-symbols-outlined" style={{ fontSize: '10px' }}>lock</span>
                                                    LOCKED
                                                </span>
                                            )}
                                        </div>
                                        <select
                                            value={formData.paymentMode}
                                            onChange={e => handleChange('paymentMode', e.target.value)}
                                            className={styles.input}
                                            disabled={hasParticipants}
                                        >
                                            <option value="upi">UPI Escrow</option>
                                            <option value="cash">Cash on Delivery / Pickup</option>
                                        </select>
                                    </div>

                                    {/* Visibility — Always editable */}
                                    <div className={styles.field}>
                                        <label className={styles.label}>Visibility</label>
                                        <select
                                            value={formData.visibility}
                                            onChange={e => handleChange('visibility', e.target.value)}
                                            className={styles.input}
                                        >
                                            <option value="public">
                                                Public {formData.visibility !== 'public' ? '(Anyone can request to join)' : ''}
                                            </option>
                                            <option value="private">
                                                Private {formData.visibility !== 'private' ? '(Hidden from browse)' : ''}
                                            </option>
                                        </select>
                                        
                                        {/* Clan Selection Dropdown (visible when Private) */}
                                        {formData.visibility === 'private' && (
                                            <div className={styles.clanSelectSection}>
                                                <label className={styles.label}>Select Clan(s)</label>
                                                <div className={styles.clanDropdownWrapper} ref={clanDropdownRef}>
                                                    <button
                                                        type="button"
                                                        className={styles.clanDropdownTrigger}
                                                        onClick={() => setShowClanDropdown(prev => !prev)}
                                                    >
                                                        <div className={styles.clanChipsArea}>
                                                            {formData.selectedClans.length === 0 && (
                                                                <span className={styles.clanPlaceholder}>Choose clans...</span>
                                                            )}
                                                            {formData.selectedClans.map(clanId => {
                                                                const clan = mockClans.find(c => c.id === clanId);
                                                                return clan ? (
                                                                    <span key={clanId} className={styles.clanChip}>
                                                                        {clan.name}
                                                                        <span
                                                                            className="material-symbols-outlined"
                                                                            style={{ fontSize: '14px', cursor: 'pointer' }}
                                                                            onClick={(e) => { e.stopPropagation(); removeClan(clanId); }}
                                                                        >close</span>
                                                                    </span>
                                                                ) : null;
                                                            })}
                                                        </div>
                                                        <span className="material-symbols-outlined" style={{ color: 'var(--on-surface-variant)' }}>unfold_more</span>
                                                    </button>

                                                    {showClanDropdown && (
                                                        <div className={styles.clanDropdownMenu}>
                                                            <div className={styles.clanDropdownList}>
                                                                {mockClans.map(clan => {
                                                                    const isSelected = formData.selectedClans.includes(clan.id);
                                                                    return (
                                                                        <div
                                                                            key={clan.id}
                                                                            className={`${styles.clanDropdownItem} ${isSelected ? styles.clanDropdownItemSelected : ''}`}
                                                                            onClick={() => toggleClan(clan.id)}
                                                                        >
                                                                            <span className={styles.clanDropdownItemName}>{clan.name}</span>
                                                                            {isSelected && (
                                                                                <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--primary)' }}>check_circle</span>
                                                                            )}
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>


                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>

            {/* Sticky Action Footer */}
            <div className={styles.stickyFooter}>
                <div className={styles.stickyInner}>
                    <button type="button" className={styles.saveBtn} onClick={handleSave} disabled={changedFields.length === 0}>
                        <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>save</span>
                        Save Changes
                    </button>
                    <button type="button" className={styles.cancelBtn} onClick={() => router.back()}>
                        Cancel
                    </button>
                </div>
            </div>
        </>
        </AuthGuard>
    );
}
