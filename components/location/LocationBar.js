'use client';

import { useState } from 'react';
import { useLocation } from '@/context/LocationContext';
import DistanceSliderModal from './DistanceSliderModal';
import styles from './LocationBar.module.css';

export default function LocationBar({ matchCount = null }) {
    const {
        userLocation,
        proximityRadius,
        setProximityRadius,
        openLocationModal,
    } = useLocation();

    const [isDistanceModalOpen, setIsDistanceModalOpen] = useState(false);

    const isFiltered = proximityRadius !== 'all';

    let distanceLabel = 'Distance: All Deals';
    let distanceIcon = 'near_me';

    if (proximityRadius === 'remote') {
        distanceLabel = '🌐 Pan-India / Remote';
        distanceIcon = 'language';
    } else if (typeof proximityRadius === 'number') {
        distanceLabel = `Within ${proximityRadius} km`;
        distanceIcon = 'near_me';
    }

    return (
        <>
            <div className={styles.bar}>
                {/* Left: Location indicator pill */}
                <div className={styles.leftGroup}>
                    <button
                        type="button"
                        className={styles.locationPill}
                        onClick={openLocationModal}
                        title="Click to set your delivery / pickup location"
                    >
                        <span className={`material-symbols-outlined ${styles.pinIcon}`}>
                            {userLocation?.isGps ? 'my_location' : 'location_on'}
                        </span>
                        <span>{userLocation?.name || userLocation?.city || 'Set Location'}</span>
                        {userLocation?.isGps && <span className={styles.gpsTag}>GPS</span>}
                        <span className={`material-symbols-outlined ${styles.chevronIcon}`}>expand_more</span>
                    </button>

                    {isFiltered && matchCount !== null && (
                        <span className={styles.filteredBadge}>
                            {matchCount} {matchCount === 1 ? 'pool nearby' : 'pools nearby'}
                        </span>
                    )}
                </div>

                {/* Right: Distance Slider Filter Button */}
                <div className={styles.rightGroup}>
                    <button
                        type="button"
                        className={`${styles.selectWrapper} ${isFiltered ? styles.selectWrapperActive : ''}`}
                        onClick={() => setIsDistanceModalOpen(true)}
                        title="Adjust maximum distance radius"
                    >
                        <span className={`material-symbols-outlined ${styles.selectIcon}`}>
                            {distanceIcon}
                        </span>
                        <span className={styles.radiusSelectText}>{distanceLabel}</span>
                        <span className={`material-symbols-outlined ${styles.selectArrow}`}>tune</span>
                    </button>

                    {isFiltered && (
                        <button
                            type="button"
                            className={styles.clearBtn}
                            onClick={() => setProximityRadius('all')}
                            title="Reset distance filter to all deals"
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>close</span>
                            <span>Reset</span>
                        </button>
                    )}
                </div>
            </div>

            <DistanceSliderModal
                isOpen={isDistanceModalOpen}
                onClose={() => setIsDistanceModalOpen(false)}
            />
        </>
    );
}
