import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateField } from '@/src/redux/profileUpdateFormReducer';
import { RootState } from '@/src/redux/configureStore';
import TextFieldInput from '@/src/common/formfields/TextFieldInput';
import PhoneInputField from '@/src/common/formfields/PhoneInputField';

const BasicInfoForm = () => {
    const dispatch = useDispatch();
    const formData = useSelector((state: RootState) => state.profileUpdate);

    return (
        <>
            <TextFieldInput
                floatingLabel="Full Name"
                value={formData.name}
                onChange={(e: any) => dispatch(updateField({ field: 'name', value: e.target.value }))}
                textnewclass="w-full"
            />
            <TextFieldInput
                floatingLabel="Email"
                value={formData.email}
                disabled
                textnewclass="w-full"
            />
            <PhoneInputField
                disabled
                defaultCountry="in"
                label="Phone Number"
                value={formData.phone_number}
                onChange={(value: string) => dispatch(updateField({ field: 'phone_number', value }))}
                extraCls="!w-full text-sm mt-[0.45rem]"
                inputCls="!w-full h-[3.3rem] cursor-default"
            />
            <TextFieldInput
                floatingLabel="Headline"
                value={formData.headline}
                onChange={(e: any) => dispatch(updateField({ field: 'headline', value: e.target.value }))}
                textnewclass="w-full"
            />
            <TextFieldInput
                floatingLabel="Location"
                value={formData.location}
                onChange={(e: any) => dispatch(updateField({ field: 'location', value: e.target.value }))}
                textnewclass="w-full"
            />
        </>
    );
};

export default BasicInfoForm;
