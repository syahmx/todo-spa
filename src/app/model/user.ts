import { List } from './list';
export interface User {
    id: number;
    username: string;
    name: string;
    created: Date;
    lastActive: Date;
    lists: List[];
}
