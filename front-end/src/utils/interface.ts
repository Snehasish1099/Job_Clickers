export type resFromApi = {
    status: number;
    data: any;
    message: string;
}

type Work_exp = {
    job_title: string;
    company: string;
    start_date: Date;
    end_date: Date;
    description: string;
}

type Education = {
    institution: string;
    degree: string;
    field_of_study: string;
    start_year: number;
    end_year: number;
}

export type UserInterface = {
    name: string;
    email: string;
    phone_number: string | number;
    role: string;
    resume: any;
    certifications: string[],
    skills: string[];
    location: string;
    headline: string;
    work_experience: Work_exp[];
    education: Education[];
}

export type JobInterface = {
    title: string;
    company: string;
    location: string;
    description: string;
    salary: number;
    job_type: string;
    postedBy: string | any;
}