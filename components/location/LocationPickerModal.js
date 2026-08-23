'use client';

import { useState, useMemo } from 'react';
import { useLocation, CITY_HUBS, POPULAR_CITIES } from '@/context/LocationContext';
import styles from './LocationPickerModal.module.css';

export default function LocationPickerModal() {
    const {
        isModalOpen,
        closeLocationModal,
        userLocation,
        setUserLocation,
        detectGpsLocation,
        isDetecting,
        detectError,
    } = useLocation();

    const [searchQuery, setSearchQuery] = useState('');
    
    // Default to user's current city or 'Hyderabad'
    const [selectedCityName, setSelectedCityName] = useState(() => {
        return userLocation?.city || 'Hyderabad';
    });

    // Localities for the selected city
    const cityLocalities = useMemo(() => {
        return CITY_HUBS.filter(h => h.city.toLowerCase() === selectedCityName.toLowerCase());
    }, [selectedCityName]);

    // Search results across ALL cities and localities
    const searchResults = useMemo(() => {
        if (!searchQuery.trim()) return [];
        const q = searchQuery.toLowerCase().trim();
        return CITY_HUBS.filter(h => {
            const matchName = h.name.toLowerCase().includes(q);
            const matchCity = h.city.toLowerCase().includes(q);
            const matchState = h.state?.toLowerCase().includes(q);
            return matchName || matchCity || matchState;
        });
    }, [searchQuery]);

    if (!isModalOpen) return null;

    const handleSelectHub = (hub) => {
        setUserLocation(hub);
        setSearchQuery('');
        closeLocationModal();
    };

    const isSearching = searchQuery.trim().length > 0;

    return (
        <div className={styles.overlay} onClick={closeLocationModal}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.titleGroup}>
                        <h2 className={styles.title}>Set Your Location</h2>
                        <p className={styles.subtitle}>Find nearby community pools and pickup points</p>
                    </div>
                    <button className={styles.closeBtn} onClick={closeLocationModal} aria-label="Close modal">
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>close</span>
                    </button>
                </div>

                <div className={styles.body}>
                    {/* Search Bar */}
                    <div className={styles.searchBox}>
                        <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
                        <input
                            type="text"
                            placeholder="Search locality, area, or society (e.g. Hitec City)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={styles.searchInput}
                            autoFocus
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                className={styles.searchClear}
                                onClick={() => setSearchQuery('')}
                                aria-label="Clear search"
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>cancel</span>
                            </button>
                        )}
                    </div>

                    {/* GPS Auto-Detect Button */}
                    <div className={styles.gpsCard} onClick={detectGpsLocation} role="button" tabIndex={0}>
                        <div className={styles.gpsLeft}>
                            <div className={styles.gpsIconWrap}>
                                <span className={`material-symbols-outlined ${isDetecting ? styles.gpsIconSpin : ''}`}>
                                    {isDetecting ? 'sync' : 'my_location'}
                                </span>
                            </div>
                            <div>
                                <h3 className={styles.gpsHeading}>
                                    {isDetecting ? 'Detecting Your Location...' : 'Use Current Device Location'}
                                </h3>
                                <p className={styles.gpsText}>
                                    {isDetecting ? 'Fetching GPS coordinates via browser' : 'Auto-detect nearest neighborhood hub via GPS'}
                                </p>
                            </div>
                        </div>
                        <span className={`material-symbols-outlined ${styles.gpsArrow}`}>chevron_right</span>
                    </div>

                    {detectError && (
                        <div className={styles.errorBanner}>
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>error</span>
                            <span>{detectError}</span>
                        </div>
                    )}

                    {/* Search Results Mode */}
                    {isSearching ? (
                        <div>
                            <h4 className={styles.sectionTitle}>
                                SEARCH RESULTS ({searchResults.length})
                            </h4>
                            <div className={styles.searchList}>
                                {searchResults.map(hub => {
                                    const isCurrent = userLocation?.id === hub.id || (userLocation?.lat === hub.lat && userLocation?.lng === hub.lng);
                                    return (
                                        <div
                                            key={hub.id}
                                            className={`${styles.searchItem} ${isCurrent ? styles.searchItemActive : ''}`}
                                            onClick={() => handleSelectHub(hub)}
                                            role="button"
                                            tabIndex={0}
                                        >
                                            <div className={styles.searchItemLeft}>
                                                <span className={`material-symbols-outlined ${styles.searchPin}`}>location_on</span>
                                                <div>
                                                    <span className={styles.searchLocalityName}>{hub.name}</span>
                                                    <span className={styles.searchCityName}>{hub.city}, {hub.state}</span>
                                                </div>
                                            </div>
                                            {isCurrent && (
                                                <span className={`material-symbols-outlined ${styles.activeCheck}`}>check_circle</span>
                                            )}
                                        </div>
                                    );
                                })}

                                {searchResults.length === 0 && (
                                    <div className={styles.emptyMsg}>
                                        <p>No localities found matching &quot;{searchQuery}&quot;</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        /* Default City + Locality Pills Mode (District by Zomato UX) */
                        <>
                            {/* Popular Cities */}
                            <div>
                                <h4 className={styles.sectionTitle}>POPULAR CITIES</h4>
                                <div className={styles.citiesGrid}>
                                    {POPULAR_CITIES.map(city => {
                                        const isSelected = selectedCityName.toLowerCase() === city.name.toLowerCase();
                                        return (
                                            <button
                                                key={city.id}
                                                type="button"
                                                className={`${styles.cityBtn} ${isSelected ? styles.cityBtnActive : ''}`}
                                                onClick={() => setSelectedCityName(city.name)}
                                            >
                                                <span className={`material-symbols-outlined ${styles.cityIcon}`}>
                                                    {city.icon}
                                                </span>
                                                <span>{city.name}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Localities for Selected City (Pills in 3-4 per row grid) */}
                            <div>
                                <h4 className={styles.sectionTitle}>
                                    POPULAR LOCALITIES IN {selectedCityName.toUpperCase()}
                                </h4>
                                <div className={styles.localitiesPillGrid}>
                                    {cityLocalities.map(hub => {
                                        const isCurrent = userLocation?.id === hub.id || (userLocation?.lat === hub.lat && userLocation?.lng === hub.lng);
                                        return (
                                            <button
                                                key={hub.id}
                                                type="button"
                                                className={`${styles.localityPill} ${isCurrent ? styles.localityPillActive : ''}`}
                                                onClick={() => handleSelectHub(hub)}
                                                title={`${hub.name} (${hub.city})`}
                                            >
                                                {hub.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
