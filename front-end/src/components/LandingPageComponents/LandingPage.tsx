'use client';

import { JobHooks } from '@/src/containers/jobs/Hooks';
import { RootState } from '@/src/redux/configureStore';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import JobCard from '../jobs/JobCard';
import JobDescription from '../jobs/JobDescription';
import { ApplicationHooks } from '@/src/containers/applications/Hooks';

const LandingPage = () => {

  const { getAllJobsApiCall, getJobByJobIdApiCall } = JobHooks()
  const { getApplicationsApiCall, } = ApplicationHooks()

  useEffect(() => {
    getAllJobsApiCall()
    getApplicationsApiCall()
  }, [])

  const allJobs = useSelector((state: RootState) => state.jobs.jobs);
  const user_applications = useSelector((state: RootState) => state.application.applications)

  const role: any = typeof window !== 'undefined' && localStorage?.getItem('role');

  const [open, setOpen] = useState({
    state: false,
    id: ""
  });

  const handleOpen = (jobId: any) => {
    setOpen({ state: true, id: jobId });
    getJobByJobIdApiCall(jobId)
  };

  return (
    <div className="flex h-[92vh] overflow-hidden">
      {role === 'jobseeker' ?
        <>
          {/* Left: Job List */}
          <div className="w-[40%] border-r overflow-y-auto p-4 bg-gray-50">
            {allJobs?.length > 0 ? (
              allJobs.map((jobData: any, index: number) => (
                <div key={index}>
                  <JobCard
                    jobCardCls={`${jobData?._id === open?.id && '!border-2 !border-blue-500'}`}
                    jobData={jobData}
                    jobCardClick={() => handleOpen(jobData?._id)} />
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No jobs available.</p>
            )}
          </div>

          {/* Right: Job Description */}
          <div className="w-[60%] overflow-y-auto p-6">
            {open.state ? (
              <JobDescription
                getApplicationsApiCall={getApplicationsApiCall}
                user_applications={user_applications}
                handleClose={() => setOpen({ state: false, id: "" })}
              />
            ) : (
              <div className="text-gray-500 flex justify-center items-center text-center h-full">{"Select a job to view its details"}</div>
            )}
          </div>
        </>
        :
        <div>No Page Found Component</div>
      }
    </div>
  )
}

export default LandingPage