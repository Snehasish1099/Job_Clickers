import { doGetApiCall, doPutApiCall } from "@/src/utils/ApiConfig"
// import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { employerGetApplicationsByJob, userApplicationReducer } from "./applicationReducer"

export const ApplicationHooks = () => {
    const dispatch = useDispatch()
    // const router = useRouter()

    /**
     * @method POST
     * @description Apply for a job
     */
    const applyForJobApiCall = async (jobId: string, resume: File | any) => {
        try {

            if (!resume) {
                alert("Please upload a resume before applying.");
                return;
            }

            const formData = new FormData();
            formData.append("resume", resume);

            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/applications/${jobId}/apply`, {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `${localStorage.getItem("token")}`
                }
            });

            const data = await res.json();

            if (res.status === 201) {
                await getApplicationsApiCall();
                console.log("Application submitted successfully.");
            } else {
                console.log(data.error);
            }

        } catch (error: any) {
            return {
                status: 500,
                error: error.message
            };
        }
    };

    /**
     * @method GET
     * @description Get applications by UserId (User only)
     */
    const getApplicationsApiCall = async () => {
        const data = {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/applications/users/applied`
        }
        const res: any = await doGetApiCall(data)
        if (res?.status === 200) {
            dispatch(userApplicationReducer(res?.data))
        } else {
            dispatch(userApplicationReducer([]))
        }
    }

    /**
     * @method GET
     * @description Get applications by job ID (Employer-only)
     */
    const getApplicationsByJobIdApiCall = async (jobId: string) => {
        const data = {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/applications/${jobId}`
        }
        const res: any = await doGetApiCall(data)
        if (res?.status === 200) {
            dispatch(employerGetApplicationsByJob(res?.data))
        } else {
            dispatch(employerGetApplicationsByJob([]))
        }
    }

    /**
     * @method PUT
     * @description Update application status (Employer-only)
     */
    const updateApplicationStatusApiCall = async (applicationId: string, status: string) => {
        const data = {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/applications/${applicationId}/status`,
            bodyData: { status }
        }
        const res: any = await doPutApiCall(data)
        return res
    }

    return {
        applyForJobApiCall,
        getApplicationsApiCall,
        getApplicationsByJobIdApiCall,
        updateApplicationStatusApiCall
    }
}
