import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildrenComponent } from './pages/children/children.component';
import { Store } from '@ngrx/store';
import { FeatureEvents } from './state/actions/feature.actions';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'saveup-dashboard',
  standalone: true,
  imports: [CommonModule, ChildrenComponent, RouterModule],
  template: `<h2>Dashboard</h2>
    <div class="tabs">
      <a
        routerLink="children"
        [routerLinkActive]="['tab-active']"
        class="tab tab-bordered"
        >Children</a
      >
      <a
        routerLink="jobs"
        [routerLinkActive]="['tab-active']"
        class="tab tab-bordered"
        >Jobs</a
      >
    </div>
    <router-outlet /> `,
  styles: [],
})
export class DashboardComponent {
  constructor(store: Store) {
    store.dispatch(FeatureEvents.entered());
  }
}
