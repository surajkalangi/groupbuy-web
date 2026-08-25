'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { mockClans } from '@/data/clans';

export const POPULAR_CITIES = [
    { id: 'hyderabad', name: 'Hyderabad', icon: 'location_city' },
    { id: 'bengaluru', name: 'Bengaluru', icon: 'apartment' },
    { id: 'mumbai', name: 'Mumbai', icon: 'domain' },
    { id: 'delhi', name: 'Delhi NCR', icon: 'account_balance' },
    { id: 'kolkata', name: 'Kolkata', icon: 'tram' },
    { id: 'chandigarh', name: 'Chandigarh', icon: 'park' },
];

/**
 * Standard Indian City Hub Presets with accurate Coordinates
 */
export const CITY_HUBS = [
    // Hyderabad
    { id: 'hyd-hitec', name: 'Hitec City', city: 'Hyderabad', state: 'Telangana', lat: 17.4435, lng: 78.3772 },
    { id: 'hyd-gachibowli', name: 'Gachibowli', city: 'Hyderabad', state: 'Telangana', lat: 17.4401, lng: 78.3489 },
    { id: 'hyd-madhapur', name: 'Madhapur', city: 'Hyderabad', state: 'Telangana', lat: 17.4483, lng: 78.3915 },
    { id: 'hyd-jubilee', name: 'Jubilee Hills', city: 'Hyderabad', state: 'Telangana', lat: 17.4319, lng: 78.4073 },
    { id: 'hyd-tellapur', name: 'Tellapur', city: 'Hyderabad', state: 'Telangana', lat: 17.4812, lng: 78.2914 },
    { id: 'hyd-kondapur', name: 'Kondapur', city: 'Hyderabad', state: 'Telangana', lat: 17.4699, lng: 78.3578 },
    { id: 'hyd-banjara', name: 'Banjara Hills', city: 'Hyderabad', state: 'Telangana', lat: 17.4156, lng: 78.4354 },
    { id: 'hyd-kukatpally', name: 'Kukatpally', city: 'Hyderabad', state: 'Telangana', lat: 17.4947, lng: 78.3996 },
    { id: 'hyd-financial-district', name: 'Financial District', city: 'Hyderabad', state: 'Telangana', lat: 17.4190, lng: 78.3490 },
    { id: 'hyd-secunderabad', name: 'Secunderabad', city: 'Hyderabad', state: 'Telangana', lat: 17.4399, lng: 78.4983 },

    // Bengaluru
    { id: 'blr-whitefield', name: 'Whitefield', city: 'Bengaluru', state: 'Karnataka', lat: 12.9698, lng: 77.7499 },
    { id: 'blr-hsr', name: 'HSR Layout', city: 'Bengaluru', state: 'Karnataka', lat: 12.9121, lng: 77.6446 },
    { id: 'blr-indiranagar', name: 'Indiranagar', city: 'Bengaluru', state: 'Karnataka', lat: 12.9784, lng: 77.6408 },
    { id: 'blr-koramangala', name: 'Koramangala', city: 'Bengaluru', state: 'Karnataka', lat: 12.9352, lng: 77.6245 },
    { id: 'blr-bellandur', name: 'Bellandur (ORR)', city: 'Bengaluru', state: 'Karnataka', lat: 12.9304, lng: 77.6784 },
    { id: 'blr-electronic-city', name: 'Electronic City', city: 'Bengaluru', state: 'Karnataka', lat: 12.8452, lng: 77.6602 },
    { id: 'blr-jp-nagar', name: 'JP Nagar', city: 'Bengaluru', state: 'Karnataka', lat: 12.9063, lng: 77.5857 },
    { id: 'blr-hebbal', name: 'Hebbal', city: 'Bengaluru', state: 'Karnataka', lat: 13.0358, lng: 77.5970 },

    // Mumbai
    { id: 'mum-bkc', name: 'Bandra Kurla Complex (BKC)', city: 'Mumbai', state: 'Maharashtra', lat: 19.0664, lng: 72.8687 },
    { id: 'mum-powai', name: 'Powai (Hiranandani)', city: 'Mumbai', state: 'Maharashtra', lat: 19.1176, lng: 72.9060 },
    { id: 'mum-andheri', name: 'Andheri West', city: 'Mumbai', state: 'Maharashtra', lat: 19.1363, lng: 72.8277 },
    { id: 'mum-lower-parel', name: 'Lower Parel', city: 'Mumbai', state: 'Maharashtra', lat: 19.0016, lng: 72.8302 },
    { id: 'mum-thane', name: 'Thane West', city: 'Mumbai', state: 'Maharashtra', lat: 19.2183, lng: 72.9781 },
    { id: 'mum-vashi', name: 'Navi Mumbai (Vashi)', city: 'Mumbai', state: 'Maharashtra', lat: 19.0771, lng: 72.9986 },

    // Delhi NCR
    { id: 'del-connaught', name: 'Connaught Place', city: 'Delhi NCR', state: 'Delhi', lat: 28.6304, lng: 77.2177 },
    { id: 'del-cyber-city', name: 'Cyber City (Gurugram)', city: 'Delhi NCR', state: 'Haryana', lat: 28.4952, lng: 77.0895 },
    { id: 'del-noida-62', name: 'Sector 62 (Noida)', city: 'Delhi NCR', state: 'Uttar Pradesh', lat: 28.6258, lng: 77.3653 },
    { id: 'del-saket', name: 'Saket (South Delhi)', city: 'Delhi NCR', state: 'Delhi', lat: 28.5244, lng: 77.2173 },
    { id: 'del-dwarka', name: 'Dwarka', city: 'Delhi NCR', state: 'Delhi', lat: 28.5921, lng: 77.0460 },
    { id: 'del-hauz-khas', name: 'Hauz Khas', city: 'Delhi NCR', state: 'Delhi', lat: 28.5494, lng: 77.2001 },

    // Kolkata
    { id: 'kol-salt-lake', name: 'Salt Lake (Sector V)', city: 'Kolkata', state: 'West Bengal', lat: 22.5867, lng: 88.4178 },
    { id: 'kol-park-street', name: 'Park Street', city: 'Kolkata', state: 'West Bengal', lat: 22.5516, lng: 88.3524 },
    { id: 'kol-new-town', name: 'New Town (Action Area 1)', city: 'Kolkata', state: 'West Bengal', lat: 22.5898, lng: 88.4744 },
    { id: 'kol-ballygunge', name: 'Ballygunge', city: 'Kolkata', state: 'West Bengal', lat: 22.5280, lng: 88.3656 },
    { id: 'kol-alipore', name: 'Alipore', city: 'Kolkata', state: 'West Bengal', lat: 22.5312, lng: 88.3316 },

    // Chandigarh
    { id: 'chd-sector-17', name: 'Sector 17', city: 'Chandigarh', state: 'Chandigarh', lat: 30.7415, lng: 76.7794 },
    { id: 'chd-sector-35', name: 'Sector 35', city: 'Chandigarh', state: 'Chandigarh', lat: 30.7246, lng: 76.7681 },
    { id: 'chd-it-park', name: 'IT Park (Manimajra)', city: 'Chandigarh', state: 'Chandigarh', lat: 30.7226, lng: 76.8406 },
    { id: 'chd-mohali', name: 'Mohali Phase 7', city: 'Chandigarh', state: 'Punjab', lat: 30.7046, lng: 76.7179 },
    { id: 'chd-panchkula', name: 'Panchkula Sector 5', city: 'Chandigarh', state: 'Haryana', lat: 30.6942, lng: 76.8606 },
];

