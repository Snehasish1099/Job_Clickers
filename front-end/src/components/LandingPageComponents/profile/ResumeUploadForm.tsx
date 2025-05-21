'use client';

import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';

const ResumeUploadForm = () => {
    const { control } = useFormContext();

    return (
        <Controller
            name="resume"
            control={control}
            render={({ field: { onChange } }) => (
                <div>
                    <label className="block text-sm font-medium text-gray-700">Resume (PDF)</label>
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => onChange(e.target.files?.[0])}
                        className="w-full mt-2"
                    />
                </div>
            )}
        />
    );
};

export default ResumeUploadForm;
