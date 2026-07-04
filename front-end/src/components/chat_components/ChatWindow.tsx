import React, { useEffect, useRef } from 'react'
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography, Badge, styled } from '@mui/material'
import { AttachFile, SendRounded, KeyboardArrowDown } from '@mui/icons-material'
import TextFieldInput from '@/src/common/formfields/TextFieldInput'

const ChatWindow = (props: any) => {

    const userId: any = typeof window !== 'undefined' && localStorage?.getItem('userId')

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }));

    const chatBoxCls = `!h-fit px-5 rounded-3xl !w-[fit] !max-w-[32em] !py-3`
    const chatCls = `!text-[14px] !leading-[22px]`

    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => { scrollToBottom() }, [props.userChats])
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const sendMessage = async () => {
        if (props.text !== '') {
            await props.sendMessageAndRefresh(props.saveAccData?.userId, props.text)
        }
    }

    return (
        <Box className={`relative flex h-full flex-col bg-gradient-to-br from-white via-slate-50 to-blue-50/30`}>
            <Box className={`border-b border-slate-200 bg-white/80 px-5 py-4 backdrop-blur`}>
                <Box className={`flex items-center justify-between gap-4`}>
                    <List sx={{ width: '100%', maxWidth: 420, bgcolor: 'transparent', p: 0 }}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar alt={`Profile image`} sx={{ bgcolor: '#1d4ed8', color: '#fff' }}>
                                    {props.saveAccData && Object.keys(props.saveAccData)?.length > 0 ? props.saveAccData?.name?.[0]?.toUpperCase() : 'J'}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                className={`space-y-2`}
                                primary={
                                    <Typography component={`p`} className={`!text-[13px] !leading-[13px] !text-slate-900 !font-semibold`}>
                                        {props.saveAccData && Object?.keys(props.saveAccData)?.length > 0 ? props.saveAccData?.name : `Albert S. Gilbert`}
                                    </Typography>
                                }
                                secondary={
                                    <Typography component={`p`} className={`!text-[12px] !leading-[9px] !text-slate-500`}>
                                        {`Last seen recently`}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    </List>
                    <KeyboardArrowDown className={`!cursor-pointer !text-slate-500`} />
                </Box>
            </Box>

            <Box className={`flex-1 px-5 py-5 overflow-y-auto !overflow-x-hidden`}>
                {props.userChats && props.userChats?.length > 0 && props.userChats?.map((data: any, idx: number) =>
                    <Box key={idx} className={`space-y-1`}>
                        <Box className={`flex mt-4 ${data?.from?._id === userId && `!justify-end`}`}>
                            {data?.from?._id !== userId &&
                                <Box className={`relative`}>
                                    <StyledBadge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        variant="dot"
                                    >
                                        <Avatar alt={`profile`} />
                                    </StyledBadge>
                                </Box>
                            }
                            <Box className={`flex !flex-col`} gap={1}>
                                <Box className={`space-y-1`} >
                                    <Box className={`flex items-center ${chatBoxCls} ${data.from?._id === userId ? `bg-slate-900 !text-white` : `bg-white !text-slate-800 border border-slate-200`}`}>
                                        <Typography component={`p`} className={`space-y-1 ${chatCls}`}>
                                            {data?.message}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                        </Box>
                        <Box className={`flex w-full ${data?.to?._id === userId ? `!ms-12 !justify-start` : `!justify-end !pr-2`}`}>
                            <Typography component={`p`} className={`!text-[12px] !leading-[13px] !text-slate-500`}>
                                {data?.readStatus && data?.from?._id === userId && `Seen`}&nbsp;
                                {data?.sentAt ? `${new Date(data?.sentAt)?.toLocaleString()}` : 'N/A'}
                            </Typography>
                        </Box>
                    </Box>
                )}
                <Box ref={messagesEndRef}></Box>
            </Box>

            {/* Text field to send messages  */}
            <Box className={`border-t border-slate-200 bg-white/85 px-5 py-4 backdrop-blur`}>
                <Box className={`flex items-center relative !h-full`}>
                    <TextFieldInput
                        onlyValue
                        textnewclass={`w-full !rounded-full !shadow-md`}
                        InputProps={{
                            sx: {
                                borderRadius: '50px'
                            }
                        }}
                        placeholder={"Type your message"}
                        onChange={props.handleTextChange}
                        value={props.text}
                        clickEnter={() => {
                            sendMessage()
                        }}
                    />
                    <Box className={`flex items-center absolute !right-2 !h-full`} gap={2}>
                        <AttachFile className={`cursor-pointer`} />
                        <Box className={`flex items-center w-full rounded-full bg-slate-900 p-2 cursor-pointer transition-colors hover:bg-slate-800`}>
                            <SendRounded
                                className={`!text-white`}
                                fontSize='small'
                                onClick={sendMessage}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ChatWindow
