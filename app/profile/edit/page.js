'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';

export default function EditProfilePage() {
    const router = useRouter();
    const { currentUser, isLoggedIn } = useAuth();

    const [form, setForm] = useState({
        name: currentUser?.name || 'Suraj Kalangi',
        email: 'suraj@example.com',
        phone: currentUser?.phone || '+91 98765 43210',
        city: currentUser?.city || 'Bangalore',
        locality: currentUser?.locality || 'Prestige Shantiniketan',
    });
    const [saved, setSaved] = useState(false);

    const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => router.push('/profile'), 1200);
    };

    const profileCompleteness = 85;
    const verificationChecklist = [
        { label: 'Add your apartment/flat number to your locality details', done: true },
        { label: 'Join a Clan in your society', done: true },
        { label: 'Complete 1 Successful Pitch', done: false },
    ];

    return (
        <main className={styles.page}>
            {/* Header */}
            <header className={styles.header}>
                <button onClick={() => router.back()} className={styles.backBtn}>
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <Link href={isLoggedIn ? '/feed' : '/'} className={styles.headerTitle}>GroupBuy</Link>
            </header>

            <div className={styles.container}>
                {/* Editorial Header */}
                <div className={styles.editorialHeader}>
                    <h1 className={styles.heading}>Edit Profile</h1>
                    <p className={styles.subtext}>Update your personal details and locality details for the GroupBuy network.</p>
                </div>

                {/* Form Card */}
                <div className={styles.formCard}>
                    <form onSubmit={e => { e.preventDefault(); handleSave(); }}>

                        {/* Avatar Section */}
                        <div className={styles.avatarSection}>
                            <div className={styles.avatarWrap}>
                                <div className={styles.avatarCircle}>
                                    {form.name.charAt(0)}
                                </div>
                                <button type="button" className={styles.cameraOverlay}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>photo_camera</span>
                                </button>
                            </div>
                            <span className={styles.changeLabel}>Change Avatar</span>
                        </div>

                        {/* Input Grid */}
                        <div className={styles.inputGrid}>
                            {/* Full Name — spans full width */}
                            <div className={`${styles.field} ${styles.colSpan2}`}>
                                <label className={styles.label}>Full Name</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={e => handleChange('name', e.target.value)}
                                    className={styles.input}
                                />
                            </div>

                            {/* Email Address */}
                            <div className={styles.field}>
                                <label className={styles.label}>Email Address</label>
                                <div className={styles.verifiedField}>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={e => handleChange('email', e.target.value)}
                                        className={styles.input}
                                    />
                                    <div className={styles.verifiedBadge}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '0.75rem', fontVariationSettings: "'FILL' 1" }}>verified</span>
                                        VERIFIED
                                    </div>
                                </div>
                            </div>

                            {/* Phone Number */}
                            <div className={styles.field}>
                                <label className={styles.label}>Phone Number</label>
                                <div className={styles.verifiedField}>
                                    <input
                                        type="tel"
                                        value={form.phone}
                                        onChange={e => handleChange('phone', e.target.value)}
                                        className={styles.input}
                                    />
                                    <div className={styles.verifiedBadge}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '0.75rem', fontVariationSettings: "'FILL' 1" }}>verified</span>
                                        VERIFIED
                                    </div>
                                </div>
                            </div>

                            {/* City */}
                            <div className={styles.field}>
                                <label className={styles.label}>City</label>
                                <div className={styles.selectWrap}>
                                    <select
                                        value={form.city}
                                        onChange={e => handleChange('city', e.target.value)}
                                        className={styles.input}
                                    >
                                        <option>Mumbai</option>
                                        <option>Delhi NCR</option>
                                        <option>Bangalore</option>
                                        <option>Hyderabad</option>
                                        <option>Chennai</option>
                                    </select>
                                    <span className="material-symbols-outlined" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--on-surface-variant)', fontSize: '1.25rem' }}>expand_more</span>
                                </div>
                            </div>

                            {/* Society / Locality */}
                            <div className={styles.field}>
                                <label className={styles.label}>Society / Locality</label>
                                <input
                                    type="text"
                                    value={form.locality}
                                    onChange={e => handleChange('locality', e.target.value)}
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        {/* Profile Completeness */}
                        <div className={styles.completenessCard}>
                            <div className={styles.completenessHeader}>
                                <span className={styles.completenessLabel}>Profile Completeness</span>
                                <span className={styles.completenessPercent}>{profileCompleteness}%</span>
                            </div>
                            <div className={styles.completenessTrack}>
                                <div className={styles.completenessFill} style={{ width: `${profileCompleteness}%` }} />
                            </div>
                            <p className={styles.completenessHint}>Add your profile photo to reach 100%</p>
                        </div>

                        {/* Verification Checklist */}
                        <div className={styles.verifyCard}>
                            <div className={styles.verifyHeader}>
                                <span className="material-symbols-outlined" style={{ fontSize: '1.25rem', color: 'var(--primary)', fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                                <h3 className={styles.verifyTitle}>How to get Verified</h3>
                            </div>
                            <ul className={styles.verifyList}>
                                {verificationChecklist.map(item => (
                                    <li key={item.label} className={styles.verifyItem}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }}>
                                            check_circle
                                        </span>
                                        <span className={styles.verifyText}>{item.label}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Action Buttons */}
                        <div className={styles.actions}>
                            <button type="submit" className={styles.saveBtn} disabled={saved}>
                                {saved ? '✓ Saved!' : 'Save Changes'}
                            </button>
                            <Link href="/profile" className={styles.cancelLink}>Cancel and return to Profile</Link>
                        </div>
                    </form>
                </div>

                {/* Account Management — outside card, asymmetric row */}
                <div className={styles.dangerZone}>
                    <div className={styles.dangerText}>
                        <h3 className={styles.dangerTitle}>Account Management</h3>
                        <p className={styles.dangerDesc}>Need to temporarily deactivate or permanently delete your GroupBuy profile data?</p>
                    </div>
                    <Link href="/profile/deactivate" className={styles.deactivateBtn}>Deactivate</Link>
                </div>
            </div>
        </main>
    );
}
