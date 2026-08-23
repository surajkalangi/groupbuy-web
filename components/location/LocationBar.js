'use client';

import { useLocation } from '@/context/LocationContext';
import styles from './LocationBar.module.css';

export default function LocationBar({ matchCount = null }) {
    const {
        userLocation,
        proximityRadius,
        setProximityRadius,
        openLocationModal,
    } = useLocation();

    const isFiltered = proximityRadius !== 'all';

    return (
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

            {/* Right: Proximity Dropdown */}
            <div className={styles.rightGroup}>
                <div className={styles.selectWrapper}>
                    <span className={`material-symbols-outlined ${styles.selectIcon}`}>
                        {proximityRadius === 'remote' ? 'flight_takeoff' : 'tune'}
                    </span>
                    <select
                        className={styles.radiusSelect}
                        value={proximityRadius}
                        onChange={(e) => {
                            const val = e.target.value;
                            setProximityRadius(val === 'all' || val === 'remote' ? val : Number(val));
                        }}
                        aria-label="Filter pools by proximity distance"
                    >
                        <option value="all">Distance: All Deals</option>
                        <option value={5}>Within 5 km</option>
                        <option value={15}>Within 15 km</option>
                        <option value={30}>Within 30 km (City)</option>
                        <option value="remote">Pan-India / Remote</option>
                    </select>
                    <span className={`material-symbols-outlined ${styles.selectArrow}`}>expand_more</span>
                </div>

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
    );
}
