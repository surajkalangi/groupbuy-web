'use client';

import { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function JoinRedirect({ params }) {
    const { pitchId } = use(params);
    const router = useRouter();

    useEffect(() => {
        if (pitchId) {
            router.replace(`/pools/${pitchId}/join`);
        }
    }, [pitchId, router]);

    return null;
}
