'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { mockPitches } from '@/data/pitches';
import { pluralizeUnit } from '@/utils/pluralize';
import styles from './page.module.css';

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

    const [formData, setFormData] = useState({
        title: pitch.title,
        description: pitch.description || '',
        deadline: pitch.deadline?.split('T')[0] || '',
        pickupInstructions: pitch.pickupInfo
            ? `Pickup at ${pitch.pickupInfo.address} between ${pitch.pickupInfo.time}. Please bring your own carry bags.`
            : '',
        returnPolicy: pitch.pitchPolicies?.returnPolicy || 'no_returns',
        returnPolicyCustom: pitch.pitchPolicies?.returnPolicyCustom || '',
        cancellationFeePercent: pitch.pitchPolicies?.cancellationFeePercent ?? 10,
        discussionEnabled: false,
        estimatedSavings: pitch.estimatedSavings || '22',
    });

    const gallery = pitch.gallery || (pitch.image ? [pitch.image] : []);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        router.push(`/pitches/${pitchId}`);
    };

    return (
        <>
            {/* Sticky Edit Header (replaces Navbar to prevent accidental navigation) */}
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
                                                Total units and cost per unit cannot be modified because {pitch.committedUnits} {pluralizeUnit(pitch.committedUnits, 'unit')} {pitch.committedUnits === 1 ? 'is' : 'are'} already committed to this price point.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </section>

                    {/* Bento Grid */}
                    <div className={styles.bentoGrid}>
                        <div className={styles.leftCol}>
                            {/* Row 1 Left: Product Details */}
                            <section className={`${styles.card} ${styles.order1}`}>
                                <h3 className={styles.cardTitle}>Product Details</h3>
                                <div className={styles.fieldStack}>
                                    <div className={styles.field}>
                                        <label className={styles.label}>Pitch Title</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={e => handleChange('title', e.target.value)}
                                            className={styles.input}
                                        />
                                    </div>
                                    <div className={styles.field}>
                                        <label className={styles.label}>Description</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={e => handleChange('description', e.target.value)}
                                            className={styles.textarea}
                                            rows={3}
                                        />
                                    </div>
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
                                </div>
                            </section>

                            {/* Row 2 Left: Pitch Policies */}
                            <section className={`${styles.card} ${styles.order4}`}>
                                <h3 className={styles.cardTitle}>Pitch Policies</h3>
                                <div className={styles.fieldStackSpaced}>
                                    <div className={styles.field}>
                                        <label className={styles.label}>Return Policy</label>
                                        <select
                                            value={formData.returnPolicy}
                                            onChange={e => handleChange('returnPolicy', e.target.value)}
                                            className={styles.input}
                                        >
                                            <option value="no_returns">No Returns — All sales final</option>
                                            <option value="exchange_only">Exchange Only — Within 24h of pickup</option>
                                            <option value="full_refund_24h">Full Refund — Within 24h of pickup</option>
                                            <option value="custom">Custom Policy</option>
                                        </select>
                                    </div>
                                    {formData.returnPolicy === 'custom' && (
                                        <div className={styles.field}>
                                            <label className={styles.label}>Custom Return Policy</label>
                                            <textarea
                                                value={formData.returnPolicyCustom}
                                                onChange={e => handleChange('returnPolicyCustom', e.target.value)}
                                                className={styles.textarea}
                                                rows={3}
                                                placeholder="Describe your return policy (max 500 chars)..."
                                                maxLength={500}
                                            />
                                        </div>
                                    )}
                                    <div className={styles.field}>
                                        <label className={styles.label}>Cancellation Fee (after threshold met)</label>
                                        <div className={styles.feeOptions}>
                                            {[0, 5, 10].map(pct => (
                                                <button
                                                    key={pct}
                                                    type="button"
                                                    className={`${styles.feeOption} ${formData.cancellationFeePercent === pct ? styles.feeOptionActive : ''}`}
                                                    onClick={() => handleChange('cancellationFeePercent', pct)}
                                                >
                                                    {pct === 0 ? 'No Fee' : `${pct}%`}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className={styles.policyInfoBox}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--primary)', flexShrink: 0 }}>info</span>
                                        <p className={styles.policyInfoText}>
                                            A 2% platform processing fee is always applied on refunds. Cancellation fee applies when participants quit after the pitch threshold is met but before the order is placed.
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className={styles.rightCol}>
                            {/* Row 1 Right: Pricing & Quantity */}
                            <section className={`${styles.card} ${styles.order2}`}>
                                <h3 className={styles.cardTitle}>Pricing & Quantity</h3>
                                <div className={styles.fieldStack}>
                                    <div className={`${styles.field} ${hasParticipants ? styles.fieldLocked : ''}`}>
                                        <label className={styles.label}>Cost per {pitch.unitType}</label>
                                        <div className={styles.lockedInputWrap}>
                                            <span className={styles.currencySymbol}>₹</span>
                                            <input
                                                type="text"
                                                value={pitch.costPerUnit}
                                                disabled={hasParticipants}
                                                className={styles.inputInline}
                                                readOnly={hasParticipants}
                                            />
                                            {hasParticipants && (
                                                <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--on-surface-variant)' }}>lock</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className={`${styles.field} ${hasParticipants ? styles.fieldLocked : ''}`}>
                                        <label className={styles.label}>Total {pluralizeUnit(pitch.maxCapacity, pitch.unitType)} Available</label>
                                        <div className={styles.lockedInputWrap}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem', color: 'var(--on-surface-variant)' }}>inventory_2</span>
                                            <input
                                                type="text"
                                                value={pitch.maxCapacity}
                                                disabled={hasParticipants}
                                                className={styles.inputInline}
                                                readOnly={hasParticipants}
                                            />
                                            {hasParticipants && (
                                                <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--on-surface-variant)' }}>lock</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className={styles.field}>
                                        <label className={styles.label}>Estimated Savings (%)</label>
                                        <div className={styles.lockedInputWrap}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem', color: 'var(--on-surface-variant)' }}>percent</span>
                                            <input
                                                type="text"
                                                value={formData.estimatedSavings}
                                                onChange={e => handleChange('estimatedSavings', e.target.value)}
                                                className={styles.inputInline}
                                                placeholder="e.g. 22"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Row 2 Right: Pitch Discussion */}
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

                            {/* Row 3 Right: Rules & Logistics */}
                            <section className={`${styles.card} ${styles.order5}`}>
                                <h3 className={styles.cardTitle}>Rules & Logistics</h3>
                                <div className={styles.fieldStackSpaced}>
                                    <div className={styles.field}>
                                        <label className={styles.label}>Join Deadline</label>
                                        <input
                                            type="date"
                                            value={formData.deadline}
                                            onChange={e => handleChange('deadline', e.target.value)}
                                            className={styles.input}
                                        />
                                    </div>
                                    <div className={styles.field}>
                                        <label className={styles.label}>Pickup Instructions</label>
                                        <textarea
                                            value={formData.pickupInstructions}
                                            onChange={e => handleChange('pickupInstructions', e.target.value)}
                                            className={styles.textarea}
                                            rows={3}
                                        />
                                    </div>
                                    <div className={styles.hostInfo}>
                                        <div className={styles.hostAvatar}>
                                            {pitch.host.name.charAt(0)}
                                        </div>
                                        <div className={styles.hostMeta}>
                                            <span className={styles.hostMetaLabel}>HOST</span>
                                            <span className={styles.hostName}>{pitch.host.name}</span>
                                        </div>
                                        <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontVariationSettings: "'FILL' 1" }}>verified</span>
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
                    <button type="button" className={styles.saveBtn} onClick={handleSave}>
                        <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>save</span>
                        Save Changes
                    </button>
                    <button type="button" className={styles.cancelBtn} onClick={() => router.back()}>
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
}
