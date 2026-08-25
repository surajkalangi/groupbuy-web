'use client';

import { useState } from 'react';
import { useLocation } from '@/context/LocationContext';
import DistanceSliderModal from './DistanceSliderModal';
import styles from './DistanceDropdown.module.css';

export default function DistanceDropdown({ className = '' }) {
    const { proximityRadius, setProximityRadius } = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isFiltered = proximityRadius !== 'all';
    
    let displayLabel = 'Distance: All Deals';
    let iconName = 'near_me';

    if (proximityRadius === 'remote') {
        displayLabel = '🌐 Pan-India / Remote';
        iconName = 'language';
    } else if (typeof proximityRadius === 'number') {
        displayLabel = `Within ${proximityRadius} km`;
        iconName = 'near_me';
    }

    return (
        <>
            <div className={`${styles.filterContainer} ${className}`}>
                <button
                    type="button"
                    className={`${styles.dropdownWrapper} ${isFiltered ? styles.dropdownWrapperActive : ''}`}
                    onClick={() => setIsModalOpen(true)}
                    title="Adjust distance proximity radius"
                >
                    <span className={`material-symbols-outlined ${styles.icon}`}>
                        {iconName}
                    </span>
                    <span className={styles.label}>{displayLabel}</span>
                    <span className={`material-symbols-outlined ${styles.arrow}`}>tune</span>
                </button>

                {isFiltered && (
                    <button
                        type="button"
                        className={styles.quickResetBtn}
                        onClick={(e) => {
                            e.stopPropagation();
                            setProximityRadius('all');
                        }}
                        title="Reset distance to all deals"
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>close</span>
                    </button>
                )}
            </div>

            <DistanceSliderModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
