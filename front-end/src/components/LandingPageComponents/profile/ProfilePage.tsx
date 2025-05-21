"use client"

import { Avatar, Button, Chip, Divider } from '@mui/material';
import { Download, Edit } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/redux/configureStore';
import Link from 'next/link';
import { useState } from 'react';
import CommmonModal from '@/src/common/layout/CommonModal';
import ProfileUpdateForm from './ProfileEditForm';

const ProfilePage = (props: any) => {

    const userDetails: any = useSelector((state: RootState) => state.auth.userDetail)

    const [openEdit, setOpenEdit] = useState<boolean>(false)
    const handleProfileEdit = () => {
        setOpenEdit(!openEdit)
    }

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6 mt-10 space-y-6">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center space-x-4">
                    <Avatar src={userDetails?.avatar} sx={{ width: 80, height: 80 }} />
                    <div>
                        <h2 className="text-xl font-bold">{userDetails?.name}&nbsp;<span className='text-sm capitalize font-normal'>({userDetails?.role})</span></h2>
                        <p className="text-gray-600">{userDetails?.headline}</p>
                        <p className="text-sm text-gray-500">{userDetails?.location}</p>
                    </div>
                </div>

                <div className="flex gap-2 mt-4 md:mt-0">
                    {userDetails?.resume && (
                        <Link href={userDetails?.resume} target="_blank">
                            <Button variant="outlined" startIcon={<Download />}>Download Resume</Button>
                        </Link>
                    )}
                    <Button
                        variant="contained"
                        startIcon={<Edit />}
                        onClick={() => handleProfileEdit()}
                    >
                        Edit Profile
                    </Button>

                    {openEdit &&
                        <CommmonModal
                            open={openEdit}
                            handleClose={() => setOpenEdit(false)}
                            modalCls={"!overflow-y-scroll"}
                            titleCls={'!font-semibold'}
                        >
                            <ProfileUpdateForm />
                        </CommmonModal>
                    }
                </div>
            </div>

            <Divider />

            {/* Contact Info */}
            <section>
                <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                <p><span className="font-medium">📧 Email:</span> {userDetails?.email}</p>
                <p><span className="font-medium">📱 Phone:</span> {userDetails?.phone_number || 'N/A'}</p>
            </section>

            <Divider />

            {/* Resume Section */}
            <section>
                <h3 className="text-lg font-semibold mb-2">Resume</h3>
                {userDetails?.resume ? (
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-100 p-4 rounded-lg">
                        <p className="text-gray-700">Resume uploaded: <strong>{userDetails.resumeName || 'resume.pdf'}</strong></p>
                        <Link href={userDetails.resume} target="_blank">
                            <Button variant="outlined" startIcon={<Download />}>View / Download</Button>
                        </Link>
                    </div>
                ) : (
                    <p className="text-gray-500">No resume uploaded yet.</p>
                )}
            </section>

            <Divider />

            {/* Work Experience */}
            <section>
                <h3 className="text-lg font-semibold mb-2">Work Experience</h3>
                {userDetails?.experience?.length > 0 ? (
                    <ul className="space-y-4">
                        {userDetails.experience.map((exp: any, idx: number) => (
                            <li key={idx} className="bg-gray-50 p-4 rounded-lg">
                                <p className="font-semibold">{exp.role} @ {exp.company}</p>
                                <p className="text-sm text-gray-600">{exp.duration}</p>
                                <p className="text-gray-700">{exp.description}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No experience added yet.</p>
                )}
            </section>

            <Divider />

            {/* Education */}
            <section>
                <h3 className="text-lg font-semibold mb-2">Education</h3>
                {userDetails?.education?.length > 0 ? (
                    <ul className="space-y-4">
                        {userDetails.education.map((edu: any, index: number) => (
                            <li key={index} className="bg-gray-50 p-4 rounded-lg">
                                <p className="font-semibold">{edu.institution}</p>
                                <p className="text-sm text-gray-600">{edu.degree} ({edu.duration})</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No education history added.</p>
                )}
            </section>

            <Divider />

            {/* Skills */}
            <section>
                <h3 className="text-lg font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                    {userDetails?.skills?.length > 0 ? (
                        userDetails.skills.map((skill: any, id: number) => (
                            <Chip key={id} label={skill} variant="outlined" />
                        ))
                    ) : (
                        <p className="text-gray-500">No skills listed.</p>
                    )}
                </div>
            </section>

            <Divider />

            {/* Certifications */}
            <section>
                <h3 className="text-lg font-semibold mb-2">Certifications</h3>
                {userDetails?.certifications?.length > 0 ? (
                    <ul className="list-disc ml-6 space-y-2">
                        {userDetails.certifications.map((cert: any, i: number) => (
                            <li key={i}>{cert}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No certifications added.</p>
                )}
            </section>
        </div>
    );
};

export default ProfilePage;
