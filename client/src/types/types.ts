export interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    description: string;
    url: string;
    appliedDate?: string; // Optional property
    status?: string; // Optional property
  }

//This file will be deleted once we have merged Nathan's latest PR. This file is only here for my testing purposes.