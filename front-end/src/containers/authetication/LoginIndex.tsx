
'use client';

import LoginComponent from '@/src/components/authentication/LoginComponent'
import React from 'react'
import { AuthHooks } from './Hooks'

const LoginIndex = () => {

    const { loginType, setLoginType, LoginApiCall } = AuthHooks()

    return (
        <div>
            <LoginComponent
                LoginApiCall={LoginApiCall}
                loginType={loginType}
                setLoginType={setLoginType}
            />
        </div>
    )
}

export default LoginIndex