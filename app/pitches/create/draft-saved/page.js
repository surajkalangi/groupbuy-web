'use client';

import Link from 'next/link';
import BottomNav from '@/components/layout/BottomNav';
import Navbar from '@/components/layout/Navbar';
import styles from './page.module.css';
import AuthGuard from '@/components/auth/AuthGuard';

export default function DraftSavedPage() {
    return (
        <AuthGuard>
        <>
            <Navbar />
            <main className={styles.page}>
                <div className={styles.container}>
                    <div className={styles.card}>
                        <div className={styles.successIcon}>
                            <span className="material-symbols-outlined">check_circle</span>
                        </div>
                        
                        <h1 className={styles.title}>Pitch Saved as Draft</h1>
                        <p className={styles.subtitle}>
                            You can find your draft in &quot;My Pitches&quot; under Hosting Tab and publish it whenever you are ready.
                        </p>

                        {/* Draft Card */}
                        <div className={styles.draftCard}>
                            <div className={styles.draftThumb}>
                                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAglWbxSq5HhC5Hy-_Sp9Ul6iFL_ERsp6b2ln5RKP7I-1PRD8Cyzl908sq4PuHGAyRhNXCcgy9zuwS6RGEOBghBSUkK6bd7ad8ONYtoGg-GXqg-ZySOSwQkBIMuBx8aNG8aVismteZoaYKnvlTOk7gYNHEO5j-8c6_wH6BLSnct07Iy4MgScEhz2ezYikRfIh1wQRLaAuud9v9dN0H0jeqfKfLtH8h5CgRiSkrL1-V2orAe9hqMjCRtoMBLgvYiHB3bIbHDoFMpvwup" alt="Mangoes" />
                            </div>
                            <div className={styles.draftInfo}>
                                <div className={styles.draftBadgeRow}>
                                    <span className={styles.draftBadge}>DRAFT</span>
                                    <span className={styles.draftTime}>Updated just now</span>
                                </div>
                                <h3 className={styles.draftName}>Heritage Monsoon Mangoes</h3>
                                <div className={styles.draftMetaRow}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--primary)' }}>group</span>
                                    <span className={styles.draftMeta}>Awaiting 15 more members</span>
                                </div>
                            </div>
                            <span className="material-symbols-outlined" style={{ color: 'var(--outline)', fontSize: '1.5rem' }}>chevron_right</span>
                        </div>

                        <div className={styles.actions}>
                            <Link href="/pitches/my" className={styles.primaryBtn}>Go to My Pitches</Link>
                            <Link href="/feed" className={styles.outlineBtn}>Back to Home</Link>
                        </div>
                    </div>

                    <p className={styles.helpText}>
                        Need help with your pitch? <Link href="#" className={styles.supportLink}>Contact Community Support</Link>
                    </p>
                </div>
            </main>
            <BottomNav />
        </>
        </AuthGuard>
    );
}
