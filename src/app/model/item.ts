export interface Item {
    title: string;
    description?: string;
    isCompleted: boolean;
    created: Date;
    remindAt?: Date;
}
