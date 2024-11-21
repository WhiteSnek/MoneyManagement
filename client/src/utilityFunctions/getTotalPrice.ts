import { ItemType } from "../types/ListType"


export const getTotalPrice = (products: ItemType[]) => {
    let sum = 0;
    products.forEach(product =>
        sum += product.price * product.quantity
        );
    return sum;
}