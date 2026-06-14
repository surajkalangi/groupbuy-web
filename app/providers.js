'use client';

import { AuthProvider } from '@/context/AuthContext';
import DevToolbar from '@/components/dev/DevToolbar';
import RatingModal from '@/components/pitch/RatingModal';

export function Providers({ children }) {
    return (
        <AuthProvider>
            {children}
            <RatingModal />
            <DevToolbar />
        </AuthProvider>
    );
}
