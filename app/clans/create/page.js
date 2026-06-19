'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import BottomNav from '@/components/layout/BottomNav';
import styles from './page.module.css';
import AuthGuard from '@/components/auth/AuthGuard';

export default function CreateClan() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: '',
        description: '',
        requireApproval: true,
        clanImage: null,
    });
    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setForm((prev) => ({ ...prev, clanImage: file }));
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const removeImage = (e) => {
        e.preventDefault();
        setForm((prev) => ({ ...prev, clanImage: null }));
        setImagePreview(null);
    };

    const handleCreate = (e) => {
        e.preventDefault();
        if (!form.name.trim()) return;
        setLoading(true);
        setTimeout(() => {
            router.push('/clans/clan-1/invite');
        }, 800);
    };

    return (
        <AuthGuard>
        <>
            <Navbar />
            <main className={styles.page}>
                <div className={styles.container}>
                    {/* Editorial Header */}
                    <div className={styles.headerSection}>
                        <h1 className={styles.title}>Create a new Clan</h1>
                        <p className={styles.subtitle}>
                            Establish your community commerce hub. Invite your trusted circle to unlock collective purchasing power.
                        </p>
                    </div>

                    <form className={styles.formWrapper} onSubmit={handleCreate}>
                        {/* Cover Image Upload Section */}
                        <section className={styles.uploadSection}>
                            {imagePreview ? (
                                <div className={styles.imagePreviewWrapper}>
                                    <img src={imagePreview} alt="Cover Preview" className={styles.imagePreview} />
                                    <button type="button" className={styles.removeImageBtn} onClick={removeImage}>
                                        <span className="material-symbols-outlined">close</span>
                                    </button>
                                </div>
                            ) : (
                                <label className={styles.uploadDropzone}>
                                    <input type="file" accept="image/*" className={styles.hiddenInput} onChange={handleImageChange} />
                                    <div className={styles.uploadContent}>
                                        <div className={styles.uploadIconWrapper}>
                                            <span className="material-symbols-outlined">add_photo_alternate</span>
                                        </div>
                                        <p className={styles.uploadTitle}>Upload Clan Cover Image</p>
                                        <p className={styles.uploadHint}>Recommended: 1200 x 480 pixels</p>
                                    </div>
                                </label>
                            )}
                        </section>

                        {/* Main Form Card */}
                        <div className={styles.mainCard}>
                            {/* Clan Identity */}
                            <div className={styles.fieldSet}>
                                <div className={styles.fieldGroup}>
                                    <label className={styles.fieldLabel}>Clan Name</label>
                                    <input 
                                        className={styles.inputField} 
                                        placeholder="e.g., Prestige Lakeside - Block A" 
                                        type="text" 
                                        value={form.name}
                                        onChange={handleChange('name')}
                                        required
                                    />
                                </div>
                                <div className={styles.fieldGroup}>
                                    <label className={styles.fieldLabel}>Description (Optional)</label>
                                    <textarea 
                                        className={styles.textareaField} 
                                        placeholder="Tell potential members what this Clan is about..." 
                                        rows="3"
                                        value={form.description}
                                        onChange={handleChange('description')}
                                    ></textarea>
                                </div>
                            </div>

                            {/* Location Picker */}
                            <div className={styles.locationSection}>
                                <div className={styles.locationHeader}>
                                    <label className={styles.fieldLabel}>Location</label>
                                    <button type="button" className={styles.useCurrentBtn}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>my_location</span> Use Current
                                    </button>
                                </div>
                                <div className={styles.mapContainer}>
                                    <img 
                                        className={styles.mapImage} 
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNo7Fp3RoihkBcv8yDlo9AGE43WcIFqgLNQCFhEeqp0HzMK9J6878mh6cpgfyPeB_RiGPfs8wxrDvbtcIlvsSzBALqN-saLF1Yl9XC3kkzDXM6FTag3VeUdmE-lpP7Y2hrh0_vrT30XGWvkX2Lup4NlWX0zYN8rIoLQUYF7KptXA7C9DI1tuj3SM6RLay4l2kX3cfkffHHJiWbCgrEhhvNc1EFIy4yVL8YC4PLxfAwd26Es1Bl3QUz5F1aBabw_obl9Fb0_uYgpXzN" 
                                        alt="Map view" 
                                    />
                                    <div className={styles.mapOverlay}>
                                        <div className={styles.mapBadge}>
                                            <span className="material-symbols-outlined" style={{ color: 'var(--secondary)', fontVariationSettings: "'FILL' 1" }}>location_on</span>
                                            <span className={styles.mapBadgeText}>Set on map</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Privacy Toggle */}
                            <div className={styles.privacySection}>
                                <div className={styles.privacyInfo}>
                                    <div className={styles.privacyIconWrapper}>
                                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                                    </div>
                                    <div>
                                        <p className={styles.privacyTitle}>Require approval to join</p>
                                        <p className={styles.privacyHint}>New members must be vetted by you</p>
                                    </div>
                                </div>
                                <label className={styles.toggleWrapper}>
                                    <input 
                                        type="checkbox" 
                                        className={styles.hiddenInput} 
                                        checked={form.requireApproval}
                                        onChange={() => setForm(prev => ({ ...prev, requireApproval: !prev.requireApproval }))}
                                    />
                                    <div className={styles.toggleTrack}></div>
                                    <div className={styles.toggleThumb}></div>
                                </label>
                            </div>
                        </div>

                        {/* Primary Action */}
                        <div className={styles.actionSection}>
                            <button 
                                type="submit" 
                                className={`${styles.submitBtn} ${!form.name.trim() || loading ? styles.submitBtnDisabled : ''}`}
                                disabled={!form.name.trim() || loading}
                            >
                                {loading ? 'Creating...' : 'Create Clan'}
                                {!loading && <span className="material-symbols-outlined">rocket_launch</span>}
                            </button>
                            <p className={styles.consentText}>
                                By creating a clan, you agree to the <span className={styles.consentLink}>Community Guidelines</span> and will act as the primary moderator.
                            </p>
                        </div>
                    </form>
                </div>
            </main>
            <BottomNav />
        </>
        </AuthGuard>
    );
}
