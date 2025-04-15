import ProfilePage from '@/src/components/LandingPageComponents/profile/ProfilePage'
import MainComponent from '@/src/components/MainComponent'
import React from 'react'

const page = () => {
  return (
    <div>
      <MainComponent>
        <ProfilePage />
      </MainComponent>
    </div>
  )
}

export default page