export interface ListType {
    id: string;
    title: string;
    items: ItemType[];
}

export interface ItemType {
    id: string;
    name: string;
    displayImage: string;
    price: number;
    quantity: number;
    priority: number;
    category: string;
    bought: boolean;
}

export interface BoughtItemsType {
    id: string;
    name: string;
    displayImage: string;
    specifications: string;
    price: number;
    quantity: number;
    priority: number;
    category: string;
    updatedAt: string
}

export interface ItemDetails {
    id: string;
    name: string;
    displayImage: string;

    price: string;
    quantity: string;
    priority: number;
    specifications: string;
    link: string;
    category: string,
    isService: boolean,
    bought: boolean
}

export interface AddItem {
    name: string;
    displayImage: string | ArrayBuffer | null | File;
    price: string;
    quantity: string;
    specifications: string;
    link: string;
    category: string,
    isService: string,
    listId: string
}