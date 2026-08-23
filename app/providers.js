'use client';

import { AuthProvider } from '@/context/AuthContext';
import { LocationProvider } from '@/context/LocationContext';
import LocationPickerModal from '@/components/location/LocationPickerModal';
import DevToolbar from '@/components/dev/DevToolbar';
import RatingModal from '@/components/pitch/RatingModal';

export function Providers({ children }) {
    return (
        <AuthProvider>
            <LocationProvider>
                {children}
                <LocationPickerModal />
                <RatingModal />
                <DevToolbar />
            </LocationProvider>
        </AuthProvider>
    );
}

