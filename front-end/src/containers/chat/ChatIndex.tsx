'use client';

import ChatList from '@/src/components/chat_components/ChatList'
import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { ChatHooks } from './Hooks'
import ChatWindow from '@/src/components/chat_components/ChatWindow';

const ChatIndex = () => {

  const { chatList, openChatWindow, handleChatClick, chatDetail, saveAccData, text, handleTextChange, getMessageListApiCall, syncActiveThread, sendMessageAndRefresh } = ChatHooks()

  useEffect(() => {
    getMessageListApiCall()
  }, [])

  useEffect(() => {
    if (!openChatWindow?.open || !saveAccData?.userId) {
      return;
    }

    const refresh = async () => {
      await syncActiveThread(saveAccData.userId);
    };

    refresh();
    const intervalId = window.setInterval(refresh, 5000);

    return () => window.clearInterval(intervalId);
  }, [openChatWindow?.open, saveAccData?.userId]);

  return (
    <Box className="mx-auto w-full max-w-7xl px-3 py-6 sm:px-4 lg:px-6">
      <div className="glass-panel soft-shadow grid min-h-[calc(100vh-8rem)] overflow-hidden rounded-[2rem] border border-white/70 lg:grid-cols-[360px_minmax(0,1fr)]">
        <ChatList
          listData={chatList}
          openChatWindow={openChatWindow}
          handleChatClick={handleChatClick}
        />
        <div className="bg-slate-50/70">
          {openChatWindow?.open ? (
            <ChatWindow
              saveAccData={saveAccData}
              userChats={chatDetail}
              sendMessageAndRefresh={sendMessageAndRefresh}
              text={text}
              handleTextChange={handleTextChange}
            />
          ) : (
            <div className="flex h-full items-center justify-center px-8 py-10 text-center">
              <div className="max-w-md rounded-[2rem] border border-dashed border-slate-200 bg-white p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-blue-600">Chats</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Open a conversation</h2>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Select a thread on the left or start one from a job detail page to begin messaging.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Box>
  )
}

export default ChatIndex
