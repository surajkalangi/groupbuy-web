'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PreviewRedirect() {
    const router = useRouter();
    useEffect(() => {
        router.replace('/pools/create/preview');
    }, [router]);
    return null;
}
