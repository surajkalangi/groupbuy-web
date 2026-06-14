'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { pluralizeUnit } from '@/utils/pluralize';
import styles from './JoinPitchModal.module.css';

export default function JoinPitchModal({ pitch, spotsLeft, onConfirm, onClose, isOpen }) {
    const dialogRef = useRef(null);
    const [qty, setQty] = useState(1);
    const [note, setNote] = useState('');

    const maxQty = Math.max(1, spotsLeft);
    const unitPrice = pitch.costPerUnit || 0;
    const total = qty * unitPrice;
    const unitLabel = pitch.unitType || 'unit';
    const unitLabelUpper = pluralizeUnit(qty, unitLabel).toUpperCase();

    // Open/close the native dialog
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen && !dialog.open) {
            dialog.showModal();
        } else if (!isOpen && dialog.open) {
            dialog.close();
        }
    }, [isOpen]);

    // Handle light dismiss (click on backdrop)
    const handleBackdropClick = useCallback((e) => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (e.target !== dialog) return;

        const rect = dialog.getBoundingClientRect();
        const isDialogContent = (
            rect.top <= e.clientY &&
            e.clientY <= rect.top + rect.height &&
            rect.left <= e.clientX &&
            e.clientX <= rect.left + rect.width
        );

        if (!isDialogContent) {
            onClose();
        }
    }, [onClose]);

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setQty(1);
            setNote('');
        }
    }, [isOpen]);

    const handleConfirm = () => {
        onConfirm({ quantity: qty, note });
    };

    if (!pitch) return null;

    return (
        <dialog
            ref={dialogRef}
            className={styles.modal}
            onClose={onClose}
            onClick={handleBackdropClick}
            aria-labelledby="join-pitch-title"
        >
            <div className={styles.modalContent}>
                {/* Header */}
                <div className={styles.modalHeader}>
                    <div className={styles.modalHeaderText}>
                        <span className={styles.modalEyebrow}>Confirm Participation</span>
                        <h2 id="join-pitch-title" className={styles.modalTitle}>{pitch.title}</h2>
                    </div>
                    <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
                        <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>close</span>
                    </button>
                </div>

                {/* Quantity Selector */}
                <div className={styles.qtySection}>
                    <div className={styles.qtyHeader}>
                        <span className={styles.qtyLabel}>Select Quantity</span>
                        <span className={styles.qtyLimit}>Limit: {spotsLeft} {pluralizeUnit(spotsLeft, unitLabel)}</span>
                    </div>
                    <div className={styles.stepper}>
                        <button
                            className={styles.stepperBtn}
                            onClick={() => setQty(v => Math.max(1, v - 1))}
                            disabled={qty <= 1}
                            aria-label="Decrease quantity"
                        >
                            <span className="material-symbols-outlined">remove</span>
                        </button>
                        <div className={styles.stepperValue}>
                            <span className={styles.stepperNum}>{qty}</span>
                            <span className={styles.stepperUnit}>{unitLabelUpper}</span>
                        </div>
                        <button
                            className={styles.stepperBtn}
                            onClick={() => setQty(v => Math.min(maxQty, v + 1))}
                            disabled={qty >= maxQty}
                            aria-label="Increase quantity"
                        >
                            <span className="material-symbols-outlined">add</span>
                        </button>
                    </div>
                </div>

                {/* Price Summary */}
                <div className={styles.priceSummary}>
                    <div className={styles.priceRow}>
                        <span className={styles.priceLabel}>Unit Price</span>
                        <span className={styles.priceValue}>₹{unitPrice.toLocaleString('en-IN')} / {unitLabel}</span>
                    </div>
                    <div className={styles.priceRow}>
                        <span className={styles.totalLabel}>Total Commitment</span>
                        <span className={styles.totalValue}>₹{total.toLocaleString('en-IN')}</span>
                    </div>
                    <span className={styles.priceBreakdown}>
                        {qty} {pluralizeUnit(qty, unitLabel)} × ₹{unitPrice.toLocaleString('en-IN')}/{unitLabel} = ₹{total.toLocaleString('en-IN')}
                    </span>
                </div>

                {/* Note to Host */}
                <div className={styles.noteSection}>
                    <label className={styles.noteLabel} htmlFor="join-note">
                        Private Note to Host <span className={styles.noteLabelOptional}>(Optional)</span>
                    </label>
                    <textarea
                        id="join-note"
                        className={styles.noteInput}
                        rows={3}
                        placeholder="e.g., 'Please ensure they are slightly firm'"
                        value={note}
                        onChange={e => setNote(e.target.value)}
                    />
                </div>

                {/* Trust line */}
                <div className={styles.trustLine}>
                    <span className={`material-symbols-outlined ${styles.trustIcon}`} style={{ fontSize: '18px', color: 'var(--primary)', fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                    <span>
                        Funds are held in <span className={styles.escrowLink}>GroupBuy Escrow</span> via UPI. Your money is only released to the host once delivery is verified by the community.
                    </span>
                </div>
            </div>

            {/* Footer */}
            <div className={styles.modalFooter}>
                {/* Policy consent */}
                <p className={styles.policyConsent}>
                    By joining, you agree to the host's pitch policies.
                </p>

                <button className={styles.confirmBtn} onClick={handleConfirm}>
                    <span className="material-symbols-outlined" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>account_balance</span>
                    Confirm & Authorize
                </button>
                <button className={styles.cancelBtn} onClick={onClose}>
                    Cancel
                </button>
            </div>
        </dialog>
    );
}
