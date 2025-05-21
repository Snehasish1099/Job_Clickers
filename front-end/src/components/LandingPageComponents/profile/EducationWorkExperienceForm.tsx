'use client';

import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import TextFieldInput from '@/src/common/formfields/TextFieldInput';

const MultiFieldGroup = ({ name, fieldsConfig }: any) => {
    const { control, setValue } = useFormContext();
    const { fields, append, remove } = useFieldArray({ control, name });

    return (
        <div className="space-y-2">
            <label className="block font-semibold">{name.replace('_', ' ')}</label>
            {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-end">
                    {fieldsConfig.map((conf: string) => (
                        <TextFieldInput
                            key={conf}
                            floatingLabel={conf}
                            value={field[conf]}
                            onChange={(e) => setValue(`${name}[${index}].${conf}`, e.target.value)}
                            textnewclass="w-full"
                        />
                    ))}
                    <button type="button" onClick={() => remove(index)} className="text-red-600 font-bold">X</button>
                </div>
            ))}
            <button type="button" onClick={() => append(Object.fromEntries(fieldsConfig.map((f: string) => [f, ''])))} className="text-blue-600 text-sm">+ Add {name}</button>
        </div>
    );
};

const EducationWorkExperienceForm = () => (
    <>
        <MultiFieldGroup name="education" fieldsConfig={['degree', 'institution', 'year']} />
        <MultiFieldGroup name="work_experience" fieldsConfig={['company', 'role', 'duration']} />
    </>
);

export default EducationWorkExperienceForm;
