'use client';

import React, { useState } from 'react'
import Image from 'next/image';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TextFieldInput from '../../common/formfields/TextFieldInput';
import ButtonField from '../../common/formfields/ButtonField'
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import PhoneInputField from '@/src/common/formfields/PhoneInputField';
import logo from '@/src/images/job_clicker_logo.jpg'

const LoginComponent = (props: any) => {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data, '# data');
    props.LoginApiCall(data)
  };

  const [showPasswoard, setShowPasswoard] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-tl from-blue-600 via-black to-white flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <Image
        src={logo}
        alt="Logo"
        className="w-24 mb-8"
        height={100}
        width={100}
      />

      {/* Container */}
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-semibold text-white mb-2">Sign in</h1>
        <p className="text-sm text-white mb-6">Stay updated on your professional world</p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-4 w-full flex flex-col items-center" >

          {/* Email  */}
          {props.loginType === 'email' && (
            <div className="w-full">
              <Controller
                name="email"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextFieldInput
                    onlyValue
                    textnewclass="w-full text-sm bg-white"
                    floatingLabel="Email"
                    value={value}
                    onChange={onChange}
                  />
                )}
                rules={{
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                }}
              />
              {errors.email?.type === 'required' && (
                <span className="text-red-400 text-xs">Required</span>
              )}
              {errors.email?.type === 'pattern' && (
                <span className="text-red-400 text-xs">Invalid Email</span>
              )}
            </div>
          )}

          {/* Phone Number  */}
          {props.loginType === 'phone' && (
            <div className="w-full">
              <Controller
                name="phone_number"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <PhoneInputField
                    defaultCountry="in"
                    placeholder="Phone no"
                    label="Phone Number"
                    containerClass="!w-full "
                    extraCls="!w-full text-sm mt-[0.45rem]"
                    inputCls="!w-full h-[3.3rem] cursor-default"
                    onChange={(value: any) => onChange(value)}
                    value={value}
                    enableSearch
                  />
                )}
                rules={{
                  required: true,
                  pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i,
                }}
              />
              {errors.phone_number?.type === 'required' && (
                <span className="text-red-400 text-xs">Required</span>
              )}
              {errors.phone_number?.type === 'pattern' && (
                <span className="text-red-400 text-xs">Wrong Pattern</span>
              )}
            </div>
          )}

          {/* Password  */}
          < div className='w-full' >
            <Controller name={"password"}
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <TextFieldInput
                    onlyValue
                    typePassword={showPasswoard}
                    onChange={onChange}
                    value={value}
                    textnewclass={`w-full bg-white`}
                    placeholder={`Enter Password`}
                    endAdornment={
                      <div
                        className={`cursor-pointer`}
                        onClick={() => setShowPasswoard(!showPasswoard)}>
                        {showPasswoard ?
                          <VisibilityOffIcon sx={{ color: '#747774' }} />
                          :
                          <RemoveRedEyeIcon sx={{ color: '#747774' }} />}
                      </div>
                    }
                  />
                )
              }}
              rules={{
                required: true,
              }}
            />
            {errors.password && errors.password.type === "required" && (
                <span className="error-message text-red-400 text-xs">{"Required"}</span>
              )}
            {errors.password && errors.password.type === "pattern" && (
                <span className="error-message text-red-400 text-xs">{"Wrong Pattern"}</span>
              )}
          </div >

          <div className='w-full '>
            <ButtonField
              type='submit'
              variant={'outlined'}
              buttonName={"Sign In"}
              buttonextracls={`w-full !px-2 !py-2 !text-white ${props.loading === true && 'bg-grey-300'} !bg-blue-600 !text-sm`}
              loading={props.loading}
              disabled={props.loading === true ? true : false}
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </form>

        <p
          className="text-blue-300 hover:underline text-sm cursor-pointer font-medium text-end mt-4"
          onClick={() => {
            if (props.loginType === 'email') {
              props.setLoginType('phone')
            } else {
              props.setLoginType('email')
            }
          }}
        >
          {`Sign in with ${props.loginType === 'email' ? 'phone' : 'email'} instead?`}
        </p>

        <p className="text-center text-base text-white my-2">Or</p>

        <button className="w-full border border-gray-400 rounded-full py-2 font-medium text-sm bg-white cursor-not-allowed">
          Sign in with Google
        </button>

        <p className="mt-6 text-start text-sm text-white">
          New to JobClickers?&nbsp;
          <span onClick={() => router.push('/register')} className="text-blue-300 font-medium hover:underline cursor-pointer">
            Join now
          </span>
        </p>
      </div>
    </div>
  )
}

export default LoginComponent