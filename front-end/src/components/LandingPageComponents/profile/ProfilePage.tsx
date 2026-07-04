"use client"

import { Avatar, Button, Chip, Divider } from '@mui/material';
import { Download, Edit } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/redux/configureStore';
import Link from 'next/link';
import { useState } from 'react';
import CommmonModal from '@/src/common/layout/CommonModal';
import ProfileUpdateForm from './ProfileEditForm';

const ProfilePage = () => {

    const userDetails: any = useSelector((state: RootState) => state.auth.userDetail)

    const [openEdit, setOpenEdit] = useState<boolean>(false)
    const handleProfileEdit = () => {
        setOpenEdit(!openEdit)
    }

    const skillCount = userDetails?.skills?.length || 0;
    const certCount = userDetails?.certifications?.length || 0;
    const eduCount = userDetails?.education?.length || 0;

    return (
        <div className="mx-auto max-w-5xl px-3 py-6 sm:px-4 lg:px-6">
            <div className="glass-panel soft-shadow overflow-hidden rounded-[2rem] border border-white/70">
                <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 px-6 py-8 text-white">
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-5">
                            <Avatar src={userDetails?.avatar} sx={{ width: 92, height: 92, border: '4px solid rgba(255,255,255,0.18)' }} />
                            <div>
                                <p className="text-xs uppercase tracking-[0.3em] text-blue-200">Profile</p>
                                <h2 className="mt-2 text-3xl font-bold tracking-tight">
                                    {userDetails?.name}&nbsp;
                                    <span className='text-base font-normal text-blue-100'>({userDetails?.role})</span>
                                </h2>
                                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">{userDetails?.headline || 'Add a headline to highlight your strengths.'}</p>
                                <p className="mt-2 text-sm text-slate-300">{userDetails?.location || 'Location not set'}</p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                variant="contained"
                                startIcon={<Edit />}
                                onClick={() => handleProfileEdit()}
                                className="!rounded-full !bg-white !px-5 !py-2.5 !text-slate-900 hover:!bg-slate-100"
                            >
                                Edit profile
                            </Button>

                            {openEdit &&
                                <CommmonModal
                                    open={openEdit}
                                    handleClose={() => setOpenEdit(false)}
                                    modalCls={"!overflow-y-scroll"}
                                    titleCls={'!font-semibold'}
                                >
                                    <ProfileUpdateForm
                                        userDetails={userDetails}
                                    />
                                </CommmonModal>
                            }
                        </div>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl bg-white/10 px-4 py-3">
                            <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Skills</p>
                            <p className="mt-1 text-2xl font-semibold">{skillCount}</p>
                        </div>
                        <div className="rounded-2xl bg-white/10 px-4 py-3">
                            <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Education</p>
                            <p className="mt-1 text-2xl font-semibold">{eduCount}</p>
                        </div>
                        <div className="rounded-2xl bg-white/10 px-4 py-3">
                            <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Certifications</p>
                            <p className="mt-1 text-2xl font-semibold">{certCount}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6 px-6 py-6">
                    <section className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                            <h3 className="text-lg font-semibold text-slate-900">Contact information</h3>
                            <div className="mt-4 space-y-2 text-sm text-slate-600">
                                <p><span className="font-medium text-slate-900">Email:</span> {userDetails?.email}</p>
                                <p><span className="font-medium text-slate-900">Phone:</span> {userDetails?.phone_number || 'N/A'}</p>
                            </div>
                        </div>

                        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                            <h3 className="text-lg font-semibold text-slate-900">Resume</h3>
                            {userDetails?.resume ? (
                                <div className="mt-4 flex flex-col gap-3 rounded-2xl bg-slate-50 p-4">
                                    <p className="text-sm text-slate-700">Resume uploaded: <strong>{userDetails.resumeName || 'resume.pdf'}</strong></p>
                                    <Link href={userDetails.resume} target="_blank">
                                        <Button variant="outlined" startIcon={<Download />} className="!rounded-full !border-slate-300 !text-slate-700">
                                            View / download
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <p className="mt-4 text-sm text-slate-500">No resume uploaded yet.</p>
                            )}
                        </div>
                    </section>

                    <Divider />

                    <section className="grid gap-4 lg:grid-cols-2">
                        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                            <h3 className="text-lg font-semibold text-slate-900">Work experience</h3>
                            {userDetails?.experience?.length > 0 ? (
                                <ul className="mt-4 space-y-3">
                                    {userDetails.experience.map((exp: any, idx: number) => (
                                        <li key={idx} className="rounded-2xl bg-slate-50 p-4">
                                            <p className="font-semibold text-slate-900">{exp.role} @ {exp.company}</p>
                                            <p className="text-sm text-slate-500">{exp.duration}</p>
                                            <p className="mt-1 text-sm leading-6 text-slate-600">{exp.description}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="mt-4 text-sm text-slate-500">No experience added yet.</p>
                            )}
                        </div>

                        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                            <h3 className="text-lg font-semibold text-slate-900">Education</h3>
                            {userDetails?.education?.length > 0 ? (
                                <ul className="mt-4 space-y-3">
                                    {userDetails.education.map((edu: any, index: number) => (
                                        <li key={index} className="rounded-2xl bg-slate-50 p-4">
                                            <p className="font-semibold text-slate-900">{edu.institution}</p>
                                            <p className="text-sm text-slate-500">{edu.degree} ({edu.duration})</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="mt-4 text-sm text-slate-500">No education history added.</p>
                            )}
                        </div>
                    </section>

                    <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                        <h3 className="text-lg font-semibold text-slate-900">Skills</h3>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {userDetails?.skills?.length > 0 ? (
                                userDetails.skills.map((skill: any, id: number) => (
                                    <Chip key={id} label={skill} variant="outlined" className="!rounded-full" />
                                ))
                            ) : (
                                <p className="text-sm text-slate-500">No skills listed.</p>
                            )}
                        </div>
                    </section>

                    <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                        <h3 className="text-lg font-semibold text-slate-900">Certifications</h3>
                        {userDetails?.certifications?.length > 0 ? (
                            <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-slate-600">
                                {userDetails.certifications.map((cert: any, i: number) => (
                                    <li key={i}>{cert}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="mt-4 text-sm text-slate-500">No certifications added.</p>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
