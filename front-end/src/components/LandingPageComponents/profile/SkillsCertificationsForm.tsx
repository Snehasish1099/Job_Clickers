import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/src/redux/configureStore';
import { updateField, addItem, removeItem } from '@/src/redux/profileUpdateFormReducer';
import TextFieldInput from '@/src/common/formfields/TextFieldInput';

const SkillsCertificationsForm = () => {
    const dispatch = useDispatch();
    const { skills, certifications } = useSelector((state: RootState) => state.profileUpdate);

    const handleSkillChange = (value: string, index: number) => {
        const updatedSkills = [...skills];
        updatedSkills[index] = value;
        dispatch(updateField({ field: 'skills', value: updatedSkills }));
    };

    const handleCertificationChange = (value: string, index: number) => {
        const updatedCertifications = [...certifications];
        updatedCertifications[index] = value;
        dispatch(updateField({ field: 'certifications', value: updatedCertifications }));
    };

    return (
        <>
            <h3 className="font-semibold">Skills</h3>
            {skills.map((skill, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                    <TextFieldInput
                        floatingLabel={`Skill ${idx + 1}`}
                        value={skill}
                        onChange={(e: any) => handleSkillChange(e.target.value, idx)}
                        textnewclass="w-full"
                    />
                    <button type="button" onClick={() => dispatch(removeItem({ field: 'skills', index: idx }))}>❌</button>
                </div>
            ))}
            <button type="button" onClick={() => dispatch(addItem('skills'))} className="text-blue-600">+ Add Skill</button>

            <h3 className="font-semibold mt-6">Certifications</h3>
            {certifications.map((cert, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                    <TextFieldInput
                        floatingLabel={`Certification ${idx + 1}`}
                        value={cert}
                        onChange={(e: any) => handleCertificationChange(e.target.value, idx)}
                        textnewclass="w-full"
                    />
                    <button type="button" onClick={() => dispatch(removeItem({ field: 'certifications', index: idx }))}>❌</button>
                </div>
            ))}
            <button type="button" onClick={() => dispatch(addItem('certifications'))} className="text-blue-600">+ Add Certification</button>
        </>
    );
};

export default SkillsCertificationsForm;
