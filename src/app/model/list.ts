import { Item } from './item';
export interface List {
    id: number;
    listname: string;
    items: Item[];
}
