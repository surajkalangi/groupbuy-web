'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { mockClans } from '@/data/clans';
import ClanDetail from '../page';
import styles from './page.module.css';

export default function WelcomeToClanPage({ params }) {
    const { clanId } = use(params);
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const clan = mockClans.find(c => c.id === clanId) || mockClans[0];

    // Animate modal in on mount
    useEffect(() => {
        const timer = setTimeout(() => setShowModal(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleExplore = () => {
        setShowModal(false);
        setTimeout(() => {
            router.push(`/clans/${clanId}`);
        }, 400); // Wait for the fade-out animation to complete
    };

    // Mock user name
    const userName = 'Arpan';

    return (
        <>
            {/* The background (Clan details) */}
            <ClanDetail params={params} />

            {/* Modal Wrapper */}
            <div className={styles.modalWrapper}>
                {/* Backdrop overlay */}
                <div className={`${styles.backdrop} ${showModal ? styles.backdropVisible : ''}`} />

                {/* Welcome Modal */}
                <div className={`${styles.modal} ${showModal ? styles.modalVisible : ''}`}>
                    {/* Decorative gradient top */}
                    <div className={styles.modalGradient} />

                    <div className={styles.modalContent}>
                        {/* Celebration Icon */}
                        <div className={styles.celebrationIcon}>
                            <span
                                className="material-symbols-outlined"
                                style={{ fontSize: '2.5rem', fontVariationSettings: "'FILL' 1" }}
                            >
                                celebration
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className={styles.heading}>
                            Welcome to the {clan.name} Clan, {userName}!
                        </h1>
                        <p className={styles.subtext}>
                            You're now part of <span className={styles.neighborCount}>{clan.memberCount} neighbors</span> saving together.
                            Ready to find your first neighborhood deal?
                        </p>

                        {/* Getting Started Guide */}
                        <div className={styles.guideList}>
                            <div className={styles.guideItem}>
                                <div className={styles.guideIcon}>
                                    <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>shopping_basket</span>
                                </div>
                                <div>
                                    <h3 className={styles.guideTitle}>Browse Pitches</h3>
                                    <p className={styles.guideText}>Check out the 'Fresh Harvest' and 'Health' deals below.</p>
                                </div>
                            </div>
                            <div className={styles.guideItem}>
                                <div className={styles.guideIcon}>
                                    <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>verified_user</span>
                                </div>
                                <div>
                                    <h3 className={styles.guideTitle}>Verify Identity</h3>
                                    <p className={styles.guideText}>Complete your profile to build trust with your clan.</p>
                                </div>
                            </div>
                            <div className={styles.guideItem}>
                                <div className={styles.guideIcon}>
                                    <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>forum</span>
                                </div>
                                <div>
                                    <h3 className={styles.guideTitle}>Say Hello</h3>
                                    <p className={styles.guideText}>Introduce yourself in the Clan Chat and share your needs.</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <button className={styles.cta} onClick={handleExplore} id="explore-clan-btn">
                            Explore My Clan
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
