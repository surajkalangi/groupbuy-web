'use client';

import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import BottomNav from '@/components/layout/BottomNav';

export default function QRCodePage() {
    const router = useRouter();

    return (
        <div style={{ minHeight: '100vh', background: 'var(--surface)' }}>
            <Navbar />
            <main style={{ padding: 'calc(var(--nav-height) + 2rem) 1rem calc(var(--bottom-nav-height) + 2rem)', maxWidth: 'var(--max-width)', margin: '0 auto', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                    <button onClick={() => router.back()} style={{ background: 'transparent', border: 'none', color: 'var(--on-surface)', cursor: 'pointer' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>arrow_back</span>
                    </button>
                    <h1 style={{ flex: 1, fontSize: '1.25rem', fontFamily: 'var(--font-display)', fontWeight: 700 }}>Pickup QR Code</h1>
                    <div style={{ width: '24px' }} /> {/* spacer */}
                </div>

                <div style={{ background: 'white', padding: '2rem', borderRadius: '1.5rem', boxShadow: 'var(--shadow-sm)', display: 'inline-block', marginBottom: '2rem' }}>
                    {/* Simulated QR Code using CSS borders for demo since we have no image library */}
                    <div style={{ width: '200px', height: '200px', border: '8px solid black', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', padding: '8px' }}>
                        <div style={{ background: 'black' }} />
                        <div style={{ border: '4px solid black' }} />
                        <div style={{ border: '4px solid black' }} />
                        <div style={{ background: 'black' }} />
                    </div>
                </div>

                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Ready for Pickup</h2>
                <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.875rem', marginBottom: '2rem' }}>
                    Show this QR code to the host or scan it at the community collection hub.
                </p>

                <div style={{ background: 'var(--surface-container-low)', padding: '1.5rem', borderRadius: '1rem', textAlign: 'left' }}>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--on-surface-muted)', textTransform: 'uppercase', marginBottom: '1rem' }}>Order Details</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--on-surface-variant)' }}>Pitch</span>
                        <span style={{ fontWeight: 600 }}>Heritage Monsoon Mangoes</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--on-surface-variant)' }}>Quantity</span>
                        <span style={{ fontWeight: 600 }}>2 Boxes</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--on-surface-variant)' }}>Status</span>
                        <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Paid via UPI</span>
                    </div>
                </div>
            </main>
            <BottomNav />
        </div>
    );
}
