'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/redux/configureStore';

import BasicInfoForm from './BasicInfoForm';
import ResumeUploadForm from './ResumeUploadForm';
import SkillsCertificationsForm from './SkillsCertificationsForm';
import EducationWorkExperienceForm from './EducationWorkExperienceForm';
import ButtonField from '@/src/common/formfields/ButtonField';

const ProfileUpdateForm = () => {
    const userDetails: any = useSelector((state: RootState) => state.auth.userDetail);

    const methods = useForm({
        defaultValues: {
            name: userDetails?.name || '',
            email: userDetails?.email || '',
            phone_number: userDetails?.phone_number || '',
            headline: userDetails?.headline || '',
            location: userDetails?.location || '',
            resume: null,
            skills: [{ name: '' }],
            certifications: [{ name: '' }],
            education: [{ degree: '', institution: '', year: '' }],
            work_experience: [{ company: '', role: '', duration: '' }],
        },
    });

    const { handleSubmit } = methods;

    const onSubmit = (data: any) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (['skills', 'certifications', 'education', 'work_experience'].includes(key)) {
                formData.append(key, JSON.stringify(value));
            } else if (key === 'resume' && value) {
                formData.append('resume', value);
            } else {
                formData.append(key, value);
            }
        });

        console.log('Submitting Profile:', Object.fromEntries(formData.entries()));
        // Call API here with formData
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-6 max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
                <h2 className="text-2xl font-bold text-center text-blue-600">Update Profile</h2>

                <BasicInfoForm />
                <ResumeUploadForm />
                <SkillsCertificationsForm />
                <EducationWorkExperienceForm />

                <div className="flex justify-between items-center gap-4 pt-4">
                    <ButtonField
                        type="reset"
                        variant="outlined"
                        buttonName="Cancel"
                        buttonextracls="w-full !bg-red-600 !text-white"
                    />
                    <ButtonField
                        type="submit"
                        variant="contained"
                        buttonName="Update Profile"
                        buttonextracls="w-full !bg-blue-600 !text-white"
                    />
                </div>
            </form>
        </FormProvider>
    );
};

export default ProfileUpdateForm;
