"use client"

import React from 'react';
import { IconButton, Typography, Divider, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/redux/configureStore';
// import { useRouter } from 'next/navigation';

const JobDescription = (props: any) => {
    // const router = useRouter()

    const singleJobDetails: any = useSelector((state: RootState) => state?.jobs?.singleJobData);

    // const handleChat = (employerId: string) => {
    // };

    // const handleSaveJob = () => {
    // };

    if (!singleJobDetails || Object.keys(singleJobDetails)?.length === 0) return null;

    return (
        <div className="w-full space-y-4">
            {/* Header */}
            <div className="mb-4 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-semibold">{singleJobDetails?.title}</h2>
                    <h4 className='text-sm text-gray-600'>Posted on: {new Date(singleJobDetails?.createdAt).toLocaleString()}</h4>
                </div>
                <IconButton onClick={props.handleClose}>
                    <CloseIcon />
                </IconButton>
            </div>

            <Divider />

            {/* Company Name and Location */}
            <div className='my-4'>
                <Typography variant="h5" className="font-medium text-gray-700">
                    {singleJobDetails?.company}
                </Typography>

                <div className="flex items-center gap-1 text-sm text-gray-600">
                    <LocationOnIcon fontSize="small" />
                    <span>{singleJobDetails?.location}</span>
                </div>
            </div>

            <Divider />

            {/* Job Description */}
            <div className='my-4'>
                <Typography variant="h6" className="font-semibold text-gray-800">
                    Job Description
                </Typography>
                <Typography variant="body1" className="text-gray-700 whitespace-pre-wrap">
                    {singleJobDetails?.description}
                </Typography>
            </div>

            <Divider />

            {/* Salary Section */}
            <div className='my-4'>
                <Typography variant="h6" className="font-semibold text-gray-800">
                    Salary Compensation
                </Typography>
                {singleJobDetails?.salary &&
                    <Typography variant="body1" className="text-gray-700 whitespace-pre-wrap">
                        {"Upto Rs."}&nbsp;{singleJobDetails?.salary}
                    </Typography>}
            </div>

            <Divider />

            {/* Employer Details Section */}
            <div className="my-4 flex flex-col gap-3">
                <Typography variant="h6" className="font-medium text-gray-700">
                    Employer Details:
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                    <strong>Name:</strong> {singleJobDetails?.postedBy.name}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                    <strong>Email:</strong> {singleJobDetails?.postedBy.email}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                    <strong>Phone:</strong> {singleJobDetails?.postedBy.phone_number}
                </Typography>

                {/* Contact Employer Button */}
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<MailOutlineIcon />}
                    // onClick={() => handleChat(singleJobDetails?.postedBy._id)} 
                    className="my-4 w-fit"
                >
                    {"Message the Employer"}
                </Button>
            </div>

            <Divider />

            <div className="w-full my-4 flex flex-row-reverse items-end gap-5">
                {/* Apply Now Button */}
                <Button
                    variant="contained"
                    size="small"
                    className="!bg-blue-600 hover:!bg-blue-700 !text-white"
                >
                    {"Apply Now"}
                </Button>

                {/* Save Job Button */}
                <Button
                    variant="outlined"
                    // color={isSaved ? "secondary" : "primary"}
                    // onClick={handleSaveJob}
                    size="small"
                    className="!text-sm"
                >
                    {"Save Job"}
                </Button>
            </div>


        </div>
    );
};

export default JobDescription;
