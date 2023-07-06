import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { selectUserLoggedIn } from '../state';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'saveup-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <h1>Saveup!</h1>
  
  <p>This is a <em>sample</em> application.</p>
  <div *ngIf="isLoggedIn()">
    <p>You are logged in.</p>
    <p>Go to the <a routerLink="/dashboard">dashboard</a> to manage your family.</p>
  </div>
  <div *ngIf="!isLoggedIn()">
    <p>You are not logged in.</p>
    <p>Click the Login button above and sign in or click the link to create an account.</p>
</div>
  
  `,
  styles: [],
})
export class HomeComponent {
  isLoggedIn = inject(Store).selectSignal(selectUserLoggedIn);
}
