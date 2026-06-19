'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import BottomNav from '@/components/layout/BottomNav';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import styles from './page.module.css';
import AuthGuard from '@/components/auth/AuthGuard';

const INITIAL_REQUESTS = [
    { id: 1, name: 'Rahul Sharma', initials: 'RS', location: 'B-Block, Prestige Lakeside', time: '2 min ago', color: '#4A90D9' },
    { id: 2, name: 'Priya Nair', initials: 'PN', location: 'A-Block, Prestige Lakeside', time: '8 min ago', color: '#E67E22' },
    { id: 3, name: 'Arjun Menon', initials: 'AM', location: 'C-Block, Prestige Lakeside', time: '15 min ago', color: '#9B59B6' },
    { id: 4, name: 'Deepika Reddy', initials: 'DR', location: 'D-Block, Prestige Lakeside', time: '1 hr ago', color: '#1ABC9C' },
];

export default function InviteMembers({ params }) {
    const router = useRouter();
    const [copied, setCopied] = useState(false);
    const [requests, setRequests] = useState(INITIAL_REQUESTS);
    const [toast, setToast] = useState(null);
    const inviteLink = 'groupbuy.app/join/clan-abc123';

    const handleCopy = () => {
        navigator.clipboard?.writeText(`https://${inviteLink}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 2500);
    };

    const handleApprove = (id) => {
        const user = requests.find(r => r.id === id);
        setRequests(prev => prev.filter(r => r.id !== id));
        showToast(`${user.name} has been approved!`, 'success');
    };

    const handleReject = (id) => {
        const user = requests.find(r => r.id === id);
        setRequests(prev => prev.filter(r => r.id !== id));
        showToast(`${user.name}'s request was declined.`, 'reject');
    };

    return (
        <AuthGuard>
        <>
            <Navbar />
            <main className={styles.page}>
                <div className={styles.container}>
                    {/* Success Banner */}
                    <div className={styles.successBanner}>
                        <div className={styles.checkIcon}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <h1 className={styles.title}>Clan Created Successfully!</h1>
                        <p className={styles.subtitle}>
                            Your community is ready. Invite your circle to start saving together.
                        </p>
                    </div>

                    {/* Invite Link */}
                    <Card variant="default" padding="lg" className={styles.card}>
                        <div className={styles.cardHeader}>
                            <span className={styles.cardLabel}>CLAN INVITE LINK</span>
                            <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--primary)' }}>link</span>
                        </div>
                        <div className={styles.linkRow}>
                            <span className={styles.linkText}>{inviteLink}</span>
                            <button className={styles.copyBtn} onClick={handleCopy}>
                                {copied ? '✓ Copied!' : 'COPY'}
                                {!copied && (
                                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>content_copy</span>
                                )}
                            </button>
                        </div>
                    </Card>

                    {/* Quick Share + QR Code */}
                    <div className={styles.shareGrid}>
                        <Card variant="flat" padding="lg" className={styles.shareCard}>
                            <span className={styles.cardLabel}>QUICK SHARE</span>
                            <div className={styles.shareButtons}>
                                <button className={styles.whatsappBtn}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.655-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    WhatsApp
                                </button>
                                <div className={styles.secondaryShareRow}>
                                    <button className={styles.smsBtn}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                        </svg>
                                        SMS
                                    </button>
                                    <button className={styles.moreBtn}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                                        </svg>
                                        More
                                    </button>
                                </div>
                            </div>
                        </Card>

                        <Card variant="flat" padding="lg" className={styles.qrCard}>
                            <span className={styles.cardLabel}>CLAN QR CODE</span>
                            <div className={styles.qrPlaceholder}>
                                <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                                    <rect x="5" y="5" width="30" height="30" rx="3" fill="var(--on-surface)" />
                                    <rect x="65" y="5" width="30" height="30" rx="3" fill="var(--on-surface)" />
                                    <rect x="5" y="65" width="30" height="30" rx="3" fill="var(--on-surface)" />
                                    <rect x="10" y="10" width="20" height="20" rx="2" fill="var(--surface)" />
                                    <rect x="70" y="10" width="20" height="20" rx="2" fill="var(--surface)" />
                                    <rect x="10" y="70" width="20" height="20" rx="2" fill="var(--surface)" />
                                    <rect x="14" y="14" width="12" height="12" rx="1" fill="var(--on-surface)" />
                                    <rect x="74" y="14" width="12" height="12" rx="1" fill="var(--on-surface)" />
                                    <rect x="14" y="74" width="12" height="12" rx="1" fill="var(--on-surface)" />
                                    <rect x="40" y="5" width="8" height="8" rx="1" fill="var(--on-surface)" />
                                    <rect x="52" y="5" width="8" height="8" rx="1" fill="var(--on-surface)" />
                                    <rect x="40" y="17" width="8" height="8" rx="1" fill="var(--on-surface)" />
                                    <rect x="40" y="40" width="8" height="8" rx="1" fill="var(--primary)" />
                                    <rect x="52" y="40" width="8" height="8" rx="1" fill="var(--primary)" />
                                    <rect x="40" y="52" width="8" height="8" rx="1" fill="var(--primary)" />
                                    <rect x="52" y="52" width="8" height="8" rx="1" fill="var(--on-surface)" />
                                    <rect x="65" y="40" width="8" height="8" rx="1" fill="var(--on-surface)" />
                                    <rect x="77" y="52" width="8" height="8" rx="1" fill="var(--on-surface)" />
                                    <rect x="65" y="65" width="8" height="8" rx="1" fill="var(--on-surface)" />
                                    <rect x="77" y="77" width="8" height="8" rx="1" fill="var(--on-surface)" />
                                    <rect x="5" y="40" width="8" height="8" rx="1" fill="var(--on-surface)" />
                                    <rect x="5" y="52" width="8" height="8" rx="1" fill="var(--on-surface)" />
                                    <rect x="17" y="52" width="8" height="8" rx="1" fill="var(--on-surface)" />
                                </svg>
                            </div>
                            <span className={styles.qrLabel}>SCAN TO JOIN CLAN</span>
                        </Card>
                    </div>

                    {/* Pending Requests */}
                    <div className={styles.pendingSection}>
                        <div className={styles.pendingHeader}>
                            <h3 className={styles.pendingTitle}>Pending Requests</h3>
                            <Badge variant="default" size="sm">
                                {requests.length > 0 ? `NEW (${requests.length})` : 'NEW (0)'}
                            </Badge>
                        </div>

                        {requests.length > 0 ? (
                            <div className={styles.requestList}>
                                {requests.map((req) => (
                                    <div key={req.id} className={styles.requestCard}>
                                        <div className={styles.requestAvatar} style={{ backgroundColor: req.color }}>
                                            {req.initials}
                                        </div>
                                        <div className={styles.requestInfo}>
                                            <span className={styles.requestName}>{req.name}</span>
                                            <span className={styles.requestMeta}>
                                                <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>location_on</span>
                                                {req.location}
                                            </span>
                                            <span className={styles.requestTime}>{req.time}</span>
                                        </div>
                                        <div className={styles.requestActions}>
                                            <button
                                                className={styles.approveBtn}
                                                onClick={() => handleApprove(req.id)}
                                            >
                                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>check</span>
                                                Approve
                                            </button>
                                            <button
                                                className={styles.rejectBtn}
                                                onClick={() => handleReject(req.id)}
                                            >
                                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>close</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className={styles.pendingEmpty}>
                                <div className={styles.pendingEmptyIcon}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '24px', color: 'var(--on-surface-muted)' }}>group_add</span>
                                </div>
                                <p className={styles.pendingEmptyTitle}>No pending invites</p>
                                <p className={styles.pendingEmptyText}>
                                    When people use your link, their requests will appear here for approval.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* CTAs */}
                    <div className={styles.ctaSection}>
                        <Button variant="primary" size="lg" fullWidth>
                            Start Inviting
                        </Button>
                        <Link href={`/clans/clan-1`} className={styles.secondaryCta}>
                            Go to Clan Feed →
                        </Link>
                    </div>
                </div>
            </main>
            <BottomNav />

            {/* Toast Notification */}
            {toast && (
                <div className={`${styles.toast} ${toast.type === 'reject' ? styles.toastReject : styles.toastSuccess}`}>
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                        {toast.type === 'reject' ? 'person_remove' : 'person_add'}
                    </span>
                    {toast.message}
                </div>
            )}
        </>
        </AuthGuard>
    );
}
