// types.ts
export interface User {
    id: number;
    username: string;
    email: string;
    //Add other user properties as needed
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

export interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    description: string;
    type: string;
    url: string;
    appliedDate?: string; // Optional property
    status?: string; // Optional property
}