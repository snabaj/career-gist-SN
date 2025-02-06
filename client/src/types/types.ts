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
