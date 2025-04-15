'use client';

import React, { useEffect } from 'react'
import { AuthHooks } from '../../containers/authetication/Hooks';

const LandingPage = (props: any) => {

  const { getUserByIdApiCall } = AuthHooks()

  const userId = typeof window !== 'undefined' && localStorage?.getItem('userId')

  useEffect(() => {
    getUserByIdApiCall(userId)
  }, [userId])


  return (
    <div className=''>
    </div>
  )
}

export default LandingPage