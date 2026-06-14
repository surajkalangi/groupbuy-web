'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function MobileSignIn() {
    const router = useRouter();
    const [phone, setPhone] = useState('');

    const handleSendOTP = (e) => {
        e.preventDefault();
        if (phone.length === 10) {
            router.push(`/auth/otp?phone=${phone}`);
        }
    };

    return (
        <main className={styles.page}>
            {/* Decorative Background Elements */}
            <div className={styles.blobTopRight} />
            <div className={styles.blobBottomLeft} />

            <div className={styles.container}>
                {/* Branding Header */}
                <div className={styles.header}>
                    <div className={styles.iconContainer}>
                        <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: 'var(--primary)' }}>groups</span>
                    </div>
                    <h1 className={styles.title}>Sign in to GroupBuy</h1>
                    <p className={styles.subtitle}>Enter your phone number to continue</p>
                </div>

                {/* Focus Container */}
                <div className={styles.card}>
                    <form className={styles.form} onSubmit={handleSendOTP}>
                        {/* Phone Input Group */}
                        <div className={styles.inputGroup}>
                            <label htmlFor="phone" className={styles.label}>
                                Mobile Number
                            </label>
                            <div className={styles.phoneInputWrapper}>
                                {/* Country Picker */}
                                <div className={styles.countryPicker}>
                                    <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '1.25rem' }}>public</span>
                                    <span className={styles.countryCode}>+91</span>
                                    <span className="material-symbols-outlined" style={{ color: 'var(--outline-variant)', fontSize: '1.25rem' }}>keyboard_arrow_down</span>
                                </div>
                                {/* Phone Field */}
                                <div className={styles.fieldWrapper}>
                                    <input
                                        id="phone"
                                        type="tel"
                                        placeholder="98765 43210"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                        className={styles.phoneInput}
                                        autoFocus
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Button */}
                        <button
                            type="submit"
                            className={styles.submitBtn}
                            disabled={phone.length !== 10}
                        >
                            Get OTP
                            <span className="material-symbols-outlined" style={{ fontSize: '1.5rem' }}>arrow_right_alt</span>
                        </button>
                    </form>

                    {/* Footer Links */}
                    <div className={styles.footerLinks}>
                        <p className={styles.termsText}>
                            By signing in, you agree to our{' '}
                            <a href="#" className={styles.link}>Terms of Service</a>{' '}
                            and{' '}
                            <a href="#" className={styles.link}>Privacy Policy</a>
                        </p>
                        
                        <div className={styles.trustBadges}>
                            <div className={styles.trustBadge}>
                                <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>verified_user</span>
                                <span>Secure Login</span>
                            </div>
                            <div className={styles.trustBadge}>
                                <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>lock</span>
                                <span>Encrypted</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Help/Support */}
                <div className={styles.supportLink}>
                    <a href="#" className={styles.helpLink}>
                        <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>contact_support</span>
                        <span>Need help signing in?</span>
                    </a>
                </div>
            </div>
        </main>
    );
}
