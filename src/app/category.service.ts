import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  // get all categories from Firebase db
  getCategories() {
    return this.db.list('/categories', ref => {
      // sort by category name
      return ref.orderByChild('name');
      })
      // snapshotChanges required to map items
      .snapshotChanges()
      // return database items as key, data-obj pairs
      .map(items => {
        return items.map(a => {
          const data = a.payload.val();
          const key = a.key;
          return { key, data };
        });
      });
  }
}
