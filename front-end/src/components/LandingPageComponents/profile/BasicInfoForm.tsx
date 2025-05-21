'use client';

import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import TextFieldInput from '@/src/common/formfields/TextFieldInput';
import PhoneInputField from '@/src/common/formfields/PhoneInputField';

const BasicInfoForm = () => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <>
            <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                    <TextFieldInput
                        floatingLabel="Full Name"
                        textnewclass="w-full"
                        {...field}
                    />
                )}
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}

            <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <TextFieldInput
                        floatingLabel="Email"
                        disabled
                        textnewclass="w-full"
                        {...field}
                    />
                )}
            />

            <Controller
                name="phone_number"
                control={control}
                render={({ field }) => (
                    <PhoneInputField
                        disabled
                        defaultCountry="in"
                        label="Phone Number"
                        value={field.value}
                        onChange={field.onChange}
                        extraCls="!w-full text-sm mt-[0.45rem]"
                        inputCls="!w-full h-[3.3rem] cursor-default"
                    />
                )}
            />

            <Controller
                name="headline"
                control={control}
                render={({ field }) => (
                    <TextFieldInput
                        floatingLabel="Headline"
                        textnewclass="w-full"
                        {...field}
                    />
                )}
            />

            <Controller
                name="location"
                control={control}
                render={({ field }) => (
                    <TextFieldInput
                        floatingLabel="Location"
                        textnewclass="w-full"
                        {...field}
                    />
                )}
            />
        </>
    );
};

export default BasicInfoForm;
