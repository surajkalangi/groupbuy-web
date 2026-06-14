'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './BottomNav.module.css';

const navItems = [
    {
        label: 'Home',
        href: '/feed',
        icon: 'home',
    },
    {
        label: 'Pitches',
        href: '/pitches/my',
        matchPrefix: '/pitches',
        icon: 'campaign',
    },
    {
        label: 'Clans',
        href: '/clans/browse',
        matchPrefix: '/clans',
        icon: 'group',
    },
    {
        label: 'Discover',
        href: '/discover',
        icon: 'explore',
    },
];

export default function BottomNav() {
    const pathname = usePathname();

    const isAuthPage = ['/', '/auth/verify', '/auth/setup', '/onboarding/join'].includes(pathname)
        || pathname.startsWith('/auth/');

    if (isAuthPage) return null;

    return (
        <nav className={styles.bottomNav} aria-label="Main navigation">
            {navItems.map((item) => {
                const isActive = item.matchPrefix
                    ? pathname.startsWith(item.matchPrefix)
                    : pathname === item.href;

                return (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                    >
                        <span className={styles.iconWrap}>
                            <span
                                className="material-symbols-outlined"
                                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                            >
                                {item.icon}
                            </span>
                        </span>
                        <span className={styles.label}>{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
