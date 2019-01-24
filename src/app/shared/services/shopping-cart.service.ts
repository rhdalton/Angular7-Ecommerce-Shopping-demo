import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Product } from 'shared/models/product';
import { Observable, Subscription } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartItem } from 'shared/models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();

    return this.db.object('/shopping-carts/' + cartId)
      .valueChanges()
      .map((x: ShoppingCart) => new ShoppingCart(x));
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  // Get product item in current cart
  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId) as any;
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    // return current cart Id
    if (cartId) return cartId;
    // if no cart id, create new id and set it in local storage
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItem(product: Product, change: number) {
    // get cart Id of current user
    let cartId = await this.getOrCreateCartId();
    // get cart item
    let item$ = this.getItem(cartId, product.key);

    item$.valueChanges().pipe(take(1)).subscribe(item => {
      let newQuantity = 1; // set to 1 for new item
      // if item exists, set newQuantity +1 to current quantity
      if (item !== null) newQuantity = item.quantity + change;

      // if newQuantity 0, remove object from observable
      if (newQuantity === 0) item$.remove();
      // else update observable
      else {
        item$.update({
          name: product.name,
          image: product.image,
          price: product.price,
          quantity: newQuantity
        });
      }
    });
  }
}
