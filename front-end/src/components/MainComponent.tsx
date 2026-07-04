"use client"

import React, { useEffect, useState } from 'react'
import Header from './LandingPageComponents/Header'

const MainComponent = ({ children }: any) => {
    const [hydration, setHydration] = useState(false);

    useEffect(() => {
        setHydration(true);
    }, []);

    return (
        <div className="app-shell min-h-screen">
            {hydration && (
                <>
                    <Header />
                    <main className="mx-auto w-full">
                        {children}
                    </main>
                </>
            )}
        </div>
    )
}

export default MainComponent
