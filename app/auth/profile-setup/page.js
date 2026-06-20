'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import AuthGuard from '@/components/auth/AuthGuard';
import styles from './page.module.css';

const CITIES = ['Bengaluru', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata', 'Others'];

export default function ProfileSetupPage() {
    const { isLoggedIn } = useAuth();
    const router = useRouter();
    const [photo, setPhoto] = useState(null);
    const [form, setForm] = useState({
        name: 'Suraj Kalangi',
        email: 'suraj.kalangi@gmail.com',
        phone: '9876543210',
        city: 'Bengaluru',
        locality: '',
    });
    const [errors, setErrors] = useState({});

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) setPhoto(URL.createObjectURL(file));
    };

    const handleChange = (field, value) => {
        setForm(f => ({ ...f, [field]: value }));
        if (errors[field]) setErrors(e => ({ ...e, [field]: null }));
    };

    const handleComplete = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = 'Full Name is required.';
        if (!form.email.trim()) newErrors.email = 'Email Address is required.';
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        router.push('/onboarding/welcome');
    };

    return (
        <AuthGuard>
        <div className={styles.page}>
            {/* Top brand bar */}
            <header className={styles.topBar}>
                <Link href={isLoggedIn ? '/feed' : '/'} className={styles.brandName}>GroupBuy</Link>
                <div className={styles.topBarSpacer} />
            </header>

            <main className={styles.main}>
                {/* Header */}
                <div className={styles.header}>
                    <h1 className={styles.heading}>Complete your profile</h1>
                    <p className={styles.subtext}>
                        Welcome to the GroupBuy community. Tell us a bit about yourself to start saving together with your social circle.
                    </p>
                </div>

                {/* Form card */}
                <div className={styles.card}>
                    <div className={styles.decoBg} />
                    <div className={styles.formGrid}>
                        {/* Photo upload */}
                        <div className={styles.photoCol}>
                            <label className={styles.photoWrap} htmlFor="photo-upload">
                                <div className={styles.photoCircle}>
                                    {photo ? (
                                        <img src={photo} alt="Profile Preview" className={styles.photoPreview} />
                                    ) : (
                                        <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: 'var(--on-surface-variant)' }}>person</span>
                                    )}
                                </div>
                                <div className={styles.cameraBtn}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>photo_camera</span>
                                </div>
                            </label>
                            <input id="photo-upload" type="file" accept="image/*" className={styles.hidden} onChange={handlePhotoChange} />
                            <div className={styles.photoMeta}>
                                <span className={styles.uploadLabel}>Upload Photo</span>
                                <p className={styles.uploadHint}>JPG or PNG. Max 5MB</p>
                            </div>
                        </div>

                        {/* Fields */}
                        <div className={styles.fieldsCol}>
                            <div className={styles.fieldGroup}>
                                <label className={styles.fieldLabel}>Full Name</label>
                                <input className={styles.input} type="text" value={form.name} onChange={e => handleChange('name', e.target.value)} />
                                {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                            </div>

                            <div className={styles.fieldGroup}>
                                <label className={styles.fieldLabel}>Email Address</label>
                                <div className={styles.inputWithIcon}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '1.125rem', color: 'var(--on-surface-variant)' }}>mail</span>
                                    <input className={styles.inputFlat} type="email" value={form.email} readOnly />
                                    <span className="material-symbols-outlined" style={{ fontSize: '1.125rem', color: '#059669', fontVariationSettings: "'FILL' 1" }}>verified</span>
                                </div>
                                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                            </div>

                            <div className={styles.fieldGroup}>
                                <label className={styles.fieldLabel}>Phone Number</label>
                                <div className={styles.phoneRow}>
                                    <span className={styles.dialCode}>+91</span>
                                    <input className={styles.inputFlat} type="tel" value={form.phone} readOnly />
                                    <div className={styles.verifiedChip}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '0.875rem', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                        <span>Verified</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.locationGrid}>
                                <div className={styles.fieldGroup}>
                                    <label className={styles.fieldLabel}>City</label>
                                    <div className={styles.selectWrap}>
                                        <select className={styles.select} value={form.city} onChange={e => handleChange('city', e.target.value)}>
                                            {CITIES.map(c => <option key={c}>{c}</option>)}
                                        </select>
                                        <span className="material-symbols-outlined" style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--on-surface-variant)' }}>expand_more</span>
                                    </div>
                                </div>

                                <div className={styles.fieldGroup}>
                                    <label className={styles.fieldLabel}>Society / Locality</label>
                                    <div className={styles.inputWithIcon}>
                                        <input className={styles.inputFlat} type="text" placeholder="e.g. Prestige Lakeside" value={form.locality} onChange={e => handleChange('locality', e.target.value)} />
                                        <span className="material-symbols-outlined" style={{ fontSize: '1.125rem', color: 'var(--on-surface-variant)', opacity: 0.4 }}>location_on</span>
                                    </div>
                                </div>
                            </div>

                            {/* Trust note */}
                            <div className={styles.trustNote}>
                                <span className="material-symbols-outlined" style={{ color: 'var(--primary)', marginTop: '2px' }}>security</span>
                                <p className={styles.trustText}>
                                    Your location details help us connect you with communities near you. We never share your private information with third parties.
                                </p>
                            </div>

                            {/* CTAs */}
                            <div className={styles.ctaSection}>
                                <button onClick={handleComplete} className={styles.ctaBtn} style={{ border: 'none', cursor: 'pointer' }}>
                                    Complete Setup
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        </AuthGuard>
    );
}
