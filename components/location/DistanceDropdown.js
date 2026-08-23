'use client';

import { useLocation } from '@/context/LocationContext';
import styles from './DistanceDropdown.module.css';

const OPTIONS = [
    { value: 'all', label: 'Distance: All Deals', icon: 'near_me' },
    { value: 5, label: 'Within 5 km', icon: 'near_me' },
    { value: 15, label: 'Within 15 km', icon: 'near_me' },
    { value: 30, label: 'Within 30 km (City)', icon: 'near_me' },
    { value: 'remote', label: 'Pan-India / Remote', icon: 'flight_takeoff' },
];

export default function DistanceDropdown({ className = '' }) {
    const { proximityRadius, setProximityRadius } = useLocation();

    const isFiltered = proximityRadius !== 'all';
    const activeOption = OPTIONS.find(o => o.value === proximityRadius) || OPTIONS[0];

    return (
        <div className={`${styles.dropdownWrapper} ${isFiltered ? styles.dropdownWrapperActive : ''} ${className}`}>
            <span className={`material-symbols-outlined ${styles.icon}`}>
                {proximityRadius === 'remote' ? 'flight_takeoff' : 'near_me'}
            </span>
            <span className={styles.label}>{activeOption.label}</span>
            <span className={`material-symbols-outlined ${styles.arrow}`}>expand_more</span>
            
            <select
                className={styles.nativeSelect}
                value={proximityRadius}
                onChange={(e) => {
                    const val = e.target.value;
                    setProximityRadius(val === 'all' || val === 'remote' ? val : Number(val));
                }}
                aria-label="Filter deals by distance"
            >
                {OPTIONS.map(opt => (
                    <option key={String(opt.value)} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
