'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import styles from './page.module.css';

export default function ProfileSetup() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        society: '',
        city: '',
    });

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const isValid = form.fullName.trim() && form.email.trim() && form.city.trim();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            router.push('/onboarding/join');
        }, 800);
    };

    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <div className={styles.backLink} onClick={() => router.back()}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </div>

                <div className={styles.header}>
                    <span className={styles.stepLabel}>Step 2 of 3</span>
                    <h1 className={styles.title}>Set up your profile</h1>
                    <p className={styles.subtitle}>
                        Tell us a bit about yourself so your community can recognize you.
                    </p>
                </div>

                {/* Avatar placeholder */}
                <div className={styles.avatarSection}>
                    <div className={styles.avatarCircle}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </div>
                    <button className={styles.uploadBtn}>Upload Photo</button>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <Input
                        label="Full Name"
                        placeholder="e.g., Aditya Sharma"
                        value={form.fullName}
                        onChange={handleChange('fullName')}
                        required
                        icon={
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        }
                    />

                    <Input
                        label="Email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={form.email}
                        onChange={handleChange('email')}
                        required
                        icon={
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                        }
                    />

                    <Input
                        label="Society / Office Name"
                        placeholder="e.g., Prestige Lakeside Towers"
                        value={form.society}
                        onChange={handleChange('society')}
                        helperText="Helps us connect you with nearby Clans"
                        icon={
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                        }
                    />

                    <Input
                        label="City"
                        placeholder="e.g., Bangalore"
                        value={form.city}
                        onChange={handleChange('city')}
                        required
                        icon={
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                        }
                    />

                    <div className={styles.ctaSection}>
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            fullWidth
                            disabled={!isValid}
                            loading={loading}
                        >
                            Complete Setup →
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
}
