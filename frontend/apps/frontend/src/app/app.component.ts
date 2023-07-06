import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppEvents } from '@saveup/utils';
import { AuthEvents } from './state/auth.actions';
import { selectAuthBranch, selectUser, selectUserLoggedIn } from './state';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  imports: [ RouterModule, CommonModule],
  selector: 'saveup-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  {
  title = 'frontend';
  loggedIn = this.store.selectSignal(selectUserLoggedIn);
  user = this.store.selectSignal(selectUser);
  auth = this.store.selectSignal(selectAuthBranch);
  constructor(private store:Store) {
    store.dispatch(AppEvents.appStarted());
  }
  
  login() {
    this.store.dispatch(AuthEvents.loginRequested());
  }
}