// Only physical society/office clans with fixed premises have default coordinates.
// Hobby, interest, and affinity pools define their own definitive pickup point/hub coordinates.
export const CLAN_COORDINATES = {
    'clan-1': { locality: 'Whitefield', city: 'Bengaluru', lat: 12.9698, lng: 77.7499, hubName: 'Ravi Dham Complex' },
    'clan-2': { locality: 'Madhapur', city: 'Hyderabad', lat: 17.4390, lng: 78.3780, hubName: 'Sathva Knowledge City' },
    'clan-4': { locality: 'Tellapur', city: 'Hyderabad', lat: 17.4812, lng: 78.2914, hubName: 'MyHome Tridasa' },
    'clan-5': { locality: 'HSR Layout', city: 'Bengaluru', lat: 12.9121, lng: 77.6446, hubName: 'HSR Startup Hub' },
    'clan-villas': { locality: 'Shankarpally Road', city: 'Hyderabad', lat: 17.4485, lng: 78.1322, hubName: 'Dates Villa County' },
};

export const DEFAULT_USER_LOCATION = CITY_HUBS[0]; // Hitec City, Hyderabad

const STORAGE_KEY_LOCATION = 'letsstack_user_location';
const STORAGE_KEY_RADIUS = 'letsstack_proximity_radius';

/**
 * Haversine formula to calculate great-circle distance between two points in km
 */
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
    if (!lat1 || !lon1 || !lat2 || !lon2) return null;
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 10) / 10; // Round to 1 decimal place (e.g. 2.4)
}

