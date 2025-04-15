"use client"

import React, { useState } from 'react'
import Image from 'next/image';
import Logo from '@/src/images/job_clicker_logo.jpg'
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { SearchOutlined } from '@mui/icons-material'
import WorkIcon from '@mui/icons-material/Work';
import { usePathname, useRouter } from 'next/navigation';
import TextFieldInput from '@/src/common/formfields/TextFieldInput';
import { ClickAwayListener } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import './index.css'

const Header = (props: any) => {

    const router = useRouter()
    const pathName = usePathname()

    const [openDetails, setOpenDetails] = useState(false)
    const userProfileArr = [
        { name: 'View Profile', logo: <AccountCircleIcon />, link: '/profile' },
        { name: 'Settings', logo: <AccountCircleIcon />, link: '/settings' },
        { name: 'Sign Out', logo: <LogoutIcon />, link: '/login' },
    ]

    return (
        <div className='bg-blue-800 h-16 w-full flex justify-between items-center px-[3%] gap-5 '>
            <Image src={Logo} alt="logo" className='cursor-pointer' height={75} width={75} />

            <TextFieldInput
                srchCls={'searchClass w-2/5 rouned-md !border-0'}
                fullWidth
                endAdornment={<SearchOutlined />}
                textnewclass={'bg-white w-full rounded-full'}
                handleChange={() => props.handleChange()}
            />

            {localStorage?.getItem('token') &&
                <div className={`w-1/5 flex items-center justify-between cursor-pointer relative`}>
                    <HomeIcon className='text-white' onClick={() => router?.push("/home")} />
                    <WorkIcon className='text-white' onClick={() => router?.push("/home")} />
                    <MessageIcon className='text-white' onClick={() => router?.push("/home")} />
                    <NotificationsIcon className='text-white' onClick={() => router?.push("/home")} />
                    <AccountCircleIcon className='text-white' onClick={() => setOpenDetails(!openDetails)} />

                    {openDetails &&
                        <ClickAwayListener onClickAway={() => setOpenDetails(false)}>
                            <div className={`w-[65%] bg-white border-x border-b p-2 shadow-md rounded-b absolute top-11 right-0 z-20 h-fit overflow-hidden hover:overflow-y-auto`}>
                                {userProfileArr.map((item, idx) =>
                                    <div
                                        key={idx}
                                        onClick={() => router?.push(item?.link)}
                                        className={`flex cursor-pointer justify-start items-center gap-2 p-2 ${pathName?.includes(item?.link) ? "bg-green-400 text-white" : "text-black"}`}
                                    >
                                        {item?.logo}
                                        <p className='text-base'>{item?.name}</p>
                                    </div>)
                                }
                            </div>
                        </ClickAwayListener>}
                </div>
            }
        </div>
    )
}

export default Header