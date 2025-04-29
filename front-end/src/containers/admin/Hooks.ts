import { doGetApiCall } from "@/src/utils/ApiConfig"
import { useDispatch } from "react-redux"


export const AdminHooks = () => {
    const dispatch = useDispatch()

    /**
    * @method GET
    * @description - Gets All User Detils
    */
    const getAllUsersApiCall = async () => {
        const data = {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/admin/users`,
        }
        const res: any = await doGetApiCall(data)
        if (res?.status === 200) {
            // dispatch( (res?.user))
        } else {
            // dispatch( ([]))
        }
    }

    return {
        getAllUsersApiCall
    }
}