import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { chatDetailsReducer, chatListReducer, setAccDataReducer, setOpenChatWindowReducer } from './chatReducer'
import { useRouter } from 'next/navigation'
import { RootState } from '@/src/redux/configureStore'
import { doGetApiCall, doPostApiCall } from '@/src/utils/ApiConfig'

export const ChatHooks = () => {

    const dispatch = useDispatch()
    const token: any = typeof window !== 'undefined' && localStorage?.getItem('token')
    const userId: any = typeof window !== 'undefined' && localStorage?.getItem('userId')


    const chatList: any = useSelector((state: RootState) => state?.chat?.chatLists)
    const chatDetail: any = useSelector((state: RootState) => state?.chat?.chatDetails)
    const router = useRouter()

    const [text, setText] = useState('')
    const handleTextChange = (e: any) => {
        setText(e.target.value)
    }

    // For saving the data of a chat when any of the chats is clicked 
    const saveAccData: any = useSelector((state: RootState) => state?.chat?.accData)
    const openChatWindow: any = useSelector((state: RootState) => state?.chat?.openChatWindow)

    const handleChatClick = async (data: any) => {
        console.log(data, "# data")

        dispatch(setOpenChatWindowReducer({ open: true, clickedId: data?._id ?? '' }))
        if (data && Object?.keys(data)?.length > 0 && data?._id && data?.lastMessage) {
            console.log("# handleChatClick if condition")

            await getChatDetailsApiCall(data?._id)
            const saveAccDetails = data?.participants?.filter((item: any) => item?._id !== userId)
            console.log(saveAccDetails, "# saveAccDetails")
            dispatch(setAccDataReducer({
                name: saveAccDetails[0]?.name,
                email: saveAccDetails[0]?.email,
                phoneNo: saveAccDetails[0]?.phoneNo,
                userId: saveAccDetails[0]?._id
            }))
            readMessageStatusApiCall(data?._id)
        }
        else {
            console.log("# handleChatClick else condition")

            getChatDetailsApiCall(data?._id)
            dispatch(chatDetailsReducer(null))
            dispatch(setAccDataReducer({
                name: data?.name ? data?.name : 'N/A',
                email: data?.email ? data?.email : 'N/A',
                phoneNo: data?.phoneNo ? data?.phoneNo : 'N/A',
                userId: data?._id ? data?._id : 'N/A'
            }))
        }
    }

    const onMessageClick = async (item: any) => {
        console.log(item, "# item")

        if (token) {
            await getMessageListApiCall().then((res: any) => {
                console.log(res, "# res")

                const chatData = item?.createdBy && Object?.keys(item?.createdBy)?.length > 0 && item?.createdBy?._id ?
                    res?.result?.filter((chatItem: any) => chatItem?.participants?.some((participant: any) => participant?._id === item?.createdBy?._id))
                    :
                    res?.result?.filter((chatItem: any) => chatItem?.participants?.some((participant: any) => participant?._id === item?._id))

                console.log(chatData, '# chatData')

                if (chatData && chatData?.length > 0 && Object?.keys(chatData[0])?.length > 0 && chatData[0]?.lastMessage) {
                    handleChatClick(chatData[0])
                } else {
                    handleChatClick(item?.createdBy && Object?.keys(item?.createdBy)?.length > 0 ? item?.createdBy : item)
                }

                router?.push(`/chats/${userId}`)

            }).catch((err: any) => console.log(err))
        } else {
            router?.push('/login')
        }
    }

    /**   
    *@description- This function is used for starting conversation with others
    **/
    const postMessageApiCall = async (receiverId: string, text: string) => {
        const data: any = {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/chats/send/message`,
            bodyData: {
                to: receiverId,
                message: text,
                // file: {
                //     "name": "string",
                //     "key": "string",
                //     "mimetype": "string",
                //     "location": "string",
                //     "size": 0
                // }
            }
        }
        const res: any = await doPostApiCall(data)
        console.log(res, "# postMessageApiCall")
    }


    /**
  *@description- This function is used for making api call for getting chats
  **/
    const getMessageListApiCall = async () => {
        const data = {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/chats/all?dataPerPage=50`
        }
        const res: any = await doGetApiCall(data)
        // chatListReducer
        console.log(res, "# getMessageListApiCall")
    }

    /**
    * @description this function is used to debounce search results for chatbox.
    */
    //   const handleSearchString = (data) => {
    //     setChatSearchString(data)
    //   }
    //   const debounceSearch = _.debounce(handleSearchString, 500)
    //   const handleSearchChat = (e) => {
    //     debounceSearch(e.target.value)
    //   }


    /**
    *@description- This function is used for making api call for getting chats
    **/
    const getChatDetailsApiCall = async (chatId: string) => {
        const data = {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/chats/messages/${chatId}?dataPerPage=50`
        }

        const res: any = await doGetApiCall(data)
        console.log(res, "# getChatDetailsApiCall")
    }


    /**   
   *@description- This function is used for chatting with others
   **/
    const readMessageStatusApiCall = async (chatId: string) => {
        const data = {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/chats/read/status`,
            bodyData: {
                chatId: parseInt(chatId),
            }
        }

        const res: any = await doGetApiCall(data)
        console.log(res, "# readMessageStatusApiCall")

    }
    return {
        postMessageApiCall,
        text,
        handleTextChange,
        getMessageListApiCall,
        chatList,
        getChatDetailsApiCall,
        chatDetail,
        saveAccData,
        openChatWindow,
        handleChatClick,
        onMessageClick,
    }
}