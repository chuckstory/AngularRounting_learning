export interface Book {
    id?: number;
    title: string;
    content?: string;
    description: string;
    reviews?: string[];
    prevId?: number;
    nextId?: number;
}

