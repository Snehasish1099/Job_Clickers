
'use client';

import LoginComponent from '@/src/components/authentication/LoginComponent'
import React from 'react'
import { AuthHooks } from './Hooks'

const LoginIndex = () => {

    const { LoginApiCall } = AuthHooks()

    return (
        <div>
            <LoginComponent
                LoginApiCall={LoginApiCall}
            />
        </div>
    )
}

export default LoginIndex