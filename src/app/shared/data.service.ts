import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {Note} from '../model/note'
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { getDatabase, ref, set } from "firebase/database";



@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  
  currentDate: Date = new Date()
  constructor(private db: AngularFireDatabase, private auth: AuthService) { 
    this.auth.getuserUid.subscribe(uid => this.userUid = uid)
  }
  userUid: string


  private keyNote = new BehaviorSubject('') // наблюдатель над ключом заметки для отслеживания  
  getKeyNote = this.keyNote.asObservable()  // редактируемой заметки
  setKeyNote(keyNote: string) {
    this.keyNote.next(keyNote)
  }

  private placeholderTextEditNote = new BehaviorSubject('')                 // наблюдатель над текстом заметки для редактирования  
  getplaceholderTextEditNote = this.placeholderTextEditNote.asObservable()  
  setplaceholderTextEditNote(placeholderTextEditNote: string) {
    this.placeholderTextEditNote.next(placeholderTextEditNote)
  }


  getAllNotes(): Observable<any> { //метод получения списка заметок на главном экране
    console.log(this.userUid)
    return this.db.list(`/users/${this.userUid}/notes/`).snapshotChanges()
  }


  createNote(note: string): void { // метод создания заметки
    this.db.list(`/users/${this.userUid}/notes/`).push({
      text: note,
      date: `${this.currentDate.getFullYear().toString()}-${(this.currentDate.getMonth() + 1).toString()}-${this.currentDate.getDate().toString()}`
   })
  }

  updateNote(key: string, noteText: string): void { // метод обновления заметки
    if(noteText) {
      this.db.object(`/users/${this.userUid}/notes/` + key).update({
        text: noteText,
        date: `${this.currentDate.getFullYear().toString()}-${(this.currentDate.getMonth() + 1).toString()}-${this.currentDate.getDate().toString()}`
      })
    }
  }

  deleteNote(key: string): void { //удаление заметки
    this.db.object(`/users/${this.userUid}/notes/` + key).remove()
  }
 
  
}