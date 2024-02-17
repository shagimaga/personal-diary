import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Note } from '../../model/note';
import { DataService } from '../../shared/data.service';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';


@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [CardModule, 
    CommonModule,
    ButtonModule],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss'
})
export class NoteCardComponent {
  @Input() Note!: Note
  
  router = inject(Router)
  key: string
  placeholderTextEditNote: string
  constructor(private dataService: DataService) { 
    this.dataService.getKeyNote.subscribe(key => this.key = key)                                        // подписки нужны для передачи ключа заметки и текста
    this.dataService.getplaceholderTextEditNote.subscribe(text => this.placeholderTextEditNote = text)  // для редактирования по ключу
  }
  
  // удаляем заметку
  deleteNote(key: string) {
    this.dataService.deleteNote(key)
  }
  
  // переходим в редактор в режиме редактирования
  updateNoteMenu(note: Note) {
    this.dataService.setKeyNote(note.$key)
    this.dataService.setplaceholderTextEditNote(note.text!)
    this.router.navigateByUrl('notes/0', {
      state: {
        isEdit: true, // флаг отправляется в редактор через роутер, нужен для создания либо редактирования
      }
    })
  }
}
