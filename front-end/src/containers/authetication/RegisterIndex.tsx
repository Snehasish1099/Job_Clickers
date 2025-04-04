'use client';

import RegisterComponent from '@/src/components/authentication/RegisterComponent'
import React from 'react'
import { AuthHooks } from './Hooks'

const RegisterIndex = () => {

    const { RegistrationApiCall } = AuthHooks()

    return (
        <div>
            <RegisterComponent
                RegistrationApiCall={RegistrationApiCall}
            />
        </div>
    )
}

export default RegisterIndex