'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function RedirectContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const query = searchParams.toString();
        router.replace(`/pools/my${query ? `?${query}` : ''}`);
    }, [router, searchParams]);

    return null;
}

export default function MyPitchesRedirect() {
    return (
        <Suspense fallback={null}>
            <RedirectContent />
        </Suspense>
    );
}
