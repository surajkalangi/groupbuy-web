'use client';

import { use, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function PaymentRedirectInner({ pitchId }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const query = searchParams.toString();
        router.replace(`/pools/${pitchId}/payment${query ? `?${query}` : ''}`);
    }, [pitchId, router, searchParams]);

    return null;
}

export default function PaymentRedirect({ params }) {
    const { pitchId } = use(params);
    return (
        <Suspense fallback={null}>
            <PaymentRedirectInner pitchId={pitchId} />
        </Suspense>
    );
}
