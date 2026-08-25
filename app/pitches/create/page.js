'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function CreateRedirect() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const query = searchParams.toString();
        router.replace(`/pools/create${query ? `?${query}` : ''}`);
    }, [router, searchParams]);

    return null;
}

export default function CreatePitchRedirect() {
    return (
        <Suspense fallback={null}>
            <CreateRedirect />
        </Suspense>
    );
}
