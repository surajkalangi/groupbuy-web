import Link from 'next/link';
import styles from '../legal.module.css';

export default function PrivacyPage() {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <Link href="/" className={styles.logo}>GroupBuy</Link>
                <Link href="/" className={styles.navLink}>Back to Home</Link>
            </header>
            <main className={styles.mainContent}>
                <h1 className={styles.pageTitle}>Privacy Policy</h1>
                <span className={styles.lastUpdated}>Last Updated: June 2026</span>
                
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>1. Data We Collect</h2>
                    <p className={styles.text}>
                        GroupBuy is built on trust and local community. To facilitate hyperlocal group buying, we collect:
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.listItem}><strong>Identity & Contact:</strong> Name, phone number, and email address for account creation and delivery updates.</li>
                        <li className={styles.listItem}><strong>Location Data:</strong> Apartment complex, building name, or office address to accurately place you in the correct Clan.</li>
                        <li className={styles.listItem}><strong>Transaction Data:</strong> Order history and UPI mandate statuses (note: we do not store sensitive UPI PINs or bank credentials, which are handled by our secure payment partners).</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>2. How We Use Your Data</h2>
                    <p className={styles.text}>
                        Your data is used strictly to provide the GroupBuy service: coordinating bulk orders, notifying you when a Pitch is successful, and informing you when your order is ready for pickup at your community hub.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>3. Sharing with Clan Leads & Partners</h2>
                    <p className={styles.text}>
                        To facilitate local distribution, your name and order details (but not financial information) may be visible to your Clan Lead. We also share aggregated, anonymized order quantities with our artisan and wholesale partners.
                    </p>
                </section>
            </main>
            <footer className={styles.footer}>
                © 2026 GroupBuy. Editorial Hyperlocalism.
            </footer>
        </div>
    );
}
