import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectDashboardModel } from '../../state';
import { FeatureEvents } from '../../state/';
import { RouterModule } from '@angular/router';
import { AllowanceSummaryComponent } from './allowance-summary.component';
import { ChildListComponent } from './child-lis.component';

@Component({
  standalone: true,
  template: ` <div *ngIf="model() as model">
    <h2>{{ model.familyName }}</h2>
    <p>You have {{ model.totalChildren }} children.</p>
    <saveup-db-allowance-summary [model]="model.allowanceSummary" />
    <saveup-child-list [model]="model.children" />
  </div>`,
  styles: [],
  imports: [
    CommonModule,
    RouterModule,
    AllowanceSummaryComponent,
    ChildListComponent,
  ],
})
export class HomeComponent {
  model = this.store.selectSignal(selectDashboardModel);
  constructor(private store: Store) {
    store.dispatch(FeatureEvents.entered());
  }
}
