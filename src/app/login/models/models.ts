export type Status = 'initial' | 'pending' | 'success' | 'error';

export type Mode = 'signin' | 'signup';

export interface Credentials {
    email: string;
    password: string; 
}

export interface User {
    email: string;
    name: string;
    surname: string;
}