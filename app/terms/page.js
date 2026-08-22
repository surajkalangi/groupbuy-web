import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import styles from '../legal.module.css';

export default function TermsPage() {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <Logo size="md" href="/" />
                <Link href="/" className={styles.navLink}>Back to Home</Link>
            </header>
            <main className={styles.mainContent}>
                <h1 className={styles.pageTitle}>Terms of Service</h1>
                <span className={styles.lastUpdated}>Last Updated: June 2026</span>
                
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>1. Welcome to LetsStack</h2>
                    <p className={styles.text}>
                        These Terms of Service ("Terms") govern your use of the LetsStack platform, a community-driven group-buying service. By accessing or using our platform, you agree to be bound by these Terms and our Privacy Policy.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>2. How LetsStack Works</h2>
                    <p className={styles.text}>
                        LetsStack allows users within verified communities (Clans) to pool their orders for wholesale goods, groceries, and artisan products.
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.listItem}><strong>Pools:</strong> Deals are listed as "Pools." A Pool only becomes an active order if the community meets the minimum order quantity (MOQ) before the deadline.</li>
                        <li className={styles.listItem}><strong>UPI Escrow:</strong> We use UPI mandate features to block funds. If a Pool fails to reach its MOQ, the mandate is automatically cancelled and your funds are released.</li>
                        <li className={styles.listItem}><strong>Local Pickup:</strong> Products are delivered to a designated local hub (e.g., your apartment clubhouse) for community pickup. We do not provide door-to-door delivery.</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>3. User Accounts and Clans</h2>
                    <p className={styles.text}>
                        To participate in a Pool, you must create an account and join a verified Clan based on your residential or professional location. Clan membership may require verification by a Clan Lead.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>4. Refunds and Returns</h2>
                    <p className={styles.text}>
                        Because products are sourced in exact bulk quantities based on collective commitment, we generally do not accept returns for change of mind. If an item is defective or significantly not as described upon pickup, please report it to your Clan Lead within 12 hours of delivery for a resolution or refund.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>5. Host and Seller Responsibilities & Liability</h2>
                    <p className={styles.text}>
                        LetsStack facilitates collective purchases between community members (Participants), community organizers (Hosts), and third-party vendors or service providers (Sellers).
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.listItem}><strong>Seller Liability:</strong> The Seller is solely responsible for fulfilling the delivery of products or services in proper, merchantable condition and within the agreed timeframe. In the event of neglect, failure to deliver, or delivery of damaged/defective products, the Seller shall be held legally and financially liable.</li>
                        <li className={styles.listItem}><strong>Host Protection:</strong> The Host acts strictly as a community facilitator and aggregator. The Host assumes no legal, financial, or operational liability for the quality, safety, legality, or timely delivery of the products or services provided by the Seller. Participants agree to hold the Host harmless against any claims arising from the Seller's failure to perform their duties.</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>6. Limitation of Liability and Platform Indemnification</h2>
                    <p className={styles.text}>
                        LetsStack operates solely as a technological intermediary connecting Hosts, Participants, and Sellers. We do not manufacture, store, inspect, or deliver any products or services.
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.listItem}><strong>Platform Protection:</strong> To the maximum extent permitted by applicable law, LetsStack (and its affiliates, directors, employees, and agents) shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages, or any loss of profits, arising out of disputes between Participants, Hosts, and Sellers.</li>
                        <li className={styles.listItem}><strong>Indemnification:</strong> You agree to indemnify and hold LetsStack harmless from any legal claims, disputes, demands, or liabilities arising from your use of the platform, your interactions with other users or sellers, or any breach of these Terms.</li>
                        <li className={styles.listItem}><strong>No Endorsement:</strong> The listing of a Pool or a Seller on the platform does not constitute an endorsement or guarantee by LetsStack regarding the quality, safety, or legality of the offerings.</li>
                    </ul>
                </section>
                
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>7. Changes to Terms</h2>
                    <p className={styles.text}>
                        LetsStack reserves the right to modify or replace these Terms at any time. We may apply these changes retrospectively to address new legal, regulatory, or operational requirements. By continuing to access or use our platform after any revisions become effective, you agree to be bound by the revised Terms, including their retrospective application.
                    </p>
                </section>
            </main>
            <footer className={styles.footer}>
                © 2026 LetsStack. Community Commerce.
            </footer>
        </div>
    );
}
