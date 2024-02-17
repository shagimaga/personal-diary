import {Component, inject} from '@angular/core';
import { HeaderComponent } from './header/header.component';

import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [HeaderComponent, 
    RouterModule
  ]
})
export class AppComponent {
  

}
