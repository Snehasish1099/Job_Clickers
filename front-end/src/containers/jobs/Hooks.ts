import { doGetApiCall, doPostApiCall } from "@/src/utils/ApiConfig"
import { useDispatch } from "react-redux"
import { allJobReducer } from "./jobReducer"
import { useRouter } from "next/navigation"

export const JobHooks = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    /**
    * @method POST
    * @description - Create job 
    */
    const createJobApiCall = async (formData: any, dataReset: any) => {
        const data = {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/jobs`,
            bodyData: {
                title: formData?.title,
                company: formData?.company,
                location: formData?.location,
                description: formData?.description,
                salary: formData?.salary,
                job_type: formData?.job_type
                // postedBy: ""
            }
        }
        const res: any = await doPostApiCall(data)
        if (res?.status === 201) {
            getAllJobsApiCall()
            dataReset()
            router?.push('/employer/jobs/manage')
        } else {

        }
    }

    /**
    * @method GET
    * @description - Get all jobs
    */
    const getAllJobsApiCall = async () => {
        const data = {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/jobs`,
        }
        const res: any = await doGetApiCall(data)
        if (res?.status === 200) {
            dispatch(allJobReducer(res?.data))
        } else {
            dispatch(allJobReducer([]))
        }
    }

    return {
        createJobApiCall,
        getAllJobsApiCall
    }
}