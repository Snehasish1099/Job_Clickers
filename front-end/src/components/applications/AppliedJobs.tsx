"use client"

import React, { useEffect } from "react";
import { ApplicationHooks } from "@/src/containers/applications/Hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/configureStore";

const AppliedJobs: React.FC = () => {

    const { getApplicationsApiCall, } = ApplicationHooks()

    useEffect(() => {
        getApplicationsApiCall();
    }, []);

    const user_applications: any = useSelector((state: RootState) => state.application.applications)

    return (
        <div className="p-6 bg-white rounded-xl shadow-md w-full max-w-4xl mx-auto my-10">
            <h2 className="text-2xl font-semibold mb-4">My Applied Jobs</h2>

            {user_applications.length === 0 ? (
                <p>No job applications found.</p>
            ) : (
                <ul className="space-y-4">
                    {user_applications?.map((app: any) => (
                        <li key={app._id} className="border rounded-lg p-4 flex flex-col md:flex-row md:justify-between items-start md:items-center">
                            <div>
                                <h3 className="text-lg font-medium">{app.jobId.title}</h3>
                                <p className="text-sm text-gray-600">{app.jobId.company}</p>
                                <p className="text-sm text-gray-600">{app.jobId.location}</p>
                                <p className="text-sm text-gray-500">{"Applied on:"}&nbsp;{new Date(app.createdAt).toLocaleString()}</p>
                            </div>
                            <span
                                className={`px-3 py-1 text-sm rounded-full capitalize ${app.status === "pending" ? "bg-yellow-100 text-yellow-600"
                                    : app.status === "accepted" ?
                                        "bg-green-100 text-green-600"
                                        :
                                        "bg-red-100 text-red-600"
                                    }`}
                            >
                                {app.status}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AppliedJobs;
