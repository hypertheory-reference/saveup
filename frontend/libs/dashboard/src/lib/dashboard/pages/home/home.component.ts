import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectDashboardModel } from '../../state';
import { AllowanceSummaryComponent } from './allowance-summary.component';
import { ChildListComponent } from './child-lis.component';
import { AddChildDialogComponent } from './components/dialogs/add-child.component';
import { filter } from 'rxjs';
import { ChildJobEvents } from '../../state/child-jobs';
import { ChildrenEvents } from '../../state/children';

@Component({
  standalone: true,
  template: ` <div *ngIf="model() as model">
    <h2>{{ model.familyName }}</h2>
    <p>You have {{ model.totalChildren }} children.</p>
    <saveup-db-allowance-summary [model]="model.allowanceSummary" />

    <a class="btn btn-primary" (click)="addChild()">Add a child</a>

    <saveup-child-list [model]="model.children" />
  </div>`,
  styles: [],
  imports: [
    CommonModule,
    AllowanceSummaryComponent,
    ChildListComponent,
    DialogModule,
  ],
})
export class HomeComponent {
  model = this.store.selectSignal(selectDashboardModel);
  dialog = inject(Dialog);

  constructor(private store: Store) {}
  addChild() {
    const ref = this.dialog.open<string>(AddChildDialogComponent, {
      hasBackdrop: true,
      autoFocus: true,
      data: {
        message: 'Add A Child to Your Family',
      },
    });

    ref.closed.pipe(filter((result) => result !== null)).subscribe((name) => {
      if (name) {
        this.store.dispatch(ChildrenEvents.childAdded({ payload: { name } }));
      }
    });
  }
}
