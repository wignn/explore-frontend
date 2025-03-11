"use client"
import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { EdgeStoreProvider } from '@/lib/edgeStore';
interface Props {
    children: ReactNode;
}

const Providers = ({ children }:Props) => {
    return<SessionProvider>{children}</SessionProvider>
}

export default Providers;