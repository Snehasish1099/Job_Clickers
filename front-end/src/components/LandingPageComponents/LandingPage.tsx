'use client';

import { AdminHooks } from '@/src/containers/admin/Hooks';
import { JobHooks } from '@/src/containers/jobs/Hooks';
import React, { useEffect } from 'react'

const LandingPage = ({ children }: { children: React.ReactNode }) => {

  const { getAllJobsApiCall } = JobHooks()
  const { getAllUsersApiCall } = AdminHooks()

  useEffect(() => {
    getAllJobsApiCall()
    getAllUsersApiCall()  // For testing the api, only to be used in Admin
  }, [])

  return (
    <div className='flex'>
      Home
      {children}
    </div>
  )
}

export default LandingPage