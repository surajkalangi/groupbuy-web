'use client';
import Link from 'next/link';
import styles from './page.module.css';

export default function AccountDeletedPage() {
    return (
        <main className={styles.page}>
            <header className={styles.header}>
                <Link href="/" className={styles.logo}>GroupBuy</Link>
                <Link href="#" className={styles.supportLink}>Support</Link>
            </header>
            <div className={styles.container}>
                <div className={styles.icon}><span className="material-symbols-outlined" style={{ fontSize: '3rem' }}>delete_forever</span></div>
                <h1 className={styles.title}>Account Permanently Deleted</h1>
                <p className={styles.desc}>We&apos;re sorry to see you go. Your profile, reputation score, history, and all account data have been erased forever as requested.</p>
                <p className={styles.farewell}>Thank you for being part of the GroupBuy community.</p>
                <Link href="/" className={styles.homeBtn}>Return to Landing Page →</Link>
            </div>
        </main>
    );
}
