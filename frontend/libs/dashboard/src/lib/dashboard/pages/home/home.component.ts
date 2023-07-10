import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  NavigationStart,
  Router,
  RouterEvent,
  RouterModule,
  NavigationEnd,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { selectDashboardModel } from '../../state';
import { FeatureEvents } from '../../state/';
import { ChildrenEvents } from '../../state/children';
import { AllowanceSummaryComponent } from './allowance-summary.component';
import { ChildListComponent } from './child-lis.component';
import { filter, tap } from 'rxjs';

@Component({
  standalone: true,
  template: ` <div *ngIf="model() as model">
    <h2>{{ model.familyName }}</h2>
    <p>You have {{ model.totalChildren }} children.</p>
    <saveup-db-allowance-summary [model]="model.allowanceSummary" />
    <router-outlet name="create" />
    <div *ngIf="isEditing() === false">
      <a class="btn btn-primary" (click)="addChild()">Add a child</a>
    </div>
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

  isEditing = signal(false);
  constructor(private store: Store, router: Router) {
    store.dispatch(FeatureEvents.entered());
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((e) => {
        const ne = e as NavigationEnd;
        if (ne.url.endsWith('(create:null)')) {
          this.isEditing.set(false);
        }
      });
  }
  addChild() {
    this.isEditing.set(true);
    this.store.dispatch(ChildrenEvents.requestedToAddChild());
  }
}
