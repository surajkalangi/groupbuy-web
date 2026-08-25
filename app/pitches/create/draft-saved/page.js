'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DraftSavedRedirect() {
    const router = useRouter();
    useEffect(() => {
        router.replace('/pools/create/draft-saved');
    }, [router]);
    return null;
}
