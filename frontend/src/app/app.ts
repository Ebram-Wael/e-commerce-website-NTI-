import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {LoginComponent } from './login/login';
// import {RegisterComponent} from './register/register';

@Component({
  selector: 'app-root',
  // standalone: true,
  imports: [LoginComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']   
})
export class App {
  protected readonly title = signal('frontend');
}
