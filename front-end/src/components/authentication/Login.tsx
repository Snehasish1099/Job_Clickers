import { ClickAwayListener } from '@mui/material';
import React, { useState } from 'react'
import Image from 'next/image';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TextFieldInput from '../../common/formfields/TextFieldInput';
import ButtonField from '../../common/formfields/ButtonField'
import { useRouter } from 'next/navigation';

const LoginPage = (props: any) => {
  const router = useRouter();

  const [mailFocused, setMailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [showPasswoard, setShowPasswoard] = useState(true)

  return (
    <div className={`bg-white flex items-center justify-center w-full min-h-screen`}>
      <div className={`p-4 border rounded-lg shadow-md w-full max-w-lg`}>
        <div className={`w-full flex items-center flex-col justify-between gap-5`}>
          <Image src={""} alt='logo' onClick={() => router.push('/')} className={`cursor-pointer w-28`} />
          <p className='text-black text-xl'>{"Welcome Back"}</p>
        </div>
        {/* input fields */}
        <div className={`w-full flex flex-col items-center ${props.message ? 'gap-4' : 'gap-6'} mt-6`}>
          <ClickAwayListener onClickAway={() => setMailFocused(false)}>
            <div onClick={() => setMailFocused(true)} className='w-full sm:w-1/2'>
              <TextFieldInput
                handleChange={(e: any) => props.setName(e)}
                floatingLabel={"Email"}
                focused={mailFocused}
                onKeyPress={props.Login}
                textnewclass={`w-full `}
              />
            </div>
          </ClickAwayListener>

          <ClickAwayListener onClickAway={() => setPasswordFocused(false)}>
            <div onClick={() => setPasswordFocused(true)} className='w-full sm:w-1/2'>
              <TextFieldInput
                typePassword={showPasswoard}
                handleChange={(e: any) => props.setPassword(e)}
                floatingLabel={passwordFocused === true ? '*Password' : null}
                focused={passwordFocused}
                onKeyPress={props.Login}
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
            </div>
          </ClickAwayListener>

          <div className='w-full sm:w-1/2'>
            <ButtonField
              variant={'outlined'}
              onClick={() => props.LoginApiCall()}
              buttonName={"Login"}
              buttonextracls={`w-full !px-2 !py-2 !text-white ${props.loading === true && 'bg-grey-300'} !bg-orange-600 !text-sm hover:!bg-blue-400 hover:!text-black`}
              loading={props.loading}
              disabled={props.loading === true ? true : false}
            />
          </div>

          <p className='text-black text-xs'>{"Don't have an account?"}&nbsp;<span onClick={() => router.push('/register')} className='text-blue-600 cursor-pointer underline'>{"Register"}</span></p>
        </div>
      </div>

    </div >
  )
}

export default LoginPage