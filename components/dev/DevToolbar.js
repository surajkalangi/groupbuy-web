'use client';

import { useAuth } from '@/context/AuthContext';
import styles from './DevToolbar.module.css';

/**
 * Floating dev toolbar for toggling auth state.
 * Only visible in development. Renders in bottom-left corner.
 */
export default function DevToolbar() {
    const { authState, setMockState, AUTH_STATES, isHydrated } = useAuth();

    if (!isHydrated) return null;

    const states = [
        { key: AUTH_STATES.GUEST, label: '👤 Guest', color: '#d32f2f' },
        { key: AUTH_STATES.LOGGED_IN, label: '🔑 Logged In', color: '#ed6c02' },
        { key: AUTH_STATES.MEMBER, label: '🏘️ Member', color: '#2e7d32' },
    ];

    return (
        <div className={styles.toolbar} role="toolbar" aria-label="Dev auth state toggle">
            <span className={styles.label}>Auth:</span>
            {states.map(({ key, label, color }) => (
                <button
                    key={key}
                    className={`${styles.btn} ${authState === key ? styles.active : ''}`}
                    style={authState === key ? { background: color, color: '#fff' } : {}}
                    onClick={() => setMockState(key)}
                    title={`Switch to ${label} state`}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}
