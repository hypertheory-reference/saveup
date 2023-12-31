import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { FeatureEvents } from './state';
import { RouterModule } from '@angular/router';
import { selectDashboardModel } from './state';

@Component({
  selector: 'saveup-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: ` <router-outlet /> `,
  styles: [],
})
export class DashboardComponent {
  model = this.store.selectSignal(selectDashboardModel);
  constructor(private store: Store) {
    store.dispatch(FeatureEvents.entered());
  }
}
