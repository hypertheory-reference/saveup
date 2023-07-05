import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppEvents } from '@saveup/utils';
import { AuthEvents } from './state/auth.actions';
@Component({
  standalone: true,
  imports: [ RouterModule],
  selector: 'saveup-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  {
  title = 'frontend';

  constructor(private store:Store) {
    store.dispatch(AppEvents.appStarted());
  }
  
  login() {
    this.store.dispatch(AuthEvents.loginRequested());
  }
}
