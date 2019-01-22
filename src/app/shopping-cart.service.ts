import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from './models/product';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getCart(cartId: string) {
    return this.db.object('/shopping-carts/' + cartId);
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');

    // return current cart Id
    if (cartId) return cartId;

    // if no cart id, create new id and set it in local storage
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product: Product) {
    // get cart Id of current user
    let cartId = await this.getOrCreateCartId();
    // get product object of current cart
    let item$: any = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key);
    //console.log(item$);
    item$.valueChanges().pipe(take(1)).subscribe(item => {
      // if item exists, update quantity
      if (item !== null) {
        item$.update({ quantity: item.quantity + 1 });
      } else {
        // add item object to cart
        item$.set({ product: product, quantity: 1 });
      }
    });
  }
}
