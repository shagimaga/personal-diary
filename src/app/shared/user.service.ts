import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) { }


  //добавление пользователя в бд
  updateUser(user: firebase.default.User | null): void {
    if (user) {
      this.db.object('/users/' + user.uid).update(
        {
          uid: user.uid,
          email: user.email
        }
      )
    } else {
      alert("Error!")
    }
  }

  
}
