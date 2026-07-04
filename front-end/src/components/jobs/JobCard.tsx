import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const JobCard = (props: any) => {
    return (
        <div
            onClick={props.jobCardClick}
            className={`bg-white border rounded-md p-4 mb-3 shadow-sm hover:shadow-md cursor-pointer transition-all duration-150 ${props.jobCardCls}`}
        >
            <h3 className="text-lg font-medium text-blue-700">{props.jobData.title}</h3>
            <p className="text-sm text-gray-600">{props.jobData.company}</p>
            <div className="flex items-center text-xs text-gray-600 mt-1">
                <LocationOnIcon fontSize="small" />
                <span>{props.jobData.location}</span>
            </div>
            <div className="text-xs text-gray-600 mt-1 capitalize">{"Upto Rs."}&nbsp;{props.jobData.salary}</div>
            
        </div>);
};

export default JobCard;
