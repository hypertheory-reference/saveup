import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppEvents } from '@saveup/utils';
import { AuthEvents } from './state/auth.actions';
import { selectAuthBranch, selectUser, selectUserLoggedIn } from './state';
import { CommonModule } from '@angular/common';
import { LoginStatusComponent } from '@saveup/ui';
@Component({
  standalone: true,
  imports: [ RouterModule, CommonModule, LoginStatusComponent],
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
  logout() {
    this.store.dispatch(AuthEvents.logoutRequested());
  }
}
