import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../shared/auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  
  constructor(private authService: AuthService) { }

  displayEmail$: Observable<string|null> = this.authService.displayEmail$ // для вывода в хедер авторизированного пользователя

  //выход
  logout() {
    this.authService.logout()
  }
}

