import { BoughtItemsType, ItemType, ListType } from "./ListType"

export interface ListResponse {
    status: string
    message: string
    data: ListType[]
}

export interface AddListResponse {
    status: string
    message: string
    data: ListType[]
}

export interface ItemResponse {
    status: string
    message: string
    data: ItemType[]
}

export interface BoughtItemResponse {
    status: string
    message: string
    data: BoughtItemsType[]
}