'use client';

import ChatList from '@/src/components/chat_components/ChatList'
import { Box, Grid } from '@mui/material'
import React from 'react'
import { ChatHooks } from './Hooks'
import ChatWindow from '@/src/components/chat_components/ChatWindow';

const ChatIndex = () => {

  const { chatList, openChatWindow, handleChatClick, chatDetail, saveAccData, postMessageApiCall, text, handleTextChange } = ChatHooks()

  console.log(openChatWindow, "# openChatWindow")

  return (
    <Box className={`w-full`}>
      <Grid container className={`bg-white shadow-lg`}>
        <Grid size={{ xs: 4 }}>
          <ChatList
            listData={chatList}
            openChatWindow={openChatWindow}
            handleChatClick={handleChatClick}
          />
        </Grid>
        <Grid size={{ xs: 8 }}>
          {openChatWindow?.open &&
            //  chatDetail?.every((item: any) => item?.chat === openChatWindow?.clickedId) &&
            <ChatWindow
              saveAccData={saveAccData}
              userChats={chatDetail}
              postMessageApiCall={postMessageApiCall}
              text={text}
              handleTextChange={handleTextChange}
            />
          }
        </Grid>
      </Grid>
    </Box>
  )
}

export default ChatIndex