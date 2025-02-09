export interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    description: string;
    type: string;
    url: string;
    appliedDate?: string; // Optional
    status?: string;      // Optional
}

//This file will be deleted once we have merged Nathan's latest PR. This file is only here for my testing purposes.