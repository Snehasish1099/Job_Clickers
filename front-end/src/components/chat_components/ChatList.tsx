import { Avatar, Box, Chip, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React from 'react'

const ChatList = (props: any) => {

    const userId: any = typeof window !== 'undefined' && localStorage?.getItem('userId')

    const dateDiffInDays = (timestamp: number, onlyDate?: boolean) => {
        const dateTime = onlyDate ? new Date(timestamp)?.toLocaleDateString() : new Date(timestamp)?.toLocaleString()
        const oneDay = 24 * 3600 * 1000;
        const differenceInDays = Math?.round((new Date()?.getTime() - new Date(timestamp)?.getTime()) / oneDay);
    
        if (differenceInDays === 0) {
            return `Today`;
        }
        else if (differenceInDays === 1) {
            return `Yesterday`;
        }
        else if (differenceInDays < 7) {
            return `${differenceInDays} days ago`;
        } else {
            return `${dateTime}`
        }
    }

    const initials = (name?: string) => {
        if (!name) return 'JC';
        return name.split(' ').filter(Boolean).slice(0, 2).map(part => part[0]?.toUpperCase()).join('');
    }

    return (
        <Box className="flex h-full flex-col border-b border-slate-200 bg-white/80 lg:border-b-0 lg:border-r">
            <div className="border-b border-slate-100 px-5 py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-blue-600">Messages</p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">Inbox</h2>
                <p className="mt-1 text-sm text-slate-500">Recent conversations and unread threads.</p>
            </div>

            <List sx={{ width: '100%', flex: 1, overflowY: 'auto', bgcolor: 'transparent', p: 1.5 }}>
                {props.listData && props.listData?.length > 0 ? props.listData?.slice()?.sort((a: any, b: any) => b?.lastMessage?.sentAt - a?.lastMessage?.sentAt)?.map((data: any, idx: number) =>
                    <ListItem
                        key={idx}
                        className={`${data?._id === props.openChatWindow?.clickedId ? `!bg-slate-900 !text-white` : `!bg-white hover:!bg-slate-50`} !mb-2 !rounded-[1.4rem] !border !border-slate-200 !shadow-sm cursor-pointer transition-colors`}
                        onClick={() => {
                            props.handleChatClick(data)
                        }}
                    >
                        <ListItemAvatar>
                            <Avatar alt={`avatar`} sx={{ bgcolor: data?._id === props.openChatWindow?.clickedId ? '#fff' : '#1d4ed8', color: data?._id === props.openChatWindow?.clickedId ? '#0f172a' : '#fff' }}>
                                {initials(data?.participants?.filter((item: any) => item?._id !== userId)?.[0]?.name)}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            className={`!space-y-1`}
                            primary={
                                data?.participants?.filter((item: any) => item?._id !== userId)?.map((partItem: any, key: number) =>
                                    <Box display="flex" alignItems="center" justifyContent="space-between" key={key} className={`!w-full`}>
                                        <Typography component={`p`} className={`!text-[13px] !leading-[13px] !font-semibold`}>
                                            {partItem?.name ?? 'N/A'}
                                        </Typography>
                                        <Typography component={`p`} className={`!text-[11px] ${data?._id === props.openChatWindow?.clickedId ? '!text-slate-200' : '!text-slate-500'}`}>
                                            {data?.lastMessage ? dateDiffInDays(data?.lastMessage?.sentAt, true) : 'N/A'}
                                        </Typography>
                                    </Box>
                                )
                            }
                            secondary={
                                data?.participants?.filter((item: any) => item?._id !== userId)?.map((partItem: any, key: number) =>
                                    <Box key={key} className={`space-y-2`}>
                                        <Typography component={`p`} className={`!mt-1 !text-[12px] ${data?._id === props.openChatWindow?.clickedId ? '!text-slate-200' : '!text-slate-500'}`}>
                                            {partItem?.email ?? 'N/A'}
                                        </Typography>
                                        <Chip
                                            size="small"
                                            label={data?.lastMessage?.message ? data.lastMessage.message.slice(0, 45) : 'No messages yet'}
                                            className={`!mt-2 !max-w-full !rounded-full ${data?._id === props.openChatWindow?.clickedId ? '!bg-white/10 !text-white' : '!bg-slate-100 !text-slate-600'}`}
                                        />
                                    </Box>
                                )
                            }
                        />
                    </ListItem>)
                    :
                    <div className="px-5 py-10 text-center">
                        <p className="text-sm font-medium text-slate-900">No conversations yet</p>
                        <p className="mt-1 text-xs text-slate-500">Start a chat from a job or employer profile.</p>
                    </div>
                }
            </List>
        </Box>
    )
}

export default ChatList
