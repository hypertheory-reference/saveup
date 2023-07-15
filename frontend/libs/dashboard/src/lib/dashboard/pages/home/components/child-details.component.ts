import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AgePipe } from '@saveup/utils';
import { filter } from 'rxjs';
import { selectSelectedChildModel } from '../../../state';
import { ChildrenEvents } from '../../../state/children';
import { UiHintsCommands } from '../../../state/ui-hints';
import { ChildDetailsBirthdateComponent } from './dialogs/set-birthday.component';
export type DialogData = {
  message: string;
};
@Component({
  standalone: true,
  imports: [CommonModule, AgePipe, DialogModule],
  template: `
    <div
      class="card card-bordered"
      *ngIf="child() as child"
      data-testid="child-details"
    >
      <div class="card-header">
        <h4 class="card-title">Child Details: {{ child.name }}</h4>
        <div class="child-body">
          <p *ngIf="child.birthDate" data-testid="age-display">
            {{ child.name }} is {{ child.birthDate | dateToAgePipe }} years old <small>{{child.birthDate}}</small>.
          </p>
          <p
            *ngIf="child.weeklyAllowance !== null"
            data-testid="allowance-display"
          >
            {{ child.name }} has a weekly allowance of
            {{ child.weeklyAllowance | currency }}
          </p>
        </div>
        <div class="container-actions">
          <button
           
            class="btn btn-primary"
            data-testid="set-birthdate"
            (click)="showSetBirthdateDialog()"
          >
            Set Birthdate
          </button>

          <button
     
            data-testid="change-allowance"
            class="btn btn-primary"
          >
            Change Allowance
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ChildDetailsComponent implements OnInit, OnDestroy {
  @Input() id = '';
  store = inject(Store);
  child = this.store.selectSignal(selectSelectedChildModel);
  dialog = inject(Dialog);
  ngOnInit(): void {
    this.store.dispatch(
      UiHintsCommands.setSelectedChildId({ payload: this.id })
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(UiHintsCommands.clearSelectedChildId());
  }

  showSetBirthdateDialog() {
    const ref = this.dialog.open<string>(ChildDetailsBirthdateComponent, {
      hasBackdrop: true,
      autoFocus: true,
      data: {
        message: 'Add a Birthdate to ' + this.child()?.name || 'Your Child',
      },
    });

    ref.closed.pipe(filter((result) => result !== null)).subscribe((result) => {
      if (this.child() && result) {
        this.store.dispatch(
          ChildrenEvents.birthdaySet({
           
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              entity: this.child()!,
              changes: {
                birthDate: result,
              },
           
          })
        );
      }
    });
  }
}
