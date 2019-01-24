import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(private itemsMap: ShoppingCart) {
        this.itemsMap = itemsMap;

        for (let entry in itemsMap.items) {
            let item = itemsMap.items[entry];
            this.items.push(new ShoppingCartItem({
                // use spread operator to assign properties to ShoppingCartItem
                ...item,
                key: entry
            }));
        }
    }


    get totalItemsCount() {
        let count = 0;
        for (let productId in this.items)
            count += this.items[productId].quantity;
        return count;
    }

    get totalPrice() {
        let total = 0;
        for (let productId in this.items)
            total += this.items[productId].totalPrice;
        return total;
    }

    getQuantity(product: Product) {
        // if no items in shopping cart, return 0
        if (!this.itemsMap.items) return 0;

        // else get quantities of items in shopping cart
        let item = this.itemsMap.items[product.key];
        return item ? item.quantity : 0;
    }
}
