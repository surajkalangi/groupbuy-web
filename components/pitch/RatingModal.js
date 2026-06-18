'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { mockPitches } from '@/data/pitches';
import styles from './RatingModal.module.css';

const HOST_TAGS = ['Great communication', 'Friendly host', 'Well organized', 'Punctual'];
const PRODUCT_TAGS = ['Fresh', 'Premium quality', 'Good value'];

export default function RatingModal() {
    const { pendingRatingPitchId, dismissRating, submitRating } = useAuth();
    
    const [hostRating, setHostRating] = useState(4);
    const [hostHovered, setHostHovered] = useState(0);
    const [productRating, setProductRating] = useState(5);
    const [productHovered, setProductHovered] = useState(0);
    const [selectedHostTags, setSelectedHostTags] = useState(['Great communication']);
    const [selectedProductTags, setSelectedProductTags] = useState(['Fresh', 'Premium quality']);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    if (!pendingRatingPitchId) return null;

    const pitch = mockPitches.find(p => p.id === pendingRatingPitchId) || mockPitches[0];

    const displayHostRating = hostHovered || hostRating;
    const displayProductRating = productHovered || productRating;

    const toggleHostTag = (tag) => {
        setSelectedHostTags(ts => ts.includes(tag) ? ts.filter(t => t !== tag) : [...ts, tag]);
    };

    const toggleProductTag = (tag) => {
        setSelectedProductTags(ts => ts.includes(tag) ? ts.filter(t => t !== tag) : [...ts, tag]);
    };

    const handleSubmit = () => {
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            submitRating();
        }, 800);
    };

    const renderStars = (rating, hovered, setHovered, setRating) => {
        const display = hovered || rating;
        return (
            <div className={styles.starRow}>
                {[1, 2, 3, 4, 5].map(star => (
                    <button
                        key={star}
                        className={styles.starBtn}
                        onMouseEnter={() => setHovered(star)}
                        onMouseLeave={() => setHovered(0)}
                        onClick={() => setRating(star)}
                        type="button"
                    >
                        <span
                            className="material-symbols-outlined"
                            style={{
                                fontSize: '2rem',
                                color: star <= display ? 'var(--secondary-container)' : 'var(--outline-variant)',
                                fontVariationSettings: star <= display ? "'FILL' 1" : "'FILL' 0",
                                transition: 'color 0.15s, transform 0.15s',
                            }}
                        >
                            star
                        </span>
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modalWrap}>
                {/* Subtle mesh overlay */}
                <div className={styles.meshOverlay} />

                {/* Header */}
                <div className={styles.modalHeader}>
                    <div>
                        <span className={styles.eyebrow}>Delivery Confirmed! 🎉</span>
                        <h1 className={styles.heading}>How was your experience with this pitch?</h1>
                    </div>
                    <button onClick={dismissRating} className={styles.closeBtn} aria-label="Dismiss">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Host & Product Info Bar */}
                <div className={styles.infoBar}>
                    <div className={styles.hostLeft}>
                        <div className={styles.hostAvatarWrap}>
                            <div className={styles.hostAvatar}>
                                {pitch.host?.avatarUrl ? (
                                    <img src={pitch.host.avatarUrl} alt={pitch.host.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                                ) : (
                                    pitch.host?.name?.charAt(0) || 'H'
                                )}
                            </div>
                            <div className={styles.verifiedDot}>
                                <span className="material-symbols-outlined" style={{ fontSize: '12px', color: 'white', fontVariationSettings: "'FILL' 1" }}>verified</span>
                            </div>
                        </div>
                        <div>
                            <div className={styles.hostNameRow}>
                                <span className={styles.hostName}>{pitch.host?.name || 'Host'}</span>
                            </div>
                            <div className={styles.hostRating}>
                                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--secondary)', fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className={styles.ratingVal}>{pitch.host?.rating || '4.8'}</span>
                                <span className={styles.ratingCount}>({pitch.host?.pitchesHosted || 0} pitches hosted)</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.infoItemRight}>
                        <p className={styles.infoLabel}>Product</p>
                        <p className={styles.infoValue}>{pitch.title}</p>
                    </div>
                </div>

                {/* Rating Body */}
                <div className={styles.modalBody}>
                    {/* Rate Host Organization */}
                    <div className={styles.ratingSection}>
                        <div className={styles.ratingBlock}>
                            <label className={styles.ratingLabel}>Rate Host Organization</label>
                            <div className={styles.starsWrap}>
                                {renderStars(hostRating, hostHovered, setHostHovered, setHostRating)}
                            </div>
                        </div>
                        <div className={styles.tagGrid}>
                            {HOST_TAGS.map(tag => (
                                <button
                                    key={tag}
                                    className={`${styles.tag} ${selectedHostTags.includes(tag) ? styles.tagActive : ''}`}
                                    onClick={() => toggleHostTag(tag)}
                                    type="button"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className={styles.divider} />

                    {/* Rate Product Quality */}
                    <div className={styles.ratingSection}>
                        <div className={styles.ratingBlock}>
                            <label className={styles.ratingLabel}>Rate Product Quality</label>
                            <div className={styles.starsWrap}>
                                {renderStars(productRating, productHovered, setProductHovered, setProductRating)}
                            </div>
                        </div>
                        <div className={styles.tagGrid}>
                            {PRODUCT_TAGS.map(tag => (
                                <button
                                    key={tag}
                                    className={`${styles.tag} ${selectedProductTags.includes(tag) ? styles.tagActive : ''}`}
                                    onClick={() => toggleProductTag(tag)}
                                    type="button"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Comment */}
                    <div className={styles.commentSection}>
                        <label className={styles.commentLabel}>Any additional comments?</label>
                        <textarea
                            className={styles.textarea}
                            placeholder="Share more details about your experience..."
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                        />
                    </div>

                    {/* CTA */}
                    <div className={styles.ctaSection}>
                        <button
                            className={styles.submitBtn}
                            onClick={handleSubmit}
                            disabled={submitting}
                            id="submit-rating-btn"
                        >
                            {submitting ? 'Submitting…' : 'Submit Rating'}
                            {!submitting && <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>arrow_forward</span>}
                        </button>
                        <p className={styles.footnote}>
                            <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--primary)' }}>verified_user</span>
                            Community trust is built on honest reviews.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
