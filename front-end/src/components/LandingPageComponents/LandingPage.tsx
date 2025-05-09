'use client';

// import { AdminHooks } from '@/src/containers/admin/Hooks';
import { JobHooks } from '@/src/containers/jobs/Hooks';
import { RootState } from '@/src/redux/configureStore';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import JobCard from '../jobs/JobCard';
import JobDescription from '../jobs/JobDescription';

const LandingPage = () => {

  const { getAllJobsApiCall, getJobByJobIdApiCall } = JobHooks()
  // const { getAllUsersApiCall } = AdminHooks()

  useEffect(() => {
    getAllJobsApiCall()
    // getAllUsersApiCall()  // For testing the api, only to be used in Admin
  }, [])

  const allJobs = useSelector((state: RootState) => state.jobs.jobs);

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
            handleClose={() => setOpen({ state: false, id: "" })}
          />
        ) : (
          <div className="text-gray-500 flex justify-center items-center text-center h-full">{"Select a job to view its details"}</div>
        )}
      </div>
    </div>
  )
}

export default LandingPage