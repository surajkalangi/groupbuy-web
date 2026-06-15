'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import GuestGuard from '@/components/auth/GuestGuard';
import styles from './page.module.css';


function OTPContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { login } = useAuth();
    const rawPhone = searchParams.get('phone') || '9876543892';
    const maskedPhone = `+91 ${rawPhone.slice(0, 2)}•••• ••${rawPhone.slice(-3)}`;
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(54);
    const [canResend, setCanResend] = useState(false);
    const inputRefs = useRef([]);

    useEffect(() => {
        if (timer > 0) {
            const t = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(t);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    const handleChange = (index, value) => {
        if (!/^\d?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleResend = () => {
        setTimer(60);
        setCanResend(false);
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
    };

    const formatTimer = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

    return (
        <div className={styles.page}>
            {/* Blobs */}
            <div className={styles.blobTopLeft} />
            <div className={styles.blobBottomRight} />

            <main className={styles.main}>
                <div className={styles.card}>
                    {/* Icon */}
                    <div className={styles.iconWrap}>
                        <span className="material-symbols-outlined" style={{ fontSize: '2rem', fontVariationSettings: "'FILL' 1", color: 'var(--primary)' }}>verified_user</span>
                    </div>

                    <h1 className={styles.heading}>Verify your phone number</h1>
                    <p className={styles.subtext}>
                        We've sent a 6-digit code to{' '}
                        <strong className={styles.phone}>{maskedPhone}</strong>.<br />
                        Enter it below to secure your community access.
                    </p>

                    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                        {/* OTP Inputs */}
                        <div className={styles.otpRow}>
                            {otp.map((digit, i) => (
                                <input
                                    key={i}
                                    ref={(el) => (inputRefs.current[i] = el)}
                                    className={`${styles.otpInput} ${digit ? styles.otpFilled : ''}`}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(i, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(i, e)}
                                    autoFocus={i === 0}
                                />
                            ))}
                        </div>

                        {/* Resend */}
                        <div className={styles.resendRow}>
                            {!canResend ? (
                                <div className={styles.timerBadge}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>schedule</span>
                                    <span>Resend OTP in {formatTimer(timer)}</span>
                                </div>
                            ) : null}
                            <button
                                type="button"
                                className={styles.resendBtn}
                                disabled={!canResend}
                                onClick={handleResend}
                            >
                                Resend Code
                            </button>
                        </div>

                        {/* CTA */}
                        <button 
                            type="button" 
                            className={styles.ctaBtn} 
                            onClick={() => {
                                login();
                                router.push('/auth/profile-setup');
                            }}
                        >
                            Verify Code
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                    </form>

                    <p className={styles.helpText}>
                        Having trouble? <a href="#" className={styles.helpLink}>Contact Support</a>
                    </p>
                </div>

                {/* Trust Badge */}
                <div className={styles.trustBadge}>
                    <div className={styles.trustItem}>
                        <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '1.25rem' }}>encrypted</span>
                        <span className={styles.trustLabel}>End-to-End Encrypted</span>
                    </div>
                    <div className={styles.trustDivider} />
                    <div className={styles.trustItem}>
                        <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '1.25rem' }}>gpp_good</span>
                        <span className={styles.trustLabel}>Verified Community</span>
                    </div>
                </div>
            </main>

            {/* Bottom gradient bar */}
            <div className={styles.bottomBar} />
        </div>
    );
}

export default function OTPVerificationPage() {
    return (
        <GuestGuard>
        <Suspense fallback={null}>
            <OTPContent />
        </Suspense>
        </GuestGuard>
    );
}

