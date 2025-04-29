'use client';

import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import TextFieldInput from '@/src/common/formfields/TextFieldInput';
import PhoneInputField from '@/src/common/formfields/PhoneInputField';
import ButtonField from '@/src/common/formfields/ButtonField';

const ProfileUpdateForm = (props: any) => {
    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {

        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('phone_number', data.phone_number);
        formData.append('location', data.location);
        formData.append('headline', data.headline);
        

        formData.append('work_experience', JSON.stringify(data.work_experience));
        formData.append('education', JSON.stringify(data.education));
        formData.append('skills', JSON.stringify(data.skills));
        formData.append('certifications', JSON.stringify(data.certifications));

        if (data.resume) {
            formData.append('resume', data.resume);
        }

        console.log('#Updated profile data:', data);
    };

    return (
        <div className="flex items-center justify-center px-4">
            <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6 space-y-6">
                <h2 className="text-2xl font-bold text-center text-blue-600">Update Profile</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
                    {/* Name */}
                    <Controller
                        name="name"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextFieldInput
                                textnewclass="w-full"
                                floatingLabel="Full Name"
                                value={value}
                                onChange={onChange}
                            />
                        )}
                        rules={{ required: "Name is required" }}
                    />
                    {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}

                    {/* Email */}
                    <Controller
                        name="email"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextFieldInput
                                textnewclass="w-full"
                                floatingLabel="Email"
                                value={value}
                                onChange={onChange}
                            />
                        )}
                        rules={{
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email format"
                            }
                        }}
                    />
                    {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}

                    {/* Phone Number */}
                    <Controller
                        name="phone_number"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <PhoneInputField
                                defaultCountry="in"
                                label="Phone Number"
                                value={value}
                                onChange={onChange}
                                extraCls="!w-full text-sm mt-[0.45rem]"
                                inputCls="!w-full h-[3.3rem] cursor-default"
                            />
                        )}
                        rules={{ required: "Phone number is required" }}
                    />
                    {errors.phone_number && <span className="text-xs text-red-500">{errors.phone_number.message}</span>}

                    {/* Headline */}
                    <Controller
                        name="headline"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextFieldInput
                                textnewclass="w-full"
                                floatingLabel="Headline"
                                value={value}
                                onChange={onChange}
                            />
                        )}
                    />

                    {/* Location */}
                    <Controller
                        name="location"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextFieldInput
                                textnewclass="w-full"
                                floatingLabel="Location"
                                value={value}
                                onChange={onChange}
                            />
                        )}
                    />

                    {/* Resume Upload */}
                    <Controller
                        name="resume"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700">Resume (PDF)</label>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => {
                                        onChange(e.target.files[0]);
                                    }}
                                    className="w-full mt-2"
                                />
                            </div>
                        )}
                    />

                    {/* Skills */}
                    <Controller
                        name="skills"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextFieldInput
                                textnewclass="w-full"
                                floatingLabel="Skills (comma separated)"
                                value={value}
                                onChange={onChange}
                            />
                        )}
                    />

                    {/* Certifications */}
                    <Controller
                        name="certifications"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextFieldInput
                                textnewclass="w-full"
                                floatingLabel="Certifications (comma separated)"
                                value={value}
                                onChange={onChange}
                            />
                        )}
                    />

                    {/* Education */}
                    <Controller
                        name="education"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextFieldInput
                                textnewclass="w-full"
                                floatingLabel="Education Summary"
                                value={value}
                                onChange={onChange}
                            />
                        )}
                    />

                    {/* Work Experience */}
                    <Controller
                        name="work_experience"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextFieldInput
                                textnewclass="w-full"
                                floatingLabel="Work Experience"
                                value={value}
                                onChange={onChange}
                            />
                        )}
                    />

                    {/* Submit Button */}
                    <div className="flex justify-between items-center">
                        <ButtonField
                            type="reset"
                            variant="outlined"
                            buttonName="Cancel"
                            buttonextracls="w-full !px-2 !py-2 !text-white !bg-red-600"
                        />
                        <ButtonField
                            type="submit"
                            variant="contained"
                            buttonName="Update Profile"
                            buttonextracls="w-full !px-2 !py-2 !text-white !bg-blue-600"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileUpdateForm;
