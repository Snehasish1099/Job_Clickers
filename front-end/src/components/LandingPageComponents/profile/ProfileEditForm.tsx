'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/src/redux/configureStore';
// import { resetForm } from '@/src/redux/profileUpdateFormReducer';

import ButtonField from '@/src/common/formfields/ButtonField';

import ResumeUploadForm from './ResumeUploadForm';
import SkillsCertificationsForm from './SkillsCertificationsForm';
import EducationWorkExperienceForm from './EducationWorkExperienceForm';
import BasicInfoForm from './BasicInfoForm';
import { AuthHooks } from '@/src/containers/authetication/Hooks';
import { setInitialForm } from '@/src/redux/profileUpdateFormReducer';


const ProfileUpdateForm = ({ userDetails }: { userDetails: any }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        if (userDetails) {
            dispatch(setInitialForm(userDetails));
        }
    }, [userDetails]);

    const formData = useSelector((state: RootState) => state.profileUpdate);

    const { updateUserByIdApiCall } = AuthHooks()

    const [resume, setResume] = useState<File | any>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const fullData = new FormData();
        fullData.append("name", formData.name);
        fullData.append("email", formData.email);
        fullData.append("phone_number", formData.phone_number);
        fullData.append("headline", formData.headline);
        fullData.append("location", formData.location);

        fullData.append("skills", JSON.stringify(formData.skills));
        fullData.append("certifications", JSON.stringify(formData.certifications));
        fullData.append("education", JSON.stringify(formData.education));
        fullData.append("work_experience", JSON.stringify(formData.work_experience));

        if (resume) {
            fullData.append("resume", resume);
        }

        updateUserByIdApiCall(fullData, userDetails?._id);
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold">Update Your Profile</h2>

            <BasicInfoForm />

            <ResumeUploadForm resume={resume} setResume={setResume} />

            <SkillsCertificationsForm />

            <EducationWorkExperienceForm />

            <ButtonField
                type='submit'
                variant={'outlined'}
                buttonName={"Update profile"}
                buttonextracls={`w-full !px-2 !py-2 !text-white !bg-blue-600 !text-sm`}
            />
        </form>
    );
};

export default ProfileUpdateForm;
