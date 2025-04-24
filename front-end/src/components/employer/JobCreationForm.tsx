'use client';

import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import TextFieldInput from '../../common/formfields/TextFieldInput';
import DropDownField from '../../common/formfields/DropDownField';
import ButtonField from '../../common/formfields/ButtonField';
import { JobHooks } from '@/src/containers/jobs/Hooks';

const JobCreateForm = (props: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm();

  const { createJobApiCall } = JobHooks()

  const jobTypeOptions = [
    { name: 'Full-Time', value: 'full_time' },
    { name: 'Part-Time', value: 'part_time' },
    { name: 'Internship', value: 'internship' },
    { name: 'Contract', value: 'contract' },
  ];

  const onSubmit = (data: any) => {
    console.log(data, '# job form data');
    createJobApiCall(data, reset);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Post a New Job</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Job Title */}
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextFieldInput
                onlyValue
                textnewclass="w-full text-sm bg-white"
                floatingLabel="Job Title"
                {...field}
              />
            )}
          />
          {errors.title && <span className="text-xs text-red-500">Job title is required</span>}

          {/* Company */}
          <Controller
            name="company"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextFieldInput
                onlyValue
                textnewclass="w-full text-sm bg-white"
                floatingLabel="Company Name"
                {...field}
              />
            )}
          />
          {errors.company && <span className="text-xs text-red-500">Company name is required</span>}

          {/* Location */}
          <Controller
            name="location"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextFieldInput
                onlyValue
                textnewclass="w-full text-sm bg-white"
                floatingLabel="Location"
                {...field}
              />
            )}
          />
          {errors.location && <span className="text-xs text-red-500">Location is required</span>}

          {/* Salary */}
          <Controller
            name="salary"
            control={control}
            rules={{ required: true, min: 0 }}
            render={({ field }) => (
              <TextFieldInput
                onlyValue
                textnewclass="w-full text-sm bg-white"
                floatingLabel="Salary"
                type="number"
                {...field}
              />
            )}
          />
          {errors.salary && <span className="text-xs text-red-500">Valid salary is required</span>}

          {/* Job Type Dropdown */}
          <Controller
            name="job_type"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <DropDownField
                dropDownRootCls="!bg-white"
                size="medium"
                selectOption={jobTypeOptions}
                placeholder="Job Type"
                option={value}
                handleChange={onChange}
              />
            )}
          />
          {errors.job_type && <span className="text-xs text-red-500">Job type is required</span>}

          {/* Description */}
          <Controller
            name="description"
            control={control}
            rules={{ required: true, minLength: 20 }}
            render={({ field }) => (
              <TextFieldInput
                onlyValue
                multiline
                rows={4}
                textnewclass="w-full text-sm bg-white"
                floatingLabel="Job Description"
                {...field}
              />
            )}
          />
          {errors.description && (
            <span className="text-xs text-red-500">Minimum 20 characters required</span>
          )}

          {/* Submit Button */}
          <ButtonField
            type="submit"
            variant="outlined"
            buttonName="Post Job"
            buttonextracls={`!px-4 !py-2 !text-white ${props.loading && 'bg-grey-300'} !bg-blue-600 !text-sm !w-full`}
            loading={props.loading}
            disabled={props.loading}
            onClick={handleSubmit(onSubmit)}
          />
        </form>
      </div>
    </div>
  );
};

export default JobCreateForm;
