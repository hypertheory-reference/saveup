import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectDashboardModel } from '../../state';
import { FeatureEvents } from '../../state/';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: ` <div *ngIf="model() as model">
    <h2>{{ model.familyName }}</h2>
    <p>You have {{ model.totalChildren }} children.</p>
    <ul>
      <li *ngFor="let kid of model.children">
        {{ kid.name }} ({{ kid.weeklyAllowance | currency }}/week)
        <a [routerLink]="['../child', kid.id]">Details</a>
      </li>
    </ul>
    <ul>
      <li>
        Total Weekly Allowance: {{ model.totalWeeklyAllowance | currency }}
      </li>
      <li>
        Total Monthly Allowance: {{ model.totalMonthlyAllowance | currency }}
      </li>
      <li>
        Total Yearly Allowance: {{ model.totalYearlyAllowance | currency }}
      </li>
    </ul>
  </div>`,
  styles: [],
})
export class HomeComponent {
  model = this.store.selectSignal(selectDashboardModel);
  constructor(private store: Store) {
    store.dispatch(FeatureEvents.entered());
  }
}
