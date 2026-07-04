import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/src/redux/configureStore';
import { updateNestedField, addItem, removeItem } from '@/src/redux/profileUpdateFormReducer';
import TextFieldInput from '@/src/common/formfields/TextFieldInput';

const EducationWorkExperienceForm = () => {
    const dispatch = useDispatch();
    const { education, work_experience } = useSelector((state: RootState) => state.profileUpdate);

    return (
        <>
            <h3 className="font-semibold">Education</h3>
            {education.map((edu, idx) => (
                <div key={idx} className="grid grid-cols-3 gap-2 items-end">
                    <TextFieldInput
                        floatingLabel="Degree"
                        value={edu.degree}
                        onChange={(e: any) =>
                            dispatch(updateNestedField({ field: 'education', index: idx, subField: 'degree', value: e.target.value }))
                        }
                    />
                    <TextFieldInput
                        floatingLabel="Institution"
                        value={edu.institution}
                        onChange={(e: any) =>
                            dispatch(updateNestedField({ field: 'education', index: idx, subField: 'institution', value: e.target.value }))
                        }
                    />
                    <TextFieldInput
                        floatingLabel="Year"
                        value={edu.start_year}
                        onChange={(e: any) =>
                            dispatch(updateNestedField({ field: 'education', index: idx, subField: 'start_year', value: e.target.value }))
                        }
                    />
                    <TextFieldInput
                        floatingLabel="Year"
                        value={edu.end_year}
                        onChange={(e: any) =>
                            dispatch(updateNestedField({ field: 'education', index: idx, subField: 'end_year', value: e.target.value }))
                        }
                    />
                    <button type="button" onClick={() => dispatch(removeItem({ field: 'education', index: idx }))}>❌</button>
                </div>
            ))}
            <button type="button" onClick={() => dispatch(addItem('education'))} className="text-blue-600">+ Add Education</button>

            <h3 className="font-semibold mt-6">Work Experience</h3>
            {work_experience.map((work, idx) => (
                <div key={idx} className="grid grid-cols-3 gap-2 items-end">
                    <TextFieldInput
                        floatingLabel="Company"
                        value={work.company}
                        onChange={(e: any) =>
                            dispatch(updateNestedField({ field: 'work_experience', index: idx, subField: 'company', value: e.target.value }))
                        }
                    />
                    <TextFieldInput
                        floatingLabel="Job title"
                        value={work.job_title}
                        onChange={(e: any) =>
                            dispatch(updateNestedField({ field: 'work_experience', index: idx, subField: 'job_title', value: e.target.value }))
                        }
                    />
                    <TextFieldInput
                        floatingLabel="Start Date"
                        value={work.start_date}
                        onChange={(e: any) =>
                            dispatch(updateNestedField({ field: 'work_experience', index: idx, subField: 'start_date', value: e.target.value }))
                        }
                    />
                    <TextFieldInput
                        floatingLabel="End Date"
                        value={work.end_date}
                        onChange={(e: any) =>
                            dispatch(updateNestedField({ field: 'work_experience', index: idx, subField: 'end_date', value: e.target.value }))
                        }
                    />
                    <TextFieldInput
                        floatingLabel="Description"
                        value={work.description}
                        onChange={(e: any) =>
                            dispatch(updateNestedField({ field: 'work_experience', index: idx, subField: 'description', value: e.target.value }))
                        }
                    />
                    <button type="button" onClick={() => dispatch(removeItem({ field: 'work_experience', index: idx }))}>❌</button>
                </div>
            ))}
            <button type="button" onClick={() => dispatch(addItem('work_experience'))} className="text-blue-600">+ Add Work Experience</button>
        </>
    );
};

export default EducationWorkExperienceForm;
