import { List } from './list';

export interface User {
    id: number;
    username: string;
    name: string;
    created: Date;
    lastActive: Date;
    lists: List[];
}

export interface UserForLogin {
    username: string;
    password: string;
}

export interface UserForRegister {
    name: string;
    username: string;
    password: string;
}