const LocationContext = createContext(null);

export function LocationProvider({ children }) {
    const [userLocation, setUserLocation] = useState(DEFAULT_USER_LOCATION);
    const [proximityRadius, setProximityRadius] = useState('all'); // 'all' | 5 | 15 | 30 | 'remote'
    const [isDetecting, setIsDetecting] = useState(false);
    const [detectError, setDetectError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);

    // Hydrate from localStorage on mount
    useEffect(() => {
        try {
            const savedLoc = localStorage.getItem(STORAGE_KEY_LOCATION);
            const savedRadius = localStorage.getItem(STORAGE_KEY_RADIUS);
            if (savedLoc) {
                setUserLocation(JSON.parse(savedLoc));
            }
            if (savedRadius) {
                setProximityRadius(savedRadius === 'all' || savedRadius === 'remote' ? savedRadius : Number(savedRadius));
            }
        } catch (e) {
            // Ignore storage errors
        }
        setIsHydrated(true);
    }, []);

    // Persist location
    const updateLocation = useCallback((loc) => {
        setUserLocation(loc);
        try {
            localStorage.setItem(STORAGE_KEY_LOCATION, JSON.stringify(loc));
        } catch (e) {}
    }, []);

    // Persist radius
    const updateRadius = useCallback((radius) => {
        setProximityRadius(radius);
        try {
            localStorage.setItem(STORAGE_KEY_RADIUS, String(radius));
        } catch (e) {}
    }, []);

    /**
     * Browser GPS Detection
     */
    const detectGpsLocation = useCallback(() => {
        if (typeof window === 'undefined' || !navigator.geolocation) {
            setDetectError('Geolocation is not supported by your browser');
            return;
        }

        setIsDetecting(true);
        setDetectError(null);

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                
                // Find closest known city hub
                let closestHub = CITY_HUBS[0];
                let minDistance = Infinity;
                
                for (const hub of CITY_HUBS) {
                    const dist = calculateDistanceKm(latitude, longitude, hub.lat, hub.lng);
                    if (dist < minDistance) {
                        minDistance = dist;
                        closestHub = hub;
                    }
                }

                const detectedLoc = {
                    id: 'gps-detected',
                    name: minDistance < 15 ? `${closestHub.name} (GPS)` : `Current Location (${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°)`,
                    locality: closestHub.name,
                    city: closestHub.city,
                    state: closestHub.state,
                    lat: latitude,
                    lng: longitude,
                    isGps: true,
                    closestHubName: closestHub.name,
                };

                updateLocation(detectedLoc);
                setIsDetecting(false);
                setIsModalOpen(false);
            },
            (err) => {
                setIsDetecting(false);
                let msg = 'Unable to retrieve location';
                if (err.code === 1) msg = 'Location permission was denied. Please select your hub manually.';
                else if (err.code === 2) msg = 'Location is currently unavailable.';
                else if (err.code === 3) msg = 'Location request timed out.';
                setDetectError(msg);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
        );
    }, [updateLocation]);

    /**
     * Resolve geolocation anchor for a pool
     */
    const resolvePoolCoordinates = useCallback((pool) => {
        if (!pool) return null;
        
        const isRemote = pool.isRemote === true || pool.deliveryType === 'remote' || pool.deliveryType === 'digital' || pool.category === 'digital' || pool.category === 'software' || pool.isDigitalDelivery === true || pool.pickupInfo?.isRemote === true || pool.pickupInfo?.isDigital === true || pool.id === 'pitch-ns-kazakhstan';
        const isPanIndia = !isRemote && (pool.isPanIndia === true || pool.deliveryType === 'pan_india' || pool.pickupInfo?.deliveryType === 'pan_india' || pool.pickupInfo?.isPanIndia === true);
        
        if (isRemote) {
            return { isRemote: true, isPanIndia: false, isDigital: false };
        }
        if (isPanIndia) {
            return { isPanIndia: true, isDigital: false, isRemote: false };
        }

        const isDoorstep = pool.deliveryType === 'doorstep' || pool.deliveryScope === 'city' || pool.pickupInfo?.isDoorstep === true || Boolean(pool.pickupInfo?.doorstepLocations?.length);
        const doorstepLocations = pool.pickupInfo?.doorstepLocations || pool.doorstepLocations || [];
        let lat = pool.pickupInfo?.lat || pool.geoCoordinates?.lat;
        let lng = pool.pickupInfo?.lng || pool.geoCoordinates?.lng;
        let hubName = pool.pickupInfo?.locality || pool.geoCoordinates?.locality;
        let city = pool.pickupInfo?.city || pool.geoCoordinates?.city;

        if (!lat || !lng || !hubName) {
            const primaryClanId = pool.clanIds?.[0] || pool.clanId;
            const clanGeo = CLAN_COORDINATES[primaryClanId];
            if (clanGeo) {
                lat = lat || clanGeo.lat;
                lng = lng || clanGeo.lng;
                hubName = hubName || clanGeo.locality || clanGeo.hubName;
                city = city || clanGeo.city;
            }
        }

        if (lat && lng) {
            return { lat, lng, hubName, city, isDoorstep, doorstepLocations, isDigital: false, isPanIndia: false, isRemote: false };
        }

        return { hubName, city, isDoorstep, doorstepLocations, isDigital: false, isPanIndia: false, isRemote: false };
    }, []);

    /**
     * Helper to compute distance of a pool from the active user location
     */
    const getPoolDistance = useCallback((pool) => {
        if (!pool) return null;
        const resolved = resolvePoolCoordinates(pool);
        if (!resolved || resolved.isPanIndia || resolved.isRemote || !resolved.lat || !resolved.lng) return null;
        
        if (!userLocation?.lat || !userLocation?.lng) return null;
        return calculateDistanceKm(userLocation.lat, userLocation.lng, resolved.lat, resolved.lng);
    }, [userLocation, resolvePoolCoordinates]);

    /**
     * Comprehensive pool location metadata for UI badges & tooltips
     */
    const getPoolLocationMeta = useCallback((pool, options = {}) => {
        if (!pool) return null;
        const resolved = resolvePoolCoordinates(pool);
        if (!resolved) return null;

        const { isMemberOfPoolClan = false } = options;

        // 1. Remote & Digital Programs, Subscriptions & Activities (Accessible from anywhere)
        if (resolved.isRemote) {
            return {
                type: 'remote',
                badgeText: '🌐 Remote',
                tooltip: 'Remotely deliverable • Accessible from anywhere without distance limits',
                distanceKm: null,
                hubName: 'Remote / Digital',
            };
        }

        // 2. Pan-India physical courier delivery
        if (resolved.isPanIndia) {
            return {
                type: 'pan_india',
                badgeText: '📦 Pan-India',
                tooltip: 'Dispatched via courier across India',
                distanceKm: null,
                hubName: 'Pan-India Courier',
            };
        }

        const distance = getPoolDistance(pool);
        const poolCity = resolved.city || pool.pickupInfo?.city;
        const userCity = userLocation?.city;
        const userLocality = userLocation?.name;
        const cityMatches = !poolCity || !userCity || poolCity.toLowerCase() === userCity.toLowerCase();
        const doorstepLocs = resolved.doorstepLocations || [];
        const matchesDoorstepLocality = doorstepLocs.length > 0
            ? doorstepLocs.some(loc => userLocality && (loc.toLowerCase().includes(userLocality.toLowerCase()) || userLocality.toLowerCase().includes(loc.toLowerCase())))
            : true;

        const poolClanIds = pool.clanIds || (pool.clanId ? [pool.clanId] : []);
        const societyClan = poolClanIds
            .map(id => mockClans?.find(c => c.id === id))
            .find(c => c && (c.badge?.toUpperCase().includes('SOCIETY') || c.badge?.toUpperCase().includes('VILLA') || c.id === 'clan-1' || c.id === 'clan-4' || c.id === 'clan-villas'));
        const isSocietyClan = Boolean(societyClan);
        const societyName = societyClan?.name || resolved.hubName || 'Society';

        // 4. User is a joined member of this apartment/society clan
        if (isMemberOfPoolClan && isSocietyClan) {
            const isUserNearby = distance !== null && distance <= 25 && cityMatches;
            // When user is within their society / home area and service is doorstep, Doorstep badge takes preference
            if (resolved.isDoorstep && isUserNearby) {
                return {
                    type: 'doorstep',
                    badgeText: '🚚 Doorstep',
                    tooltip: `Doorstep service at your home in ${societyName}`,
                    distanceKm: distance,
                    hubName: societyName,
                };
            }

            // When user is away / traveling or for society clubhouse drops, show 'Your Society'
            const awaySuffix = !isUserNearby ? ' • You can participate while you are away' : '';
            return {
                type: 'society',
                badgeText: '🏠 Your Society',
                tooltip: `Hosted in your community (${societyName})${awaySuffix}`,
                distanceKm: distance,
                hubName: societyName,
            };
        }

        // 5. City/Locality-wide Doorstep Delivery (service / vendor pools in user's city)
        if (resolved.isDoorstep && cityMatches && matchesDoorstepLocality) {
            const tooltipText = doorstepLocs.length > 0
                ? `Doorstep delivery available in ${userLocality || poolCity} (Zones: ${doorstepLocs.slice(0, 3).join(', ')}${doorstepLocs.length > 3 ? ` +${doorstepLocs.length - 3} more` : ''})`
                : `Doorstep delivery available across ${poolCity || userCity || 'your city'}`;
            return {
                type: 'doorstep',
                badgeText: '🚚 Doorstep',
                tooltip: tooltipText,
                distanceKm: distance,
                hubName: resolved.hubName,
            };
        }

        // 6. Local Pickup Hub with calculated distance
        if (distance !== null) {
            return {
                type: 'local',
                badgeText: `📍 ${distance} km`,
                tooltip: `Pickup at ${resolved.hubName || 'Local Hub'} (${distance} km away)`,
                distanceKm: distance,
                hubName: resolved.hubName,
            };
        }

        // 7. Fallback when locality is known
        const hub = resolved.hubName || pool.pickupInfo?.locality;
        if (hub) {
            return {
                type: 'hub',
                badgeText: `📍 ${hub}`,
                tooltip: `Pickup hub in ${hub}${poolCity ? `, ${poolCity}` : ''}`,
                distanceKm: null,
                hubName: hub,
            };
        }

        return null;
    }, [getPoolDistance, resolvePoolCoordinates, userLocation]);

    /**
     * Check if a pool passes the active radius filter
     */
    const isPoolInRadius = useCallback((pool, targetRadius = proximityRadius, options = {}) => {
        if (!pool) return false;
        
        const poolClanIds = pool.clanIds || (pool.clanId ? [pool.clanId] : []);
        const isSocietyClan = poolClanIds.some(id => id === 'clan-1' || id === 'clan-4' || id === 'clan-villas');
        
        // Exemption from distance radius dropping is ONLY for joined society clans
        if (options.isMemberOfPoolClan && isSocietyClan) {
            return true;
        }

        const resolved = resolvePoolCoordinates(pool);
        if (!resolved) return false;

        // 'all' includes everything
        if (targetRadius === 'all') return true;
        
        // 'remote' shows Pan-India dispatched, remote programs, and digital pools
        if (targetRadius === 'remote') {
            return resolved.isRemote || resolved.isPanIndia;
        }

        // Specific numerical radius (e.g. 5, 15, 30 km):
        // Exclude Pan-India courier & Remote/Digital from local radius filters
        if (resolved.isPanIndia || resolved.isRemote) {
            return false;
        }

        const poolCity = resolved.city || pool.pickupInfo?.city;
        const userCity = userLocation?.city;
        const userLocality = userLocation?.name;
        const cityMatches = !poolCity || !userCity || poolCity.toLowerCase() === userCity.toLowerCase();
        const doorstepLocs = resolved.doorstepLocations || [];
        const matchesDoorstepLocality = doorstepLocs.length > 0
            ? doorstepLocs.some(loc => userLocality && (loc.toLowerCase().includes(userLocality.toLowerCase()) || userLocality.toLowerCase().includes(loc.toLowerCase())))
            : true;

        // If it's doorstep delivery in user's matching city & locality
        if (resolved.isDoorstep && cityMatches && matchesDoorstepLocality) {
            const dist = getPoolDistance(pool);
            if (dist === null) return true;
            return dist <= Number(targetRadius);
        }

        // Physical pickup pool
        const dist = getPoolDistance(pool);
        if (dist === null) return false; // Filter out if no geo coordinates match local radius
        return dist <= Number(targetRadius);
    }, [proximityRadius, getPoolDistance, resolvePoolCoordinates, userLocation]);

    const value = {
        userLocation,
        proximityRadius,
        isDetecting,
        detectError,
        isModalOpen,
        isHydrated,
        cityHubs: CITY_HUBS,
        popularCities: POPULAR_CITIES,
        setUserLocation: updateLocation,
        setProximityRadius: updateRadius,
        openLocationModal: () => setIsModalOpen(true),
        closeLocationModal: () => setIsModalOpen(false),
        detectGpsLocation,
        getPoolDistance,
        getPoolLocationMeta,
        isPoolInRadius,
    };

    return (
        <LocationContext.Provider value={value}>
            {children}
        </LocationContext.Provider>
    );
}

export function useLocation() {
    const context = useContext(LocationContext);
    if (!context) {
        throw new Error('useLocation must be used within a LocationProvider');
    }
    return context;
}
