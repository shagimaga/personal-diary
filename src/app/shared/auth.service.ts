import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(private fireauth: AngularFireAuth, private router: Router, private userService: UserService) {

  }
  
  authState$: Observable<firebase.default.User | null> = this.fireauth.authState // переменная для вывода пользователя
  displayEmail$: Observable<string|null> = this.authState$.pipe(                 // в хэдер
    map(user => {
      return !user ? null : user.email
    })
  )


  private userUid = new BehaviorSubject('')  // наблюдатель над переменной userId для составления запросов в firebase
  getuserUid = this.userUid.asObservable()
  setUserUid(userUid: string) {
    this.userUid.next(userUid)
  }
  

  //логин метод
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then((e) => {
      if (e) {
        this.setUserUid(e.user!.uid) //сохраняем uid пользователя для запросов
        this.userService.updateUser(e.user) // добавляем пользователя в бд
      }
      localStorage.setItem('token', e.user!.uid) // локальная переменная
      this.router.navigate(['/home'])
    }, err => {
      alert(err.message)
      this.router.navigate(['/login'])
    })
  }

  //регистрация
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then((e) => {
      if (e) {
        this.setUserUid(e.user!.uid) //сохраняем uid пользователя для запросов
      }
      alert('Registration Successful')
      this.router.navigate(['/home'])
    }, err => {
      alert(err.message)
      this.router.navigate(['/register'])
    })
  }

  //выход пользователя
  logout() {

    localStorage.removeItem('token') // очищаем локальную переменную
    this.fireauth.signOut().then(() => { // выходим из аккаунта
      this.router.navigateByUrl('/login', {
        state: undefined
      })
    }, err => {
      alert(err.message)
    })
  }
}
