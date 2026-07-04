"use client"

import React, { useState } from 'react';
import { IconButton, Typography, Divider, Button, Chip, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/redux/configureStore';
import { ChatHooks } from '@/src/containers/chat/Hooks';
import { ApplicationHooks } from '@/src/containers/applications/Hooks';
// import { useRouter } from 'next/navigation';

const JobDescription = (props: any) => {

    const [resume, setResume] = useState<File | null>(null);

    const { applyForJobApiCall } = ApplicationHooks()

    const singleJobDetails: any = useSelector((state: RootState) => state?.jobs?.singleJobData);
    const haveApplied: boolean = props.user_applications && props.user_applications?.some((item: any) => item?.jobId?._id === singleJobDetails?._id)

    const { onMessageClick } = ChatHooks()

    // const handleSaveJob = () => {
    // };


    if (!singleJobDetails || Object.keys(singleJobDetails)?.length === 0) return null;

    return (
        <div className="h-full overflow-y-auto bg-gradient-to-br from-white via-slate-50 to-blue-50/40">
            <div className="border-b border-slate-200 bg-white/80 px-6 py-5 backdrop-blur">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-blue-600">Job details</p>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{singleJobDetails?.title}</h2>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                            <Chip label={singleJobDetails?.company} className="!bg-slate-100 !font-semibold !text-slate-700" />
                            <Chip label={singleJobDetails?.job_type || "Full time"} className="!bg-blue-50 !font-semibold !text-blue-700" />
                            <Chip label={haveApplied ? 'Application submitted' : 'Open role'} className="!bg-emerald-50 !font-semibold !text-emerald-700" />
                        </div>
                    </div>
                    <IconButton onClick={props.handleClose} className="!h-11 !w-11 !border !border-slate-200 !bg-white !shadow-sm">
                        <CloseIcon />
                    </IconButton>
                </div>
            </div>

            <div className="space-y-6 px-6 py-6">
                <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1">
                            <LocationOnIcon fontSize="small" />
                            {singleJobDetails?.location}
                        </span>
                        <span className="rounded-full bg-blue-50 px-3 py-1 font-semibold text-blue-700">
                            Upto Rs. {singleJobDetails?.salary || 'N/A'}
                        </span>
                        <span>Posted on {new Date(singleJobDetails?.createdAt).toLocaleDateString()}</span>
                    </div>

                    <Typography variant="body1" className="!mt-5 !leading-8 !text-slate-700 whitespace-pre-wrap">
                        {singleJobDetails?.description}
                    </Typography>
                </section>

                <section className="grid gap-4 lg:grid-cols-[1fr_320px]">
                    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                        <Typography variant="h6" className="!font-semibold !text-slate-900">
                            Employer details
                        </Typography>
                        <Stack spacing={1.25} className="!mt-4">
                            <Typography variant="body2" className="!text-slate-600">
                                <strong>Name:</strong> {singleJobDetails?.postedBy?.name}
                            </Typography>
                            <Typography variant="body2" className="!text-slate-600">
                                <strong>Email:</strong> {singleJobDetails?.postedBy?.email}
                            </Typography>
                            <Typography variant="body2" className="!text-slate-600">
                                <strong>Phone:</strong> {singleJobDetails?.postedBy?.phone_number || 'N/A'}
                            </Typography>
                        </Stack>

                        <Button
                            variant="contained"
                            startIcon={<MailOutlineIcon />}
                            onClick={() => onMessageClick(singleJobDetails?.postedBy)}
                            className="!mt-5 !rounded-full !bg-slate-900 !px-5 !py-2.5 !text-white hover:!bg-slate-800"
                        >
                            Message the employer
                        </Button>
                    </div>

                    <div className="rounded-[1.75rem] border border-blue-100 bg-blue-50/70 p-6 shadow-sm">
                        <Typography variant="h6" className="!font-semibold !text-slate-900">
                            Apply now
                        </Typography>
                        <Typography variant="body2" className="!mt-2 !text-slate-600">
                            Upload a resume and submit your application in one step.
                        </Typography>

                        {!haveApplied && (
                            <div className="mt-5">
                                <input
                                    id="resume-upload"
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    style={{ display: 'none' }}
                                    onChange={(e) => setResume(e.target.files?.[0] || null)}
                                />
                                <label htmlFor="resume-upload">
                                    <Button variant="outlined" component="span" className="!rounded-full !border-slate-300 !bg-white !text-slate-700">
                                        {resume ? "Change resume" : "Upload resume"}
                                    </Button>
                                </label>
                                {resume && (
                                    <Typography variant="caption" className="ml-3 text-slate-600">
                                        {resume.name}
                                    </Typography>
                                )}
                            </div>
                        )}

                        <div className="mt-5 flex flex-wrap gap-3">
                            <Button
                                variant="contained"
                                className={`${haveApplied ? "!bg-slate-300 !text-slate-600" : "!bg-blue-600 hover:!bg-blue-700 !text-white"} !rounded-full !px-5 !py-2.5`}
                                disabled={haveApplied}
                                onClick={() => applyForJobApiCall(singleJobDetails._id, resume)}
                            >
                                {haveApplied ? "Applied" : "Apply now"}
                            </Button>

                            {!haveApplied &&
                                <Button
                                    variant="outlined"
                                    className="!rounded-full !border-slate-300 !text-slate-700"
                                >
                                    Save job
                                </Button>
                            }
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default JobDescription;
