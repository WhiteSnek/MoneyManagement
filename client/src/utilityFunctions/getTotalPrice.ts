interface ProductType {
    title: string
    image: string
    price: number
    quantity: number
}

export const getTotalPrice = (products: ProductType[]) => {
    let sum = 0;
    products.forEach(product =>
        sum += product.price * product.quantity
        );
    return sum;
}