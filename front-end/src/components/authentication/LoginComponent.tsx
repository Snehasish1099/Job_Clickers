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
    <div className={`bg-white flex items-center justify-center w-full min-h-screen`}>
      <div className={`p-4 border rounded-lg shadow-md w-full max-w-lg`}>
        <div className={`w-full flex items-center flex-col justify-between gap-5`}>
          <Image src={""} alt='logo' onClick={() => router.push('/')} className={`cursor-pointer w-28`} />
          <p className='text-black text-xl'>{"Welcome Back"}</p>
        </div>

        {/* Normal Form  */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-4 w-full flex flex-col items-center">
          {/* Email  */}
          <div className='w-full sm:w-1/2'>
            <Controller name={"email"}
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  (<TextFieldInput
                    onlyValue
                    textnewclass={`w-full text-sm `}
                    floatingLabel='Email'
                    value={(value)}
                    onChange={onChange}
                  />)
                )
              }}
              rules={{
                required: true, pattern: /^[a-zA-Z][a-zA-Z ]*/i
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
          <div className='w-full sm:w-1/2 !text-black'>
            <Controller name={"phone_number"}
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <PhoneInputField
                    defaultCountry={'in'}
                    placeholder={'Phone no'}
                    label={'Phone Number'}
                    containerClass={'w-full '}
                    extraCls={`w-full text-sm mt-[0.45rem]`}
                    inputCls={`w-full h-[3.3rem] cursor-default`}
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

          {/* Password  */}
          <div className='w-full sm:w-1/2'>
            <Controller name={"password"}
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <TextFieldInput
                    onlyValue
                    typePassword={showPasswoard}
                    onChange={onChange}
                    value={value}
                    textnewclass={`w-full `}
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
          </div>

          <div className='w-full sm:w-1/2'>
            <ButtonField
              type='submit'
              variant={'outlined'}
              buttonName={"Login"}
              buttonextracls={`w-full !px-2 !py-2 !text-white ${props.loading === true && 'bg-grey-300'} !bg-orange-600 !text-sm hover:!bg-blue-400 hover:!text-black`}
              loading={props.loading}
              disabled={props.loading === true ? true : false}
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </form>

        <p className='text-black text-xs'>{"Don't have an account?"}&nbsp;<span onClick={() => router.push('/register')} className='text-blue-600 cursor-pointer underline'>{"Register"}</span></p>

        <div className='border-b my-2'></div>

        <div className='w-1/2 flex justify-between'>
          <a href="http://localhost:9001/api/auth/google" className='border p-1'>
            Google Login
          </a>

          <a href="http://localhost:9001/api/auth/github" className='border p-1'>
            GitHub Login
          </a>
        </div>

      </div>

    </div>
  )
}

export default LoginComponent