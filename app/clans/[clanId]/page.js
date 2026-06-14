'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import BottomNav from '@/components/layout/BottomNav';
import PitchCard from '@/components/pitch/PitchCard';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import { mockClans } from '@/data/clans';
import { mockPitches } from '@/data/pitches';
import { mockUsers } from '@/data/users';
import styles from './page.module.css';

export default function ClanDetail({ params }) {
    const { clanId } = use(params);
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('pitches');

    const clan = mockClans.find(c => c.id === clanId) || mockClans[0];
    const clanPitches = mockPitches
        .filter((p) => p.clanId === clan.id)
        .map((p) => ({
            ...p,
            hostName: 'Arjun R.',
            hostRating: 4.8,
        }));

    const clanMembers = mockUsers;
    const moderators = clanMembers.filter((u) => clan.moderators.includes(u.id));
    const regularMembers = clanMembers.filter((u) => !clan.moderators.includes(u.id));

    const topContributors = [...clanMembers]
        .sort((a, b) => b.reputation - a.reputation)
        .slice(0, 3);

    const tabs = [
        { id: 'pitches', label: `Active Pitches (${clanPitches.length})` },
        { id: 'members', label: 'Members' },
        { id: 'treasury', label: 'Clan Treasury' },
    ];

    return (
        <>
            <Navbar />
            <main className={styles.page}>
                {/* Cover Photo */}
                <div 
                    className={styles.coverPhoto}
                    style={clan.coverImage ? { background: `url(${clan.coverImage}) center/cover no-repeat` } : {}}
                >
                    <div className={styles.coverGradient} />
                    <button className={styles.backBtn} onClick={() => router.back()}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                    </button>
                </div>

                {/* Clan Header Card */}
                <div className={styles.headerCard}>
                    <div className={styles.headerTop}>
                        <div>
                            {clan.badge && <Badge variant="premium" size="md">{clan.badge}</Badge>}
                            <h1 className={styles.clanName}>{clan.name}</h1>
                            <div className={styles.meta}>
                                <span className={styles.metaItem}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--primary)' }}>group</span>
                                    {clan.memberCount} Members
                                </span>
                                <span className={styles.metaDot}>·</span>
                                <span className={styles.metaItem}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--primary)' }}>location_on</span>
                                    {clan.location}
                                </span>
                            </div>
                        </div>
                        <Link href={`/clans/${clan.id}/invite`} className={styles.inviteBtn}>
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>person_add</span>
                            Invite Members
                        </Link>
                    </div>
                    <p className={styles.description}>{clan.description}</p>
                </div>

                <div className={styles.container}>
                    {/* Tabs */}
                    <div className={styles.tabs}>
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'pitches' && (
                        <div className={styles.tabContent}>
                            <div className={styles.pitchGrid}>
                                {clanPitches.map((pitch) => (
                                    <PitchCard key={pitch.id} pitch={pitch} />
                                ))}
                            </div>

                            {/* Top Contributors */}
                            <div className={styles.contributorsSection}>
                                <h3 className={styles.sectionTitle}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--primary)' }}>verified</span>
                                    Top Contributors
                                </h3>
                                <div className={styles.contributors}>
                                    {topContributors.map((user) => (
                                        <div key={user.id} className={styles.contributorCard}>
                                            <Avatar name={user.name} size="lg" />
                                            <span className={styles.contributorName}>{user.name}</span>
                                            <Badge variant="reputation" size="sm">
                                                {user.reputation}/100 REPUTATION
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'members' && (
                        <div className={styles.tabContent}>
                            {/* Search */}
                            <div className={styles.memberSearch}>
                                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--on-surface-variant)' }}>search</span>
                                <input placeholder="Search members by name or role..." className={styles.memberSearchInput} />
                            </div>

                            {/* Moderators */}
                            <div className={styles.memberSection}>
                                <h4 className={styles.memberSectionTitle}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--primary)' }}>admin_panel_settings</span>
                                    Moderators
                                </h4>
                                <div className={styles.modCards}>
                                    {moderators.map((mod) => (
                                        <div key={mod.id} className={styles.modCard}>
                                            <div className={styles.modLeft}>
                                                <Avatar name={mod.name} size="lg" online />
                                                <div>
                                                    <span className={styles.modName}>{mod.name}</span>
                                                    <Badge variant="primary" size="sm">Founding Member</Badge>
                                                </div>
                                            </div>
                                            <div className={styles.modRight}>
                                                <span className={styles.modReputationScore}>{mod.reputation}/100</span>
                                                <span className={styles.modReputationLabel}>Reputation</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Top Contributors */}
                            <div className={styles.memberSection}>
                                <h4 className={styles.memberSectionTitle}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--primary)' }}>stars</span>
                                    Top Contributors
                                </h4>
                                <div className={styles.modCards}>
                                    {topContributors.map((user) => (
                                        <div key={user.id} className={styles.modCard}>
                                            <div className={styles.modLeft}>
                                                <Avatar name={user.name} size="lg" />
                                                <div>
                                                    <span className={styles.modName}>{user.name}</span>
                                                    <span className={styles.memberDate}>Joined Jan 2023</span>
                                                </div>
                                            </div>
                                            <div className={styles.modRight}>
                                                <span className={styles.modReputationScore}>{user.reputation}/100</span>
                                                <span className={styles.modReputationLabel}>Reputation</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* All Members */}
                            <div className={styles.memberSection}>
                                <h4 className={styles.memberSectionTitle}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--primary)' }}>list</span>
                                    All Members
                                </h4>
                                {regularMembers.map((member) => (
                                    <div key={member.id} className={styles.memberRow}>
                                        <Avatar name={member.name} size="md" />
                                        <div className={styles.memberInfo}>
                                            <span className={styles.memberName}>{member.name}</span>
                                            <span className={styles.memberDate}>Joined {member.createdAt}</span>
                                        </div>
                                        <Badge variant="reputation" size="sm">{member.reputation}/100</Badge>
                                        <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--on-surface-muted)' }}>chevron_right</span>
                                    </div>
                                ))}
                                <button className={styles.viewAllBtn}>View All {clan.memberCount} Members</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'treasury' && (
                        <div className={styles.comingSoon}>
                            <span className={styles.comingSoonIcon}>🏦</span>
                            <h3>Clan Treasury</h3>
                            <p>Coming soon — track total savings and successful pitches for your community.</p>
                        </div>
                    )}

                    {/* FAB */}
                    <Link href="/pitches/create" className={styles.fab}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </Link>
                </div>
            </main>
            <BottomNav />
        </>
    );
}
