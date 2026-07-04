"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Logo from '@/src/images/job_clicker_logo.jpg'
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { SearchOutlined, Logout, WorkOutline } from '@mui/icons-material'
import WorkIcon from '@mui/icons-material/Work';
import { usePathname, useRouter } from 'next/navigation';
import TextFieldInput from '@/src/common/formfields/TextFieldInput';
import { ClickAwayListener } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import './index.css'
import { AuthHooks } from '@/src/containers/authetication/Hooks';

const Header = (props: any) => {

    const { getUserByIdApiCall } = AuthHooks()

    const userId: any = typeof window !== 'undefined' && localStorage?.getItem('userId')
    const token: any = typeof window !== 'undefined' && localStorage?.getItem('token')
    const role: any = typeof window !== 'undefined' && localStorage?.getItem('role');

    useEffect(() => { 
        if (userId) {
            getUserByIdApiCall(userId)
        }
    }, [userId])

    const router = useRouter()
    const pathName = usePathname()

    const [openDetails, setOpenDetails] = useState(false)
    const userProfileArr = role === 'employer' ?
        [
            { name: 'View Profile', logo: <AccountCircleIcon fontSize="small" />, link: `/profile/${userId}` },
            { name: 'Manage Jobs', logo: <WorkOutline fontSize="small" />, link: '/employer/jobs/manage' },
            { name: 'Post Job', logo: <WorkIcon fontSize="small" />, link: '/employer/jobs/new' },
            { name: 'Settings', logo: <SettingsIcon fontSize="small" />, link: '/settings' },
            { name: 'Sign Out', logo: <Logout fontSize="small" />, link: '/login' },
        ]
        :
        role === 'jobseeker' && [
            { name: 'View Profile', logo: <AccountCircleIcon fontSize="small" />, link: `/profile/${userId}` },
            { name: 'Applied Jobs', logo: <WorkIcon fontSize="small" />, link: '/jobs/applied' },
            { name: 'Settings', logo: <SettingsIcon fontSize="small" />, link: '/settings' },
            { name: 'Sign Out', logo: <Logout fontSize="small" />, link: '/login' },
        ]

    return (
        <header className="sticky top-0 z-40 px-3 pt-3">
            <div className="glass-panel mx-auto flex w-full max-w-7xl items-center gap-4 rounded-[1.5rem] px-4 py-3">
                <button
                    type="button"
                    onClick={() => router.push('/home')}
                    className="flex items-center gap-3 rounded-2xl bg-slate-950/90 px-3 py-2 text-white shadow-lg shadow-slate-900/20 transition-transform hover:scale-[1.01]"
                >
                    <Image src={Logo} alt="logo" className="h-11 w-11 rounded-xl object-cover" height={44} width={44} />
                    <div className="hidden sm:block text-left">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-slate-300">Job platform</p>
                        <p className="text-sm font-semibold leading-none">JobClickers</p>
                    </div>
                </button>

                <div className="hidden flex-1 md:block">
                    <TextFieldInput
                        srchCls={'searchClass w-full'}
                        fullWidth
                        placeholder="Search roles, companies, or keywords"
                        endAdornment={<SearchOutlined className="!text-slate-400" />}
                        textnewclass={'bg-white/90 w-full rounded-full shadow-sm'}
                        onChange={props.handleChange}
                    />
                </div>

                {token &&
                    <div className={`relative ml-auto flex items-center gap-2`}>
                        <button type="button" onClick={() => router?.push("/home")} className="header-icon-btn">
                            <HomeIcon fontSize="small" />
                        </button>
                        <button type="button" onClick={() => router?.push(`/chats/${userId}`)} className="header-icon-btn">
                            <MessageIcon fontSize="small" />
                        </button>
                        <button type="button" onClick={() => router?.push("/settings")} className="header-icon-btn hidden sm:inline-flex">
                            <NotificationsIcon fontSize="small" />
                        </button>
                        <button type="button" onClick={() => setOpenDetails(!openDetails)} className="header-avatar-btn">
                            <AccountCircleIcon fontSize="small" />
                        </button>

                        {openDetails &&
                            <ClickAwayListener onClickAway={() => setOpenDetails(false)}>
                                <div className={`absolute right-0 top-14 z-20 w-[18rem] overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-2xl`}>
                                    <div className="border-b border-slate-100 px-3 py-3">
                                        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Account</p>
                                        <p className="mt-1 text-sm font-semibold text-slate-900">{role || 'user'}</p>
                                    </div>
                                    {userProfileArr && userProfileArr?.length > 0 && userProfileArr?.map((item, idx) =>
                                        <div
                                            key={idx}
                                            onClick={() => router?.push(item?.link)}
                                            className={`flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-3 transition-colors hover:bg-slate-100 ${pathName?.includes(item?.link) ? "bg-blue-50 text-blue-700" : "text-slate-700"}`}
                                        >
                                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                                                {item?.logo}
                                            </span>
                                            <p className='text-sm font-medium'>{item?.name}</p>
                                        </div>)
                                    }
                                </div>
                            </ClickAwayListener>}
                    </div>
                }
            </div>
        </header>
    )
}

export default Header
