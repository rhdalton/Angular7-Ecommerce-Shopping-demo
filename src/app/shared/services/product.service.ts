import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from 'shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }
  getProducts() {
    return this.db.list('/products', ref => ref.orderByChild('name'))
    .snapshotChanges()
    // return database items as key, data-obj pairs
    .map(items => {
      return items.map(a => {
        const data = a.payload.val() as Product;
        data.key = a.key;
        return data;
      });
    });
  }

  getProduct(productId) {
    return this.db.object('/products/' + productId);
  }

  updateProduct(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  deleteProduct(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}


