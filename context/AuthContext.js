'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

/**
 * Mock Auth Context
 * 
 * Three user states:
 * - GUEST:      Not logged in at all
 * - LOGGED_IN:  Logged in but not a member of the currently viewed clan
 * - MEMBER:     Logged in and a member of the currently viewed clan
 * 
 * Persisted via localStorage so state survives page reloads.
 */

const AUTH_STATES = {
    GUEST: 'guest',
    LOGGED_IN: 'logged_in',
    MEMBER: 'member',
};

const STORAGE_KEY = 'groupbuy_auth_state';
const USER_KEY = 'groupbuy_current_user';

const defaultUser = {
    id: 'user-1',
    name: 'Aditya Sharma',
    phone: '+919876543210',
    city: 'Bangalore',
    locality: 'Whitefield',
    avatarUrl: null,
    reputation: 92,
    pitchesJoined: 12,
    pitchesHosted: 3,
    clans: [], // Start with no clans to test join flow
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [authState, setAuthState] = useState(AUTH_STATES.GUEST);
    const [currentUser, setCurrentUser] = useState(null);
    const [isHydrated, setIsHydrated] = useState(false);
    const [pendingRatingPitchId, setPendingRatingPitchId] = useState(null);

    // Hydrate from localStorage on mount
    useEffect(() => {
        try {
            const savedState = localStorage.getItem(STORAGE_KEY);
            const savedUser = localStorage.getItem(USER_KEY);
            if (savedState && Object.values(AUTH_STATES).includes(savedState)) {
                setAuthState(savedState);

            }
            if (savedUser) {
                setCurrentUser(JSON.parse(savedUser));
            }
        } catch (e) {
            // Ignore localStorage errors (SSR, private browsing, etc.)
        }
        setIsHydrated(true);
    }, []);

    // Persist to localStorage on change
    useEffect(() => {
        if (!isHydrated) return;
        try {
            localStorage.setItem(STORAGE_KEY, authState);
            localStorage.setItem(USER_KEY, JSON.stringify(currentUser));
        } catch (e) {
            // Ignore
        }
    }, [authState, currentUser, isHydrated]);

    const isGuest = authState === AUTH_STATES.GUEST;
    const isLoggedIn = authState !== AUTH_STATES.GUEST;
    const isMember = authState === AUTH_STATES.MEMBER;

    const login = useCallback(() => {
        setAuthState(AUTH_STATES.LOGGED_IN);
        setCurrentUser(defaultUser);

    }, []);

    const logout = useCallback(() => {
        setAuthState(AUTH_STATES.GUEST);
        setCurrentUser(null);
        setPendingRatingPitchId(null);
    }, []);

    const joinClan = useCallback((clanId) => {
        setAuthState(AUTH_STATES.MEMBER);
        if (currentUser && !currentUser.clans.includes(clanId)) {
            setCurrentUser(prev => ({
                ...prev,
                clans: [...prev.clans, clanId],
            }));
        }
    }, [currentUser]);

    const setMockState = useCallback((state) => {
        if (Object.values(AUTH_STATES).includes(state)) {
            setAuthState(state);
            if (state === AUTH_STATES.GUEST) {
                setCurrentUser(null);
                setPendingRatingPitchId(null);
            } else if (!currentUser) {
                setCurrentUser(defaultUser);

            }
        }
    }, [currentUser]);

    const dismissRating = useCallback(() => setPendingRatingPitchId(null), []);
    const submitRating = useCallback(() => setPendingRatingPitchId(null), []);
    const triggerRatingModal = useCallback((pitchId) => setPendingRatingPitchId(pitchId), []);

    /**
     * Check if the current user is a member of a specific clan
     */
    const isClanMember = useCallback((clanId) => {
        if (!isLoggedIn || !currentUser) return false;
        if (isMember) return true; // In MEMBER state, treat as member of all clans for demo
        return currentUser.clans?.includes(clanId) || false;
    }, [isLoggedIn, isMember, currentUser]);

    const value = {
        // State
        authState,
        currentUser,
        isGuest,
        isLoggedIn,
        isMember,
        isHydrated,
        pendingRatingPitchId,
        // Actions
        login,
        logout,
        joinClan,
        setMockState,
        isClanMember,
        dismissRating,
        submitRating,
        triggerRatingModal,
        // Constants
        AUTH_STATES,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export { AUTH_STATES };
