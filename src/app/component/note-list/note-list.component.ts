import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Note } from '../../model/note'
import { NoteCardComponent } from '../note-card/note-card.component';
import { AuthService } from '../../shared/auth.service';
import { DataService } from '../../shared/data.service';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { Subject, map, takeUntil, tap } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [NoteCardComponent, ToolbarModule, ButtonModule, InputTextModule],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss'
})
export class NoteListComponent implements OnInit, OnDestroy{ 
  
  noteList: Note[] = []

  router = inject(Router)

  
  constructor(private auth: AuthService, private dataService: DataService) {
   
  }

  componentDestroyed$: Subject<boolean> = new Subject()


  ngOnInit() {
    this.dataService.getAllNotes().pipe( // получаем все заметки у конкретного пользователя
      takeUntil(this.componentDestroyed$),
      map(changes => {
        return changes.map((c:any) => {
          let note = c.payload.toJSON()
          note["$key"] = c.key
          return note as Note
        })
      })
    ).subscribe(data => {
      this.noteList = data
    })
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  //переход в редактор с целью создания новой заметки
  createNoteMenu() {
    this.router.navigateByUrl('notes/0', {
      state: {
        isEdit: false 
      }
    })
  }
  
  
  
  
}
