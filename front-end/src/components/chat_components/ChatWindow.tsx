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

    const chatBoxCls = `!h-fit  px-5 rounded-3xl !w-[fit] !max-w-[30em] !py-2`
    const chatCls = `!font-[InterRegular] !text-[14.5px] !leading-[21.75px]`

    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => { scrollToBottom() }, [props.userChats])
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <Box className={`bg-white relative`}>
            <Box className={`h-[5rem] flex items-center`}>
                <Box className={`!w-full flex justify-between items-center shadow-lg px-5`}>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar src={``} alt={`Profile image`} />
                            </ListItemAvatar>
                            <ListItemText
                                className={`space-y-2`}
                                primary={
                                    <Typography component={`p`} className={`!text-[13px] !leading-[13px] !text-[#333333] !font-[InterSemiBold]`}>
                                        {props.saveAccData && Object?.keys(props.saveAccData)?.length > 0 ? props.saveAccData?.name : `Albert S. Gilbert`}
                                    </Typography>
                                }
                                secondary={
                                    <Typography component={`p`} className={`!text-[12px] !leading-[9px] !text-[#828282] !font-[InterMedium]`}>
                                        {`Last seen 3 hours ago`}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    </List>
                    <KeyboardArrowDown className={`!cursor-pointer`} />
                </Box>
            </Box>

            <Box className={`mt-5 px-5 h-[55vh] overflow-y-auto !overflow-x-hidden`}>
                {props.userChats && props.userChats?.length > 0 && props.userChats?.map((data: any, idx: number) =>
                    <Box key={idx} className={`space-y-1`}>
                        <Box className={`flex mt-5 ${data?.sender?._id === userId && `!justify-end`}`}>
                            {data?.sender?._id !== userId &&
                                <Box className={`relative`}>
                                    <StyledBadge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        variant="dot"
                                    >
                                        <Avatar src={``} alt={`profile`} />
                                    </StyledBadge>
                                </Box>
                            }
                            <Box className={`flex !flex-col`} gap={1}>
                                <Box className={`space-y-1`} >
                                    <Box className={`flex items-center ${chatBoxCls} ${data.sender?._id === userId ? `bg-[#25AFF2] !text-white` : `bg-[#ECF7FE] !text-[#354052]`}`}>
                                        <Typography component={`p`} className={`space-y-1 ${chatCls}`}>
                                            {data?.message}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                        </Box>
                        <Box className={`flex w-full ${data?.receiver?._id === userId ? `!ms-12 !justify-start` : `!justify-end !pr-2`}`}>
                            <Typography component={`p`} className={`!font-[InterRegular] !text-[12px] !leading-[13px] !text-[#919BB0]`}>
                                {data?.readStatus && data?.receiver?._id === userId && `Seen`}&nbsp;
                                {data?.sentAt ? `${new Date(data?.sentAt)?.toLocaleString()}` : 'N/A'}
                            </Typography>
                        </Box>
                    </Box>
                )}
                <Box ref={messagesEndRef}></Box>
            </Box>

            {/* Text field to send messages  */}
            <Box className={`absolute bottom-0 px-5 !py-2 w-full z-10 bg-white !border-t`}>
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
                            if (props.text !== '') {
                                props.postMessageApiCall(props.saveAccData?.userId, props.text)
                            }
                        }}
                    />
                    <Box className={`flex items-center absolute !right-2 !h-full`} gap={2}>
                        <AttachFile className={`cursor-pointer`} />
                        <Box className={`flex items-center w-full bg-[#25AFF2] !rounded-full p-2 cursor-pointer`}>
                            <SendRounded
                                className={`!text-white`}
                                fontSize='small'
                                onClick={() => {
                                    if (props.text !== '') {
                                        props.postMessageApiCall(props.saveAccData?.userId, props.text)
                                    }
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ChatWindow