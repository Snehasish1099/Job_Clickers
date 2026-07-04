import React from 'react';
import { Button, Typography } from '@mui/material';

const ResumeUploadForm = ({ resume, setResume }: { resume: File, setResume: (e: any) => void }) => {

    const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setResume(file);
        }
    };

    return (
        <div className="my-4">
            <input
                id="resume-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                style={{ display: 'none' }}
                onChange={handleResumeChange}
            />
            <label htmlFor="resume-upload">
                <Button variant="outlined" component="span" size="small">
                    {resume ? "Change Resume" : "Upload Resume"}
                </Button>
            </label>
            {resume && (
                <Typography variant="caption" className="ml-2 text-gray-600">
                    {resume.name}
                </Typography>
            )}
        </div>
    );
};

export default ResumeUploadForm;
