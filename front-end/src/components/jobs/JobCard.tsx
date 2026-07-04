import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const JobCard = (props: any) => {
    return (
        <div
            onClick={props.jobCardClick}
            className={`group rounded-[1.5rem] border border-slate-200 bg-white/95 p-4 shadow-[0_12px_40px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(15,23,42,0.12)] cursor-pointer ${props.jobCardCls}`}
        >
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h3 className="text-base font-semibold tracking-tight text-slate-900">{props.jobData.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">{props.jobData.company}</p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-700 transition-transform group-hover:translate-x-0.5">
                    <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
                </div>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                <LocationOnIcon fontSize="small" />
                <span>{props.jobData.location}</span>
            </div>
            <div className="mt-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                Upto Rs. {props.jobData.salary}
            </div>
        </div>);
};

export default JobCard;
