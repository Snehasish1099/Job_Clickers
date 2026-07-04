'use client';

import React, { useState } from 'react'
import { Controller, useForm } from "react-hook-form";
import TextFieldInput from '../../common/formfields/TextFieldInput';
import PhoneInputField from '../../common/formfields/PhoneInputField';
import ButtonField from '../../common/formfields/ButtonField';
import { Icon, IconButton, InputAdornment } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import DropDownField from '@/src/common/formfields/DropDownField';
import logo from '@/src/images/job_clicker_logo.jpg'

const RegisterComponent = (props: any) => {

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data, '# data');
    props.RegistrationApiCall(data)
  };

  const [showPassword, setShowPassword] = useState(true)
  const [showCPassword, setShowCPassword] = useState(true)
  const router = useRouter()

  const roleArr = [
    { name: "Job-Seeker", value: "jobseeker" },
    { name: "Employer", value: "employer" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-black to-white flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <Image
        src={logo}
        alt="Logo"
        className="w-24 mb-8"
        width={100}
        height={100}
      />

      {/* Container */}
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-semibold text-white mb-2">Make the most of your professional life</h1>

        {/* Form */}
        <div className="space-y-4 mt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-4 text-white">
            <div>
              <Controller name={"name"}
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    (<TextFieldInput
                      textnewclass={`w-full text-sm bg-white`}
                      floatingLabel='Name'
                      value={(value)}
                      onChange={onChange}
                    />)
                  )
                }}
                rules={{
                  required: true, pattern: /^[a-zA-Z][a-zA-Z ]*/i
                }}
              />
              {errors.name && errors.name.type === "required" && (
                <span className="error-message text-red-400 text-xs">Required</span>
              )}
              {errors.name && errors.name.type === "pattern" && (
                <span className="error-message text-red-400 text-xs">Not Valid</span>
              )}
            </div>

            {/* Email  */}
            <div>
              <Controller name={"email"}
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    (<TextFieldInput
                      textnewclass={`w-full text-sm bg-white`}
                      floatingLabel='Email'
                      value={(value)}
                      onChange={onChange}
                    />)
                  )
                }}
                rules={{
                  required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                }}
              />
              {errors.email && errors.email.type === "required" && (
                <span className="error-message text-red-400 text-xs">Required</span>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <span className="error-message text-red-400 text-xs">Not Valid</span>
              )}
            </div>

            {/* Phone Number  */}
            <div className='text-black'>
              <Controller name={"phone_number"}
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <PhoneInputField
                      defaultCountry={'in'}
                      // placeholder={'Enter Phone Number'}
                      label={'Enter Phone No.'}
                      extraCls={`!w-full text-sm mt-[0.45rem]`}
                      inputCls={`!w-full h-[3.3rem] cursor-default`}
                      onChange={(value: any) => { onChange(value) }}
                      value={value}
                      enableSearch={true}
                    />
                  )
                }}
                rules={{
                  required: true,
                  pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i,
                }}
              />
              {errors.phone_number && errors.phone_number.type === "required" && (
                <span className="error-message text-red-400 text-xs">{"Required"}</span>
              )}
              {errors.phone_number && errors.phone_number.type === "pattern" && (
                <span className="error-message text-red-400 text-xs">{"Wrong Pattern"}</span>
              )}
            </div>

            {/* Role  */}
            <div className='text-black'>
              <Controller
                name={"role"}
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <DropDownField
                      dropDownRootCls={"!bg-white"}
                      size="medium"
                      selectOption={roleArr}
                      placeholder={`Role`}
                      option={value}
                      handleChange={onChange}
                    />
                  )
                }}
                rules={{
                  required: true,
                }}
              />
              {errors.role && errors.role.type === "required" && (
                <span className="error-message text-red-400 text-xs">{"Required"}</span>
              )}
            </div>

            {/* Password  */}
            <div className={`pb-[2%]`}>
              <Controller
                name={"password"}
                control={control}
                rules={{
                  minLength: 2,
                  maxLength: 30,
                  required: true
                }}
                render={({ field: { onChange, value } }) => (
                  <TextFieldInput
                    textnewclass={`w-full text-sm bg-white`}
                    typePassword={showPassword}
                    floatingLabel="Password"
                    onChange={onChange}
                    value={value}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          tabIndex={-1}
                        >
                          <Icon className="text-20" color="action" tabIndex={-1}>
                            {showPassword ?
                              <VisibilityOffIcon sx={{ color: '#747774' }} />
                              :
                              <RemoveRedEyeIcon sx={{ color: '#747774' }} />}
                          </Icon>
                        </IconButton>
                      </InputAdornment>}
                  />
                )}
              />
              {errors.password && errors.password.type === "required" && (
                <span className={""}>Please enter your password</span>
              )}
            </div>

            {/* Confirm Password  */}
            <div className={`pb-[2%]`}>
              <Controller
                name={"confirm_pass"}
                control={control}
                rules={{
                  required: true,
                  validate: (value) => value === getValues("password")
                }}
                render={({ field: { onChange, value } }) => (
                  <TextFieldInput
                    textnewclass={`w-full text-sm bg-white`}
                    floatingLabel="Confirm password"
                    typePassword={showCPassword}
                    onChange={onChange}
                    value={value}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowCPassword(!showCPassword)}
                          tabIndex={-1}
                        >
                          <Icon className="text-20" color="action" tabIndex={-1}>
                            {showCPassword ?
                              <VisibilityOffIcon sx={{ color: '#747774' }} />
                              :
                              <RemoveRedEyeIcon sx={{ color: '#747774' }} />}
                          </Icon>
                        </IconButton>
                      </InputAdornment>}
                  />
                )}
              />
              {errors.confirm_pass && errors.confirm_pass.type === "validate" && (
                <span className={""}>{"Doesn't match"}</span>
              )}
            </div>

            <ButtonField
              type='submit'
              variant={'outlined'}
              buttonName={"Register"}
              buttonextracls={`!px-2 !py-2 !text-white ${props.loading === true && 'bg-grey-300'} !bg-blue-600 !text-sm !w-full`}
              loading={props.loading}
              disabled={props.loading === true ? true : false}
              onClick={handleSubmit(onSubmit)}
            />
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-white">
          Already on JobClickers?&nbsp;
          <span onClick={() => router.push('/login')} className="text-blue-300 font-medium hover:underline cursor-pointer">
            Sign in
          </span>
        </p>
      </div>
    </div>

  )
}

export default RegisterComponent