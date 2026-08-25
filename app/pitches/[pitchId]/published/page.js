'use client';

import { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PublishedRedirect({ params }) {
    const { pitchId } = use(params);
    const router = useRouter();

    useEffect(() => {
        if (pitchId) {
            router.replace(`/pools/${pitchId}/published`);
        }
    }, [pitchId, router]);

    return null;
}
