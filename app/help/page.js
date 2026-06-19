'use client';
import Link from 'next/link';
import styles from './page.module.css';

export default function HelpCenterPage() {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <Link href="/" className={styles.logo}>GroupBuy</Link>
                <Link href="/support" className={styles.navLink}>Contact Support</Link>
            </header>

            <main className={styles.mainContent}>
                {/* Hero */}
                <div className={styles.hero}>
                    <h1 className={styles.title}>Help Center</h1>
                    <div className={styles.searchBar}>
                        <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
                        <input 
                            type="text" 
                            className={styles.searchInput} 
                            placeholder="Search for answers..."
                        />
                    </div>
                </div>

                {/* Topics Grid */}
                <section className={styles.topicsSection}>
                    <h2 className={styles.sectionTitle}>Browse Topics</h2>
                    <div className={styles.topicsGrid}>
                        <Link href="#" className={styles.topicCard}>
                            <div className={styles.topicIcon}>
                                <span className="material-symbols-outlined">rocket_launch</span>
                            </div>
                            <h3 className={styles.topicTitle}>Getting Started</h3>
                            <p className={styles.topicDesc}>Learn how to join a clan, browse local pitches, and make your first group purchase.</p>
                        </Link>
                        
                        <Link href="#" className={styles.topicCard}>
                            <div className={styles.topicIcon}>
                                <span className="material-symbols-outlined">local_shipping</span>
                            </div>
                            <h3 className={styles.topicTitle}>Orders & Pickups</h3>
                            <p className={styles.topicDesc}>Everything you need to know about delivery windows, pickup locations, and missing items.</p>
                        </Link>

                        <Link href="#" className={styles.topicCard}>
                            <div className={styles.topicIcon}>
                                <span className="material-symbols-outlined">storefront</span>
                            </div>
                            <h3 className={styles.topicTitle}>For Clan Leads</h3>
                            <p className={styles.topicDesc}>Resources for hosting pitches, managing payouts, and coordinating with your community.</p>
                        </Link>

                        <Link href="#" className={styles.topicCard}>
                            <div className={styles.topicIcon}>
                                <span className="material-symbols-outlined">security</span>
                            </div>
                            <h3 className={styles.topicTitle}>Trust & Safety</h3>
                            <p className={styles.topicDesc}>Information on our reputation system, community verification, and community guidelines.</p>
                        </Link>
                    </div>
                </section>

                {/* FAQs */}
                <section className={styles.faqSection}>
                    <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
                    <div className={styles.faqItem}>
                        <h4 className={styles.faqQuestion}>What happens if a pitch doesn't reach its goal?</h4>
                        <p className={styles.faqAnswer}>If a pitch expires before reaching its minimum order quantity (MOQ), the group buy is canceled, and all participants are fully refunded automatically within 3-5 business days. No one is charged if the community goal isn't met.</p>
                    </div>
                    <div className={styles.faqItem}>
                        <h4 className={styles.faqQuestion}>How do I pick up my order?</h4>
                        <p className={styles.faqAnswer}>Orders are delivered in bulk to your Clan Lead. Once the delivery arrives, you will receive a notification with a pickup window and instructions to collect your items from the Clan Lead's designated location.</p>
                    </div>
                    <div className={styles.faqItem}>
                        <h4 className={styles.faqQuestion}>Can I return an item?</h4>
                        <p className={styles.faqAnswer}>Because items are sourced directly from farmers and artisans at wholesale prices, standard returns for buyer's remorse are not accepted. However, if an item is damaged or fundamentally incorrect, you can report it via the app within 24 hours for a resolution.</p>
                    </div>
                </section>

                {/* Contact Banner */}
                <div className={styles.contactBanner}>
                    <h2>Still need help?</h2>
                    <p>If you can't find the answer you're looking for, our support team is ready to assist you.</p>
                    <Link href="/support" className={styles.contactBtn}>
                        Contact Support
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                </div>
            </main>

            <footer className={styles.footer}>
                © 2026 GroupBuy. Community Commerce.
            </footer>
        </div>
    );
}
