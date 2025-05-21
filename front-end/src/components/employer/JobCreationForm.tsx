'use client';

import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import TextFieldInput from '../../common/formfields/TextFieldInput';
import DropDownField from '../../common/formfields/DropDownField';
import ButtonField from '../../common/formfields/ButtonField';
import { JobHooks } from '@/src/containers/jobs/Hooks';
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/src/redux/configureStore';
import { singleJobReducer } from '@/src/containers/jobs/jobReducer';

const JobCreateForm = (props: any) => {

  const router = useRouter()
  const pathName = usePathname()

  const { createJobApiCall, editJobApiCall } = JobHooks()

  const jobDataToFill: any = useSelector((state: RootState) => state.jobs.singleJobData)
  const dispatch = useDispatch()

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      title: jobDataToFill && jobDataToFill?.title ? jobDataToFill?.title : "",
      company: jobDataToFill && jobDataToFill?.company ? jobDataToFill?.company : "",
      location: jobDataToFill && jobDataToFill?.location ? jobDataToFill?.location : "",
      salary: jobDataToFill && jobDataToFill?.salary ? jobDataToFill?.salary : 0,
      job_type: jobDataToFill && jobDataToFill?.job_type ? jobDataToFill?.job_type : "",
      description: jobDataToFill && jobDataToFill?.description ? jobDataToFill?.description : ""
    }
  });

  useEffect(() => {
    if (pathName?.endsWith('/new')) {
      dispatch(singleJobReducer(null))
      reset({
        title: "",
        company: "",
        location: "",
        salary: 0,
        job_type: "",
        description: ""
      })
    }
  }, [pathName?.endsWith('/new')])

  const jobTypeOptions = [
    { name: 'Full-Time', value: 'full_time' },
    { name: 'Part-Time', value: 'part_time' },
    { name: 'Internship', value: 'internship' },
    { name: 'Contract', value: 'contract' },
  ];

  const onSubmit = (data: any) => {
    console.log(data, '# job form data');
    if (jobDataToFill && Object?.keys(jobDataToFill)?.length > 0 && jobDataToFill?._id) {
      editJobApiCall(data, reset, jobDataToFill?._id)
    } else {
      createJobApiCall(data, reset);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">{`${jobDataToFill && Object?.keys(jobDataToFill)?.length > 0 ? `Update job ${jobDataToFill?._id}` : "Post a New Job"}`}</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Job Title */}
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextFieldInput
                textnewclass="w-full text-sm bg-white"
                floatingLabel="Job Title"
                onChange={onChange}
                value={value}
              />
            )}
          />
          {errors.title && <p className="text-xs text-red-500">Job title is required</p>}

          {/* Company */}
          <Controller
            name="company"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextFieldInput
                textnewclass="w-full text-sm bg-white"
                floatingLabel="Company Name"
                onChange={onChange}
                value={value}
              />
            )}
          />
          {errors.company && <p className="text-xs text-red-500">Company name is required</p>}

          {/* Location */}
          <Controller
            name="location"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextFieldInput
                textnewclass="w-full text-sm bg-white"
                floatingLabel="Location"
                onChange={onChange}
                value={value}
              />
            )}
          />
          {errors.location && <p className="text-xs text-red-500">Location is required</p>}

          {/* Salary */}
          <Controller
            name="salary"
            control={control}
            rules={{ required: true, min: 0, pattern: /^[0-9]+$/, }}
            render={({ field: { onChange, value } }) => (
              <TextFieldInput
                textnewclass="w-full text-sm bg-white"
                floatingLabel="Salary"
                type="number"
                onChange={onChange}
                value={value}
              />
            )}
          />
          {errors.salary && <p className="text-xs text-red-500">Valid salary is required</p>}

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
          {errors.job_type && <p className="text-xs text-red-500">Job type is required</p>}

          {/* Description */}
          <Controller
            name="description"
            control={control}
            rules={{ required: true, minLength: 20 }}
            render={({ field: { onChange, value } }) => (
              <TextFieldInput
                multiline
                rows={4}
                textnewclass="w-full text-sm bg-white"
                floatingLabel="Job Description"
                onChange={onChange}
                value={value}
              />
            )}
          />
          {errors.description && (
            <p className="text-xs text-red-500">Minimum 20 characters required</p>
          )}

          {/* CTA */}
          <div className='flex justify-between'>
            <ButtonField
              type="reset"
              variant="outlined"
              buttonName={`Cancel`}
              buttonextracls={`!px-4 !py-2 !text-sm !w-full`}
              onClick={() => {
                router.back()
                reset()
                dispatch(singleJobReducer(null))
              }}
            />
            <ButtonField
              type="submit"
              variant="contained"
              buttonName={`${jobDataToFill && Object?.keys(jobDataToFill)?.length > 0 ? "Update Job" : "Post Job"}`}
              buttonextracls={`!px-4 !py-2 !text-white ${props.loading && 'bg-grey-300'} !bg-blue-600 !text-sm !w-full`}
              loading={props.loading}
              disabled={props.loading}
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobCreateForm;
