"use client"

import { ApplicationHooks } from '@/src/containers/applications/Hooks'
import { RootState } from '@/src/redux/configureStore'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { Button } from '@mui/material'

const ViewApplicants = () => {

  const params: any = useParams()

  const { getApplicationsByJobIdApiCall } = ApplicationHooks()

  useEffect(() => {
    getApplicationsByJobIdApiCall(params?.id)
  }, [])

  const applicationsForEmployerByJobId = useSelector((state: RootState) => state.application.applicationsByJobId)

  const [openResume, setOpenResume] = useState<string | null>(null)
  const toggleResume = (id: string) => {
    setOpenResume(openResume === id ? null : id)
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-6xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">Applications for This Job</h1>

      {applicationsForEmployerByJobId.length === 0 ? (
        <p className="text-gray-600 text-center">No applications found for this job.</p>
      ) : (
        <div className="space-y-6">
          {applicationsForEmployerByJobId.map((application: any) => (
            <div
              key={application._id}
              className="p-6 border rounded-lg bg-gray-50 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {application?.applicantId?.name}
                  </h2>
                  <p className="text-gray-600">{application?.applicantId?.email}</p>
                  <p className="text-gray-600">{application?.applicantId?.phone_number}</p>
                  <p className="mt-1 text-sm">
                    <span className="font-semibold text-gray-700">Status:</span>{' '}
                    <span className="capitalize text-blue-600">{application?.status}</span>
                  </p>
                </div>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => toggleResume(application._id)}
                  endIcon={openResume === application._id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  sx={{ borderRadius: '8px', textTransform: 'none' }}
                >
                  {openResume === application._id ? 'Hide Resume' : 'View Resume'}
                </Button>
              </div>

              {openResume === application._id && (
                <div className="mt-6">
                  <iframe
                    src={`http://localhost:9001/${application.resume}`}
                    width="100%"
                    height="500px"
                    className="w-full border rounded-md"
                    title="Resume"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ViewApplicants