'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { globalStore } from '@/utils/store';
import styles from './Navbar.module.css';

export default function Navbar({ children, backHref }) {
    const pathname = usePathname();
    const [hasUnread, setHasUnread] = useState(true);

    useEffect(() => {
        if (globalStore.notificationsRead) {
            setHasUnread(false);
        }

        const handleRead = () => {
            setHasUnread(false);
            globalStore.notificationsRead = true;
        };
        
        window.addEventListener('readAllNotifications', handleRead);
        return () => window.removeEventListener('readAllNotifications', handleRead);
    }, []);

    const isAuthPage = ['/', '/auth/verify', '/auth/setup', '/onboarding/join'].includes(pathname)
        || pathname.startsWith('/auth/');

    if (isAuthPage) return null;

    return (
        <header className={styles.navbar}>
            <div className={styles.inner}>
                <div className={styles.leftSection}>
                    {backHref && (
                        <Link href={backHref} className={styles.backBtn}>
                            <span className="material-symbols-outlined">arrow_back</span>
                        </Link>
                    )}
                    <Link href="/feed" className={styles.logo}>
                        <span className={styles.logoText}>GroupBuy</span>
                    </Link>

                    <nav className={styles.desktopNav}>
                        <Link
                            href="/feed"
                            className={`${styles.navLink} ${pathname === '/feed' ? styles.active : ''}`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/pitches/my"
                            className={`${styles.navLink} ${pathname.startsWith('/pitches') ? styles.active : ''}`}
                        >
                            Pitches
                        </Link>
                        <Link
                            href="/clans/browse"
                            className={`${styles.navLink} ${pathname.startsWith('/clans') ? styles.active : ''}`}
                        >
                            Clans
                        </Link>
                        <Link
                            href="/discover"
                            className={`${styles.navLink} ${pathname === '/discover' ? styles.active : ''}`}
                        >
                            Discover
                        </Link>
                    </nav>
                </div>

                {pathname !== '/discover' && (
                    <>
                        {/* Inline search bar */}
                        <div className={styles.inlineSearch}>
                            <div className={styles.inlineSearchBar}>
                                <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--on-surface-muted)' }}>search</span>
                                <input
                                    type="search"
                                    placeholder="Search pitches, products, or clans..."
                                    className={styles.inlineSearchInput}
                                />
                            </div>
                        </div>
                    </>
                )}

                <div className={styles.actions}>
                    {/* Mobile search icon */}
                    {pathname !== '/discover' && (
                        <Link href="/search" className={`${styles.iconBtn} ${styles.mobileSearchIcon}`} aria-label="Search">
                            <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>search</span>
                        </Link>
                    )}

                    {/* Notifications */}
                    <Link 
                        href="/activity" 
                        className={`${styles.notifBtn} ${pathname === '/activity' ? styles.activeNotifBtn : ''}`} 
                        aria-label="Notifications"
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>notifications</span>
                        {hasUnread && <span className={styles.notifDot} />}
                    </Link>

                    {/* Profile avatar + name */}
                    <Link href="/profile" className={styles.profileSection} aria-label="Profile">
                        <div className={styles.profileText}>
                            <span className={styles.profileName}>Suraj K.</span>
                            <span className={styles.profileClan}>Prestige Clan</span>
                        </div>
                        <div className={styles.profileAvatar}>
                            <span className={styles.avatarLetter}>S</span>
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
}
