import LandingPage from '@/src/components/LandingPageComponents/LandingPage'
import MainComponent from '@/src/components/MainComponent'
import React from 'react'

const page = () => {
  return (
    <div>
      <MainComponent>
        <LandingPage />
      </MainComponent>
    </div>
  )
}

export default page