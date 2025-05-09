import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React from 'react'
import ButtonField from '@/src/common/formfields/ButtonField'

const ChatList = (props: any) => {

    const btnCls = `!w-fit !rounded-full !text-white !px-2 !capitalize !text-xs`

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

    return (
        <Box className={`bg-[#F9FBFC] !shadow !px-1`}>

            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {props.listData && props.listData?.length > 0 ? props.listData?.slice()?.sort((a: any, b: any) => b?.lastMessage?.sentAt - a?.lastMessage?.sentAt)?.map((data: any, idx: number) =>
                    <ListItem
                        key={idx}
                        className={`${data.isNew ? `bg-[#DCE2F9]` : `${data?._id === props.openChatWindow?.clickedId ? `!bg-[#30323F] !text-white` : ``} hover:!bg-[#30323F] hover:!text-white !mb-2 !shadow-md !rounded-lg cursor-pointer`}`}
                        onClick={() => {
                            props.handleChatClick(data)
                        }}
                    >
                        <ListItemAvatar>
                            <Avatar src={``} alt={`avatar`} />
                        </ListItemAvatar>
                        <ListItemText
                            className={`!space-y-1`}
                            primary={
                                data?.participants?.filter((item: any) => item?._id !== userId)?.map((partItem: any, key: number) =>
                                    <Box display="flex" alignItems="center" justifyContent="space-between" key={key} className={`!w-full`}>
                                        <Typography component={`p`} className={`!text-[11.5px] !leading-[11.5px] !font-[InterSemiBold]`}>
                                            {partItem?.name ?? 'N/A'}
                                        </Typography>
                                        <Typography component={`p`} className={`!text-[10px]`}>
                                            {data.isNew && <Typography component={`span`} className={`!text-[11px] !leading-[11px] !font[InterMedium] `}>
                                                Today at &nbsp;
                                            </Typography>}
                                            {data?.lastMessage ? dateDiffInDays(data?.lastMessage?.sentAt, true) : 'N/A'}
                                        </Typography>
                                    </Box>
                                )
                            }
                            secondary={
                                data?.participants?.filter((item: any) => item?._id !== userId('userId'))?.map((partItem: any, key: number) =>
                                    <Box key={key} className={`space-y-2`}>
                                        <Typography component={`p`} className={`!text-[#828282] !text-[9px] !font-[InterMedium] !leading-[9px]`}>
                                            {partItem?.email ?? 'N/A'}
                                        </Typography>
                                        {data.isNew &&
                                            <Box display="flex" gap={2}>
                                                <ButtonField buttonextracls={`${btnCls} !bg-[#25AFF2]`} variant={`contained`} name={`accept`} />
                                                <ButtonField buttonextracls={`${btnCls} !bg-[#F23F42]`} variant={`contained`} name={`reject`} />
                                            </Box>
                                        }
                                    </Box>
                                )
                            }
                        />
                    </ListItem>)
                    :
                    "No Chat List"
                }
            </List>
        </Box>
    )
}

export default ChatList
