import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../shared/auth.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardModule, FormsModule, InputTextModule, PasswordModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent{
  email: string;
  password: string;

  constructor(private auth: AuthService ) {

  }



  login() {
    if(this.email == '')  {
      alert('Please enter email')
      return
    }
    if(this.password == '')  {
      alert('Please enter password')
      return
    }
    
    this.auth.login(this.email, this.password)
    this.email = ''
    this.password = ''

  }
}
