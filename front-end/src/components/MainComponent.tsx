import React from 'react'
import Header from './LandingPageComponents/Header'

const MainComponent = ({ children }: any) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

export default MainComponent