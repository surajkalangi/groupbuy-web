'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import BottomNav from '@/components/layout/BottomNav';
import { globalStore } from '@/utils/store';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';
import AuthGuard from '@/components/auth/AuthGuard';

const NOTIFICATIONS = [
    {
        id: 1,
        type: 'pitch',
        icon: 'rocket_launch',
        iconBg: 'primary',
        title: 'Threshold Met: Organic Alphonso Mangoes',
        message: "Great news! The 'Prestige Lakeside' clan just hit the 20-box goal. Deal is ON!",
        time: '2m ago',
        read: false,
        cta: { label: 'View Pitch Details', href: '/pitches/pitch-1' },
    },
    {
        id: 2,
        type: 'delivery',
        icon: 'local_shipping',
        iconBg: 'secondary',
        title: 'Ready for Pickup',
        message: "Your order for 'Premium Cashews' has arrived at B-Block Lobby, Prestige Lakeside.",
        time: '45m ago',
        read: false,
        cta: { label: 'View Details', href: '/pitches/pitch-2' },
    },
    {
        id: 99,
        type: 'delivery',
        icon: 'star_rate',
        iconBg: 'primary',
        title: 'Delivery Complete: How was it?',
        message: "Your order for 'Organic Alphonso Mangoes' was delivered. Tap to rate your experience.",
        time: '1h ago',
        read: false,
        cta: { label: 'Rate Host & Product', action: 'rate_pitch_3' },
    },
    {
        id: 3,
        type: 'clan',
        icon: 'group_add',
        iconBg: 'neutral',
        title: 'Join Request: Prestige Lakeside Towers',
        message: "Amit V. has requested to join your buying clan. Review their community reputation score.",
        time: '3h ago',
        read: true,
        cta: { label: 'Review Request', href: '/clans' },
    },
    {
        id: 4,
        type: 'pitch',
        icon: 'campaign',
        iconBg: 'neutral',
        title: 'New Pitch: Kolhapuri Jaggery',
        message: "A new group buy is live in Prestige Lakeside — ₹80/kg premium jaggery. Only 3 spots left!",
        time: 'Yesterday',
        read: true,
        cta: { label: 'Join Group', href: '/pitches/pitch-2' },
    },
    {
        id: 5,
        type: 'reputation',
        icon: 'verified',
        iconBg: 'neutral',
        title: 'Reputation Milestone!',
        message: "You've reached 'Trusted Buyer' status. You now get early access to limited-stock pitches.",
        time: '2 days ago',
        read: true,
        cta: null,
    },
];

const FILTERS = ['All', 'Pitches', 'Clans', 'Delivery'];

export default function ActivityPage() {
    const { triggerRatingModal } = useAuth();
    const [activeFilter, setActiveFilter] = useState('All');
    const [notifications, setNotifications] = useState(NOTIFICATIONS);

    useEffect(() => {
        if (globalStore.notificationsRead) {
            setNotifications(ns => ns.map(n => ({ ...n, read: true })));
        }
    }, []);

    const markAllRead = () => {
        setNotifications(ns => ns.map(n => ({ ...n, read: true })));
        window.dispatchEvent(new Event('readAllNotifications'));
    };

    const filtered = activeFilter === 'All'
        ? notifications
        : notifications.filter(n => {
            if (activeFilter === 'Pitches') return n.type === 'pitch';
            if (activeFilter === 'Clans') return n.type === 'clan';
            if (activeFilter === 'Delivery') return n.type === 'delivery';
            return true;
        });

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <AuthGuard>
        <div className={styles.page}>
            <Navbar />
            <main className={styles.main}>
                {/* Header */}
                <div className={styles.pageHeader}>
                    <div>
                        <h1 className={styles.heading}>
                            Notifications
                            {unreadCount > 0 && <span className={styles.unreadBadge}>{unreadCount}</span>}
                        </h1>
                        <p className={styles.subtext}>Stay updated with your community's pulse.</p>
                    </div>
                    <button className={styles.markAllBtn} onClick={markAllRead}>
                        <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>done_all</span>
                        Mark all as read
                    </button>
                </div>

                {/* Filter chips */}
                <div className={styles.filterRow}>
                    {FILTERS.map(f => (
                        <button
                            key={f}
                            className={`${styles.filterChip} ${activeFilter === f ? styles.filterActive : ''}`}
                            onClick={() => setActiveFilter(f)}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Notification list */}
                <div className={styles.list}>
                    {filtered.map(n => (
                        <div key={n.id} className={`${styles.notifCard} ${!n.read ? styles.unread : styles.read}`}>
                            <div className={`${styles.notifIcon} ${styles[`icon_${n.iconBg}`]}`}>
                                <span className="material-symbols-outlined" style={{ fontSize: '1.75rem' }}>{n.icon}</span>
                            </div>
                            <div className={styles.notifBody}>
                                <div className={styles.notifMeta}>
                                    <h3 className={styles.notifTitle}>{n.title}</h3>
                                    <span className={styles.notifTime}>{n.time}</span>
                                </div>
                                <p className={styles.notifMessage}>{n.message}</p>
                                {n.cta && (
                                    n.cta.action === 'rate_pitch_3' ? (
                                        <button onClick={() => triggerRatingModal('pitch-3')} className={`${styles.notifCta} ${!n.read ? styles.notifCtaPrimary : ''}`} style={{ border: 'none', background: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', padding: 0 }}>
                                            {n.cta.label}
                                        </button>
                                    ) : (
                                        <Link href={n.cta.href} className={`${styles.notifCta} ${!n.read ? styles.notifCtaPrimary : ''}`}>
                                            {n.cta.label}
                                        </Link>
                                    )
                                )}
                            </div>
                            {!n.read && <div className={styles.unreadDot} />}
                        </div>
                    ))}
                </div>

                {/* Load more */}
                <div className={styles.footer}>
                    <button className={styles.loadMoreBtn}>View Past Notifications</button>
                </div>
            </main>
            <BottomNav />
        </div>
        </AuthGuard>
    );
}
