import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { authGuard } from './guards/auth.guard';
import { NoteListComponent } from './component/note-list/note-list.component';
import { EditNoteComponent } from './component/edit-note/edit-note.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
    title: 'Home Page'
  },
  {
    path: 'login',
    component: LoginComponent, 
    title: 'Login'
  },
  {
    path: 'register',
    component: RegisterComponent, 
    title: 'Register'
  },
  {
    path: 'notes/:id',
    component: EditNoteComponent, 
    title: 'Note Editor',
    canActivate: [authGuard] // защита от неавторизированных пользователей
  },
  {
    path: 'home',
    component: NoteListComponent, 
    title: 'Note List',
    canActivate: [authGuard] // защита от неавторизированных пользователей
  },
];
