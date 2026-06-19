import Link from 'next/link';
import styles from '../legal.module.css';

export default function GuidelinesPage() {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <Link href="/" className={styles.logo}>GroupBuy</Link>
                <Link href="/" className={styles.navLink}>Back to Home</Link>
            </header>
            <main className={styles.mainContent}>
                <h1 className={styles.pageTitle}>Community Guidelines</h1>
                <span className={styles.lastUpdated}>Last Updated: June 2026</span>
                
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Built on Trust and Density</h2>
                    <p className={styles.text}>
                        GroupBuy is not a faceless e-commerce app; it is a digital commons for your trusted community. Our model relies heavily on the trust, cooperation, and collective strength of its members. To keep things running smoothly, we ask all members to adhere to these guidelines.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>1. Prompt Pickups</h2>
                    <p className={styles.text}>
                        When a Pitch is delivered to your Clan's hub (e.g., your society clubhouse), please pick up your items promptly. Since many products are fresh, organic produce, prompt pickup ensures quality and respects the Clan Leads who volunteer their time to coordinate distribution.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>2. Commitment is Binding</h2>
                    <p className={styles.text}>
                        Pitches only succeed when the community works together. If you back a Pitch, your commitment helps lower the price for everyone. Please ensure you actually want the item before committing funds via UPI mandate, as backing out affects the whole Clan's ability to reach the minimum order quantity.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>3. Respect the Clan Leads</h2>
                    <p className={styles.text}>
                        Clan Leads are community members stepping up to organize better living for everyone. Treat them with respect, patience, and kindness.
                    </p>
                </section>
            </main>
            <footer className={styles.footer}>
                © 2026 GroupBuy. Community Commerce.
            </footer>
        </div>
    );
}
