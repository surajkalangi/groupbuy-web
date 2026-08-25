'use client';

import { use, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function ConfirmRedirect({ pitchId }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const query = searchParams.toString();
        router.replace(`/pools/${pitchId}/confirmation${query ? `?${query}` : ''}`);
    }, [pitchId, router, searchParams]);

    return null;
}

export default function ConfirmationRedirect({ params }) {
    const { pitchId } = use(params);
    return (
        <Suspense fallback={null}>
            <ConfirmRedirect pitchId={pitchId} />
        </Suspense>
    );
}
