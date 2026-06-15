'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

/**
 * GuestGuard — wraps public/guest pages to prevent logged-in access.
 *
 * Usage:
 *   <GuestGuard>
 *     <YourPageContent />
 *   </GuestGuard>
 *
 * Props:
 *   - redirectTo (string, default "/feed"): Where to send logged-in users.
 *   - children: The page content for guests.
 */
export default function GuestGuard({ children, redirectTo = '/feed' }) {
    const { isLoggedIn, isHydrated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isHydrated && isLoggedIn) {
            router.replace(redirectTo);
        }
    }, [isHydrated, isLoggedIn, redirectTo, router]);

    // Don't render anything until auth state is hydrated from localStorage
    if (!isHydrated) {
        return null;
    }

    // Authenticated user — show nothing while redirecting
    if (isLoggedIn) {
        return null;
    }

    // Guest — render the page
    return children;
}
