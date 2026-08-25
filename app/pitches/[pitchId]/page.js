'use client';

import { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PitchDetailRedirect({ params }) {
    const { pitchId } = use(params);
    const router = useRouter();

    useEffect(() => {
        if (pitchId) {
            router.replace(`/pools/${pitchId}`);
        }
    }, [pitchId, router]);

    return null;
}
