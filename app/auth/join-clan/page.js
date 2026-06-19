'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import AuthGuard from '@/components/auth/AuthGuard';

export default function JoinClanPage() {
    const router = useRouter();
    const [inviteCode, setInviteCode] = useState('');
    const [joining, setJoining] = useState(false);

    const handleJoin = (e) => {
        e.preventDefault();
        if (!inviteCode.trim()) return;
        setJoining(true);
        // Simulate join — in production this calls the API
        setTimeout(() => {
            router.push('/clans/clan-1/welcome');
        }, 800);
    };

    const handleBrowse = () => {
        router.push('/clans/browse');
    };

    return (
        <AuthGuard>
        <div className={styles.page}>
            {/* Decorative blobs */}
            <div className={styles.blobTopRight} />
            <div className={styles.blobBottomLeft} />

            <main className={styles.main}>
                {/* Hero Icon */}
                <div className={styles.heroWrap}>
                    <div className={styles.heroGlow} />
                    <div className={styles.heroIcon}>
                        <span
                            className="material-symbols-outlined"
                            style={{ fontSize: '3.5rem', color: 'var(--primary)', fontVariationSettings: "'wght' 200" }}
                        >
                            diversity_3
                        </span>
                    </div>
                    <div className={styles.communityChip}>COMMUNITY</div>
                </div>

                {/* Header */}
                <div className={styles.headerText}>
                    <h1 className={styles.heading}>Join your community</h1>
                    <p className={styles.subtext}>Find your apartment, office, or friend group</p>
                </div>

                {/* Action Bento Stack */}
                <div className={styles.actions}>
                    {/* Invite Code Input Group */}
                    <form className={styles.inviteInputGroup} onSubmit={handleJoin}>
                        <div className={styles.inviteIconWrap}>
                            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>link</span>
                        </div>
                        <input
                            className={styles.inviteInput}
                            type="text"
                            placeholder="Enter invite code or link"
                            value={inviteCode}
                            onChange={e => setInviteCode(e.target.value)}
                            id="invite-code-input"
                        />
                        <button
                            type="submit"
                            className={styles.joinBtn}
                            disabled={!inviteCode.trim() || joining}
                        >
                            {joining ? '...' : 'Join'}
                        </button>
                    </form>

                    {/* Browse Nearby Clans */}
                    <button className={styles.browseBtn} onClick={handleBrowse} id="browse-clans-btn">
                        <span
                            className="material-symbols-outlined"
                            style={{ fontSize: '1.5rem', fontVariationSettings: "'FILL' 1" }}
                        >
                            explore
                        </span>
                        <span>Browse Nearby Clans</span>
                    </button>

                    {/* Contextual Info Card */}
                    <div className={styles.whyCard}>
                        <div className={styles.whyIconWrap}>
                            <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>groups</span>
                        </div>
                        <div>
                            <h4 className={styles.whyTitle}>Why join a Clan?</h4>
                            <p className={styles.whyText}>
                                Clans unlock group discounts and exclusive bulk deals shared with your community.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer links */}
                <div className={styles.footerLinks}>
                    <Link href="/clans/create" className={styles.createLink}>
                        <span>Create a New Clan</span>
                        <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>arrow_forward</span>
                    </Link>
                </div>
            </main>
        </div>
        </AuthGuard>
    );
}
