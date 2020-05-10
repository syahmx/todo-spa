export interface Item {
    id: number;
    title: string;
    description?: string;
    isCompleted: boolean;
    created: Date;
    remindAt?: Date;
}

export interface ItemForAdd {
    title: string;
    description?: string;
    isCompleted: boolean;
    remindAt?: Date;
}