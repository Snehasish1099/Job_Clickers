"use client"

import React, { useEffect, useState } from 'react'
import Header from './LandingPageComponents/Header'

const MainComponent = ({ children }: any) => {
    const [hydration, setHydration] = useState(false);

    useEffect(() => {
        setHydration(true);
    }, []);

    return (
        <div>
            {hydration &&
                <>
                    <Header />
                    {children}
                </>
            }
        </div>
    )
}

export default MainComponent