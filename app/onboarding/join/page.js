'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockClans } from '@/data/clans';
import styles from './page.module.css';
import AuthGuard from '@/components/auth/AuthGuard';

export default function JoinClanPrompt() {
    const router = useRouter();
    const [inviteCode, setInviteCode] = useState('');
    const [error, setError] = useState('');

    const handleJoinWithCode = () => {
        setError('');
        const code = inviteCode.trim();
        if (code) {
            // Check if code matches inviteCode or clan ID
            const clan = mockClans.find(c => c.inviteCode === code || c.id === code);
            if (clan) {
                router.push(`/clans/${clan.id}/preview`);
            } else {
                setError('Invalid invite code or link');
            }
        }
    };

    return (
        <AuthGuard>
        <main className={styles.page}>
            <div className={styles.container}>
                {/* Header Icon */}
                <div className={styles.iconWrapper}>
                    <div className={styles.iconBg}>
                        <span className="material-symbols-outlined" style={{ fontSize: '56px', color: 'var(--primary)', fontVariationSettings: "'FILL' 1" }}>diversity_3</span>
                    </div>
                    <div className={styles.pill}>COMMUNITY</div>
                </div>

                <div className={styles.header}>
                    <h1 className={styles.title}>Join your community</h1>
                    <p className={styles.subtitle}>
                        Find your apartment, office, or<br/>friend group
                    </p>
                </div>

                {/* Invite Code Input */}
                <div className={styles.inputGroup}>
                    <div className={`${styles.inputWrapper} ${error ? styles.inputError : ''}`}>
                        <span className="material-symbols-outlined" style={{ color: 'var(--on-surface-muted)', fontSize: '20px' }}>link</span>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Enter invite code or link"
                            value={inviteCode}
                            onChange={(e) => {
                                setInviteCode(e.target.value);
                                setError('');
                            }}
                        />
                        <button
                            className={styles.joinBtn}
                            onClick={handleJoinWithCode}
                            disabled={!inviteCode.trim()}
                        >
                            Join
                        </button>
                    </div>
                    {error && <p className={styles.errorMessage}>{error}</p>}
                </div>

                {/* Browse Clans */}
                <button className={styles.browseBtn} onClick={() => router.push('/clans/browse')}>
                    <span className="material-symbols-outlined" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>explore</span>
                    Browse Nearby Clans
                </button>

                {/* Info Box */}
                <div className={styles.infoBox}>
                    <div className={styles.infoIcon}>
                        <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontVariationSettings: "'FILL' 1" }}>groups</span>
                    </div>
                    <div className={styles.infoText}>
                        <h3 className={styles.infoTitle}>Why join a Clan?</h3>
                        <p className={styles.infoDesc}>Clans unlock group discounts and exclusive bulk deals shared with your local neighbors.</p>
                    </div>
                </div>

                {/* Create Clan Link */}
                <button
                    className={styles.createLink}
                    onClick={() => router.push('/clans/create')}
                >
                    Create a New Clan 
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                </button>
            </div>
        </main>
        </AuthGuard>
    );
}
