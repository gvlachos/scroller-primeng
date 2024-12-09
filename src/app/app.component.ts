import { Component } from '@angular/core';
import { ScrollForwardComponent } from './scroll-forward/scroll-forward.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ScrollForwardComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
