'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function SupportPage() {
    const [status, setStatus] = useState('idle'); // idle, submitting, success
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        topic: 'order_issue',
        message: ''
    });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('submitting');
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
        }, 1200);
    };

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <Link href="/" className={styles.logo}>GroupBuy</Link>
                <Link href="/" className={styles.navLink}>Back to Home</Link>
            </header>

            <main className={styles.mainContent}>
                <div className={styles.hero}>
                    <h1 className={styles.title}>How can we help?</h1>
                    <p className={styles.subtitle}>
                        Whether you have a question about an order, need help verifying your Clan, or just want to share feedback, we're here for you.
                    </p>
                </div>

                <div className={styles.contentGrid}>
                    {/* Support Form */}
                    {status === 'success' ? (
                        <div className={styles.successMessage}>
                            <div className={styles.successIcon}>
                                <span className="material-symbols-outlined" style={{ fontSize: '2rem', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                            </div>
                            <h2>Message Sent!</h2>
                            <p>Thanks for reaching out, {formData.name}. Our support team will get back to you within 24 hours.</p>
                            <button onClick={() => setStatus('idle')} className={styles.submitBtn} style={{ marginTop: '1rem', width: 'auto', padding: '0.75rem 2rem' }}>
                                Send Another Message
                            </button>
                        </div>
                    ) : (
                        <div className={styles.formCard}>
                            <h2 className={styles.formTitle}>Send us a message</h2>
                            <form onSubmit={handleSubmit}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="name" className={styles.label}>Your Name</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        name="name" 
                                        required 
                                        className={styles.input} 
                                        placeholder="Jane Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="email" className={styles.label}>Email Address</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        required 
                                        className={styles.input} 
                                        placeholder="jane@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="topic" className={styles.label}>What do you need help with?</label>
                                    <select 
                                        id="topic" 
                                        name="topic" 
                                        className={styles.select}
                                        value={formData.topic}
                                        onChange={handleChange}
                                    >
                                        <option value="order_issue">Order or Pickup Issue</option>
                                        <option value="clan_verification">Clan Verification</option>
                                        <option value="become_host">Becoming a Clan Lead</option>
                                        <option value="feedback">General Feedback</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="message" className={styles.label}>Message</label>
                                    <textarea 
                                        id="message" 
                                        name="message" 
                                        required 
                                        className={styles.textarea} 
                                        placeholder="Tell us what happened..."
                                        value={formData.message}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button type="submit" className={styles.submitBtn} disabled={status === 'submitting'}>
                                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
                                    {status !== 'submitting' && <span className="material-symbols-outlined">send</span>}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Sidebar Information */}
                    <div className={styles.infoSidebar}>
                        <div className={styles.infoCard}>
                            <div className={styles.infoIconWrap}>
                                <span className="material-symbols-outlined">forum</span>
                            </div>
                            <div>
                                <h3 className={styles.infoCardTitle}>Contact your Clan Lead first</h3>
                                <p className={styles.infoCardDesc}>For issues regarding missing items, delayed pickups, or local coordination, your Clan Lead is the fastest way to get help. You can message them directly from the pitch page.</p>
                            </div>
                        </div>

                        <Link href="/guidelines" className={styles.infoCard}>
                            <div className={styles.infoIconWrap} style={{ background: 'var(--secondary-container)' }}>
                                <span className="material-symbols-outlined" style={{ color: 'var(--on-secondary-container)' }}>menu_book</span>
                            </div>
                            <div>
                                <h3 className={styles.infoCardTitle}>Community Guidelines</h3>
                                <p className={styles.infoCardDesc}>Read our rules on trust, timely pickups, and treating your community with respect.</p>
                            </div>
                        </Link>

                        <div className={styles.infoCard}>
                            <div className={styles.infoIconWrap} style={{ background: 'var(--tertiary-container)' }}>
                                <span className="material-symbols-outlined" style={{ color: 'var(--on-tertiary-container)' }}>mail</span>
                            </div>
                            <div>
                                <h3 className={styles.infoCardTitle}>Email Us</h3>
                                <p className={styles.infoCardDesc}>Prefer direct email? You can reach our core support team at <strong>support@groupbuy.local</strong>.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className={styles.footer}>
                © 2026 GroupBuy. Community Commerce.
            </footer>
        </div>
    );
}
