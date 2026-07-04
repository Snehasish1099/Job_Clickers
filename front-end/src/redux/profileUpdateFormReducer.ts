import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  name: string;
  email: string;
  phone_number: string;
  headline: string;
  location: string;
  skills: string[]
  certifications: string[]
  education: { degree: string; institution: string; start_year: string, end_year: string }[];
  work_experience: { job_title: string, company: string; description: string; start_date: string, end_date: string }[];
}

const initialState: FormState = {
  name: '',
  email: '',
  phone_number: '',
  headline: '',
  location: '',
  skills: [""],
  certifications: [""],
  education: [{
    institution: "",
    degree: "",
    start_year: "",
    end_year: ""
  }],
  work_experience: [{
    job_title: "",
    company: "",
    start_date: "",
    end_date: "",
    description: ""
  }],
};

const profileUpdateFormSlice = createSlice({
  name: 'profileUpdateForm',
  initialState,
  reducers: {
    setInitialForm: (state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload };
    },
    updateField: (state, action: PayloadAction<{ field: keyof FormState; value: any }>) => {
      state[action.payload.field] = action.payload.value;
    },
    updateNestedField: (state, action: PayloadAction<{ field: keyof FormState; index: number; subField: string; value: any }>) => {
      const array = state[action.payload.field] as any[];
      if (array[action.payload.index]) {
        array[action.payload.index][action.payload.subField] = action.payload.value;
      }
    },
    addItem: (state, action: PayloadAction<keyof FormState>) => {
      const field = action.payload;

      switch (field) {
        case "skills":
          state.skills.push("");
          break;
        case "certifications":
          state.certifications.push("");
          break;
        case "education":
          state.education.push({
            institution: "",
            degree: "",
            start_year: "",
            end_year: ""
          });
          break;
        case "work_experience":
          state.work_experience.push({
            job_title: "",
            company: "",
            start_date: "",
            end_date: "",
            description: ""
          });
          break;
        default:
          break;
      }
    },
    removeItem: (state, action: PayloadAction<{ field: keyof FormState; index: number }>) => {
      (state[action.payload.field] as any[]).splice(action.payload.index, 1);
    },
    setAllFields: (state, action: PayloadAction<FormState>) => {
      return action.payload;
    },
    resetForm: () => initialState,
  },
});

export const { setInitialForm, updateField, updateNestedField, addItem, removeItem, setAllFields, resetForm } = profileUpdateFormSlice.actions;
export default profileUpdateFormSlice.reducer;
