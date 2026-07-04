'use client';

import { JobHooks } from '@/src/containers/jobs/Hooks';
import { RootState } from '@/src/redux/configureStore';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import JobCard from '../jobs/JobCard';
import JobDescription from '../jobs/JobDescription';
import { ApplicationHooks } from '@/src/containers/applications/Hooks';
import { Box, Chip } from '@mui/material';

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

  const selectedJob = allJobs?.find((job: any) => job?._id === open.id);

  return (
    <div className="mx-auto max-w-7xl px-3 py-6 sm:px-4 lg:px-6">
      {role === 'jobseeker' ? (
        <div className="grid gap-5 lg:grid-cols-[380px_minmax(0,1fr)]">
          <aside className="glass-panel soft-shadow overflow-hidden rounded-[2rem] border border-white/70">
            <div className="border-b border-slate-100 px-5 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-blue-600">Job discovery</p>
              <div className="mt-2 flex items-end justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900">Find your next role</h1>
                  <p className="mt-1 text-sm text-slate-500">Browse fresh opportunities from employers.</p>
                </div>
                <Chip label={`${allJobs?.length || 0} jobs`} size="small" className="!bg-blue-50 !font-semibold !text-blue-700" />
              </div>
            </div>

            <div className="max-h-[calc(100vh-15rem)] overflow-y-auto p-4">
              {allJobs?.length > 0 ? (
                <div className="space-y-3">
                  {allJobs.map((jobData: any) => (
                    <JobCard
                      key={jobData?._id}
                      jobCardCls={`${jobData?._id === open?.id ? '!border-blue-500 !bg-blue-50/70 !shadow-lg' : ''}`}
                      jobData={jobData}
                      jobCardClick={() => handleOpen(jobData?._id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-slate-200 bg-white/70 p-8 text-center">
                  <p className="text-sm font-medium text-slate-900">No jobs available yet.</p>
                  <p className="mt-1 text-xs text-slate-500">Check back after employers post new roles.</p>
                </div>
              )}
            </div>
          </aside>

          <section className="glass-panel soft-shadow min-h-[calc(100vh-8rem)] overflow-hidden rounded-[2rem] border border-white/70">
            {open.state ? (
              <JobDescription
                getApplicationsApiCall={getApplicationsApiCall}
                user_applications={user_applications}
                handleClose={() => setOpen({ state: false, id: "" })}
              />
            ) : (
              <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-8 py-10 text-center">
                <div className="max-w-xl rounded-[2rem] border border-dashed border-slate-200 bg-white/70 p-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-blue-600">Selected job</p>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Pick a role to see the full story</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Open a job card on the left to inspect responsibilities, compensation, and application actions in a cleaner detail panel.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                    <Chip label={`${selectedJob?.company || 'Company'} updates`} variant="outlined" />
                    <Chip label="Fresh listings" variant="outlined" />
                    <Chip label="Fast apply" variant="outlined" />
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      ) : (
        <Box className="rounded-[2rem] border border-white/70 bg-white/70 p-8 shadow-xl">
          No Page Found Component
        </Box>
      )}
    </div>
  )
}

export default LandingPage
