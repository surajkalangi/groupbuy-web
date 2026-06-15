'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { mockPitches } from '@/data/pitches';
import styles from './page.module.css';
import AuthGuard from '@/components/auth/AuthGuard';

const HOST_TAGS = ['Great communication', 'Friendly host', 'Well organized', 'Punctual'];
const PRODUCT_TAGS = ['Fresh', 'Premium quality', 'Good value'];

export default function RatePage({ params }) {
    const { pitchId } = use(params);
    const router = useRouter();
    const pitch = mockPitches.find(p => p.id === pitchId) || mockPitches[0];

    const [hostRating, setHostRating] = useState(4);
    const [hostHovered, setHostHovered] = useState(0);
    const [productRating, setProductRating] = useState(5);
    const [productHovered, setProductHovered] = useState(0);
    const [selectedHostTags, setSelectedHostTags] = useState(['Great communication']);
    const [selectedProductTags, setSelectedProductTags] = useState(['Fresh', 'Premium quality']);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

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
            router.push('/pitches/my');
        }, 800);
    };

    const renderStars = (rating, hovered, setHovered, setRating) => {
        const display = hovered || rating;
        return (
            <AuthGuard>
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
            </AuthGuard>
        );
    };

    return (
        <div className={styles.page}>
            {/* Dot-grid overlay */}
            <div className={styles.dotGrid} />

            <div className={styles.modalWrap}>
                {/* Subtle mesh overlay */}
                <div className={styles.meshOverlay} />

                {/* Header */}
                <div className={styles.modalHeader}>
                    <div>
                        <span className={styles.eyebrow}>Delivery Confirmed! 🎉</span>
                        <h1 className={styles.heading}>How was your experience with this pitch?</h1>
                    </div>
                    <Link href={`/pitches/${pitchId}`} className={styles.closeBtn}>
                        <span className="material-symbols-outlined">close</span>
                    </Link>
                </div>

                {/* Host & Product Info Bar */}
                <div className={styles.infoBar}>
                    <div className={styles.infoItem}>
                        <div className={styles.infoIcon}>
                            <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>person</span>
                        </div>
                        <div>
                            <p className={styles.infoLabel}>Host</p>
                            <p className={styles.infoValue}>{pitch.host?.name || 'Host'}</p>
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
                            {renderStars(hostRating, hostHovered, setHostHovered, setHostRating)}
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
                            {renderStars(productRating, productHovered, setProductHovered, setProductRating)}
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
                        <p className={styles.footnote}>Your feedback helps the GroupBuy community grow stronger.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
