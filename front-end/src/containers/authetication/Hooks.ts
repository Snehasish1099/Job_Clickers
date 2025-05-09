'use client';

import { useState } from "react";
import { doGetApiCall, doPostApiCall, doPutApiCall } from "../../utils/ApiConfig";
import { useDispatch } from "react-redux";
import { userDetailsReducer } from "./authReducer";
import { useRouter } from "next/navigation";
// import { snackbarOpen } from "../snackbarReducerSlice";

export const AuthHooks = () => {

    const dispatch = useDispatch()

    const router = useRouter();

    const [openEditProfile, setOpenEditProfile] = useState<boolean>(false)

    const [loginType, setLoginType] = useState<'email' | 'phone'>('email');

    // Registration API call
    const RegistrationApiCall = async (formData: any) => {
        const data = {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
            bodyData: {
                name: formData?.name,
                email: formData?.email,
                phone_number: formData?.phone_number,
                password: formData?.password,
                role: formData?.role
            }
        }
        const res: any = await doPostApiCall(data)
        if (res?.status === 201) {
            // dispatch(snackbarOpen({ alertType: 'success', message: "Registration successful, please Login." }))
            router.push('/login')
        } else {
            // dispatch(snackbarOpen({ alertType: 'error', message: "Registration failed, please try again later or use different credentials" }))
        }
    }


    // Login API call 
    const LoginApiCall = async (formdata: any) => {
        const data = {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
            bodyData: {
                email: formdata?.email,
                phone_number: formdata?.phone_number,
                password: formdata?.password
            }
        }

        const res: any = await doPostApiCall(data)
        if (res?.status === 200) {
            localStorage.setItem('token', res?.data?.token)
            localStorage.setItem('userId', res?.data?.user?._id)
            localStorage.setItem('role', res?.data?.user?.role)

            getUserByIdApiCall(res?.data?.user?._id)
            // dispatch(snackbarOpen({ alertType: 'success', message: "Login Successful" }))
            router.push(`/home`)
        } else {
            // dispatch(snackbarOpen({ alertType: 'error', message: "Login Failed, please try again." }))
        }
    }

    /**
     * @method GET
     * @description - gets user details by id
     */
    const getUserByIdApiCall = async (userId: string) => {
        const data = {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/users/${userId}`,
        }
        const res: any = await doGetApiCall(data)
        if (res?.status === 200) {
            dispatch(userDetailsReducer(res?.data))
        } else {
            dispatch(userDetailsReducer(null))
        }
    }

    /**
     * @method PUT
     * @description - Updates the details of an registered user
     */
    const updateUserByIdApiCall = async (formData: any, userId: string) => {
        const data = {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/users/${userId}`,
            bodyData: {
                username: formData?.userName,
                phone_number: formData?.phone_number,
                address: formData?.address,
            }
        }
        const res: any = await doPutApiCall(data)
        if (res?.status === 200) {
            // getUserByIdApiCall(res?.data?.id)
            dispatch(userDetailsReducer(res?.data))
            // dispatch(snackbarOpen({ alertType: 'success', message: "Details updated syccessfully" }))
            setOpenEditProfile(false)
        } else {
            // dispatch(snackbarOpen({ alertType: 'error', message: "Details update failed" }))
        }
    }

    return {
        loginType,
        setLoginType,
        LoginApiCall,
        RegistrationApiCall,

        // getAllUsersApiCall,
        getUserByIdApiCall,

        openEditProfile,
        setOpenEditProfile,
        updateUserByIdApiCall
    }
}