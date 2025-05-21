'use client';

import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import TextFieldInput from '@/src/common/formfields/TextFieldInput';

const DynamicInputList = ({ name, label }: { name: string; label: string }) => {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({ control, name });

    return (
        <div className="space-y-2">
            <label className="block font-semibold">{label}</label>
            {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                    <TextFieldInput
                        value={field.name}
                        onChange={(e) => control.setValue(`${name}[${index}].name`, e.target.value)}
                        textnewclass="w-full"
                    />
                    <button type="button" onClick={() => remove(index)} className="text-red-600 font-bold">X</button>
                </div>
            ))}
            <button type="button" onClick={() => append({ name: '' })} className="text-blue-600 text-sm">+ Add {label}</button>
        </div>
    );
};

const SkillsCertificationsForm = () => (
    <>
        <DynamicInputList name="skills" label="Skills" />
        <DynamicInputList name="certifications" label="Certifications" />
    </>
);

export default SkillsCertificationsForm;
