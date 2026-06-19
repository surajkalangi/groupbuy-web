import Link from 'next/link';
import styles from '../legal.module.css';

export default function TermsPage() {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <Link href="/" className={styles.logo}>GroupBuy</Link>
                <Link href="/" className={styles.navLink}>Back to Home</Link>
            </header>
            <main className={styles.mainContent}>
                <h1 className={styles.pageTitle}>Terms of Service</h1>
                <span className={styles.lastUpdated}>Last Updated: June 2026</span>
                
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>1. Welcome to GroupBuy</h2>
                    <p className={styles.text}>
                        These Terms of Service ("Terms") govern your use of the GroupBuy platform, a community-driven group-buying service. By accessing or using our platform, you agree to be bound by these Terms and our Privacy Policy.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>2. How GroupBuy Works</h2>
                    <p className={styles.text}>
                        GroupBuy allows users within verified communities (Clans) to pool their orders for wholesale goods, groceries, and artisan products.
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.listItem}><strong>Pitches:</strong> Deals are listed as "Pitches." A Pitch only becomes an active order if the community meets the minimum order quantity (MOQ) before the deadline.</li>
                        <li className={styles.listItem}><strong>UPI Escrow:</strong> We use UPI mandate features to block funds. If a Pitch fails to reach its MOQ, the mandate is automatically cancelled and your funds are released.</li>
                        <li className={styles.listItem}><strong>Local Pickup:</strong> Products are delivered to a designated local hub (e.g., your apartment clubhouse) for community pickup. We do not provide door-to-door delivery.</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>3. User Accounts and Clans</h2>
                    <p className={styles.text}>
                        To participate in a Pitch, you must create an account and join a verified Clan based on your residential or professional location. Clan membership may require verification by a Clan Lead.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>4. Refunds and Returns</h2>
                    <p className={styles.text}>
                        Because products are sourced in exact bulk quantities based on collective commitment, we generally do not accept returns for change of mind. If an item is defective or significantly not as described upon pickup, please report it to your Clan Lead within 12 hours of delivery for a resolution or refund.
                    </p>
                </section>
            </main>
            <footer className={styles.footer}>
                © 2026 GroupBuy. Community Commerce.
            </footer>
        </div>
    );
}
