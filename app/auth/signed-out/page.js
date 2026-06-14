'use client';

import Link from 'next/link';
import styles from './page.module.css';

export default function SignedOutPage() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                {/* Brand Logo */}
                <div className={styles.logoWrap}>
                    <span className={styles.logoText}>GroupBuy</span>
                </div>

                {/* Confirmation Card */}
                <section className={styles.card}>
                    {/* Decorative Elements */}
                    <div className={styles.decoTopRight} />
                    <div className={styles.decoBottomLeft} />

                    {/* Content Area */}
                    <div className={styles.contentArea}>
                        <div className={styles.iconWrap}>
                            <span className="material-symbols-outlined" style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>logout</span>
                        </div>
                        
                        <h1 className={styles.heading}>
                            You have been signed out.
                        </h1>
                        
                        <p className={styles.subtext}>
                            Thank you for being a part of the <span className={styles.brandHighlight}>GroupBuy</span> community. We're looking forward to seeing you again for your next neighborhood deal!
                        </p>
                    </div>

                    {/* Contextual Illustration */}
                    <div className={styles.imageWrap}>
                        <img 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9rEkN6WER3ZhqQKog5mj-_jDnw8gZxBFOzqtjol0GEky8BSVpcmGJhVye15X8PHKKFKWwT_clW2NeDDWQ4XuwOFQz1w88fOU9zZeTwCo93iwm1h49MYr_-Kuzk73VpDai--830wvaqWk9GCOcw-Mc8Bb2MrVJ6bGdqII299YMJFlMvioZDrQwf7v2p-ve7YNFTk1xuHqtn02GeNrV3U1kKgzrYi-tEye0rRq64RjkIDTFJOUFLrBNvGFJ6PUmwiQrusikdY3Ow3is"
                            alt="Community illustration"
                            className={styles.editorialImg}
                        />
                    </div>

                    {/* Actions */}
                    <div className={styles.actions}>
                        <Link href="/auth/verify" className={styles.primaryBtn}>
                            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>login</span>
                            Sign In Again
                        </Link>
                        
                        <Link href="/" className={styles.secondaryBtn}>
                            Return to Landing Page
                            <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>arrow_forward</span>
                        </Link>
                    </div>
                </section>

                {/* Footer Trust Signals */}
                <footer className={styles.footer}>
                    <div className={styles.trustSignals}>
                        <div className={styles.trustItem}>
                            <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>verified_user</span>
                            <span className={styles.trustLabel}>Secure Logout</span>
                        </div>
                        <div className={styles.trustItem}>
                            <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>public</span>
                            <span className={styles.trustLabel}>Neighborhood First</span>
                        </div>
                    </div>
                    <p className={styles.copyright}>
                        © {new Date().getFullYear()} GroupBuy. Built for the community.
                    </p>
                </footer>
            </main>
        </div>
    );
}
