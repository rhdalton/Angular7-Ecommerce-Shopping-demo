import { Product } from './product';

export class ShoppingCartItem {
    key: string;
    name: string;
    image: string;
    price: number;
    quantity: number;

    constructor(init?: Partial<ShoppingCartItem>) {
        // assign property values to this object
        Object.assign(this, init);
    }

    get totalPrice() {
        return this.price * this.quantity;
    }
}
