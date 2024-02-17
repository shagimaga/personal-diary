import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { ButtonModule } from 'primeng/button';
import { DataService } from '../../shared/data.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-edit-note',
  standalone: true,
  imports: [NgxEditorModule, FormsModule, ButtonModule],
  templateUrl: './edit-note.component.html',
  styleUrl: './edit-note.component.scss'
})
export class EditNoteComponent implements OnInit, OnDestroy {
  

  editor: Editor
  htmlNote: string = ''
  router = inject(Router)
  toolbar: Toolbar = [
    ['bold', 'italic', 'underline']
  ]
 
  isEdit
  key: string
  constructor(private dataService: DataService) { 
    this.isEdit = this.router.getCurrentNavigation()?.extras.state!['isEdit']
    this.dataService.getKeyNote.subscribe(key => this.key = key) //подписка на ключ заметки в firebase, для редактирования 
    this.dataService.getplaceholderTextEditNote.subscribe(text => this.htmlNote = text) //подписка на текст заметки в firebase, для редактирования 
  }

  ngOnInit(): void {
    this.editor = new Editor()
  }

  ngOnDestroy(): void {
    this.editor.destroy()
    this.dataService.setplaceholderTextEditNote('')
  }

  setData(note: string) {
    this.dataService.createNote(note)
    this.router.navigate(['home'])
  }

  editData(note: string) {
    this.dataService.updateNote(this.key, note)
    this.router.navigate(['home'])
  }
  
  
  
}
