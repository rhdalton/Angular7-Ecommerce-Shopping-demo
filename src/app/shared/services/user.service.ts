import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { AppUser } from 'shared/models/app-user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) {
   }
   save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  // get Observable of AppUser
  get(uid: string): Observable<AppUser> {
    return <Observable<AppUser>>this.db.object('/users/' + uid)
      .valueChanges()
      .map((user: AppUser) => {
        // set displayName of AppUser if not set
        user.displayName = (!user.displayName) ? (user.name) ? user.name : user.email : user.displayName;
        return user;
      });
  }
}
