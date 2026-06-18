'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';
import GuestGuard from '@/components/auth/GuestGuard';

export default function DeactivatedPage() {
    const { logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Automatically log out when landing on this page
        logout();
    }, [logout]);

    const handleReturnHome = (e) => {
        e.preventDefault();
        router.push('/');
    };

    return (
        <GuestGuard>
        <main className={styles.page}>
            <header className={styles.header}>
                <Link href="/" className={styles.logo}>GroupBuy</Link>
                <Link href="/support" className={styles.helpLink}>Help Center</Link>
            </header>
            <div className={styles.container}>
                <div className={styles.icon}><span className="material-symbols-outlined" style={{ fontSize: '3rem' }}>dark_mode</span></div>
                <h1 className={styles.title}>Your account is now deactivated.</h1>
                <p className={styles.desc}>We&apos;re sorry to see you go, but we&apos;ve hidden your profile and clan memberships. All your active commitments have been handled safely.</p>
                <div className={styles.comeBackCard}>
                    <h3 className={styles.comeBackTitle}>Want to come back?</h3>
                    <p className={styles.comeBackDesc}>Whenever you&apos;re ready to join the community again, just sign in with your mobile number and everything will be right where you left it.</p>
                </div>
                <button onClick={handleReturnHome} className={styles.homeBtn}>Return to Home →</button>
                <div className={styles.footerLinks}>
                    <Link href="/support">HELP CENTER</Link><Link href="/privacy">PRIVACY POLICY</Link><Link href="/terms">TERMS OF SERVICE</Link>
                </div>
                <p className={styles.copyright}>© 2026 GroupBuy. All rights reserved.</p>
            </div>
        </main>
        </GuestGuard>
    );
}
