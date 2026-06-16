'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import styles from './AuthGuard.module.css';

/**
 * AuthGuard — wraps protected pages to prevent guest access.
 *
 * Usage:
 *   <AuthGuard>
 *     <YourPageContent />
 *   </AuthGuard>
 *
 * Props:
 *   - redirect (boolean, default false): If true, redirects guests to "/" instead of showing a message.
 *   - children: The protected page content.
 */
export default function AuthGuard({ children, redirect = false }) {
    const { isGuest, isHydrated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isHydrated && isGuest && redirect) {
            router.replace('/');
        }
    }, [isHydrated, isGuest, redirect, router]);

    // Don't render anything until auth state is hydrated from localStorage
    if (!isHydrated) {
        return null;
    }

    // Guest user — show sign-in prompt (if not redirecting)
    if (isGuest && !redirect) {
        return (
            <main className={styles.guardPage}>
                <div className={styles.guardCard}>
                    <div className={styles.iconWrap}>
                        <span className="material-symbols-outlined" style={{ fontSize: '2.5rem', fontVariationSettings: "'FILL' 1" }}>
                            shield_person
                        </span>
                    </div>
                    <h2 className={styles.title}>Sign in to continue</h2>
                    <p className={styles.subtitle}>
                        This page is only available to signed-in users. Create an account or sign in to access your feed, pitches, and community.
                    </p>
                    <Link href="/auth/verify" className={styles.signInBtn}>
                        Sign In
                        <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>arrow_forward</span>
                    </Link>
                    <Link href="/" className={styles.homeLink}>
                        ← Back to Home
                    </Link>
                </div>
            </main>
        );
    }

    // Guest + redirect mode — show nothing while redirecting
    if (isGuest && redirect) {
        return null;
    }

    // Authenticated — render the page
    return children;
}
