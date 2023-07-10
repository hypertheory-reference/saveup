import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UiHintsCommands } from '../../../state/ui-hints';
import { selectSelectedChildModel } from '../../../state';
import { CommonModule } from '@angular/common';
import { AgePipe } from '@saveup/utils';

@Component({
  standalone: true,
  imports: [CommonModule, AgePipe],
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
            {{ child.name }} is {{ child.birthDate | dateToAgePipe }} years old.
          </p>
          <p *ngIf="child.weeklyAllowance !== null" data-testid="allowance-display">
            {{ child.name }} has a weekly allowance of {{ child.weeklyAllowance | currency }}
          </p>
        </div>
        <div class="container-actions">
          <button
            *ngIf="child.birthDate === null"
            class="btn btn-primary"
            data-testid="set-birthdate"
          >
            Set Birthdate
          </button>
          <button
            *ngIf="child.weeklyAllowance === null"
            data-testid="assign-allowance"
            class="btn btn-primary"
          >
            Assign Allowance
          </button>
          <button
            *ngIf="child.weeklyAllowance !== null"
            data-testid="change-allowance"
            class="btn btn-primary"
          >
            Change Allowance
          </button>
        </div>
      </div>
    </div>

    <pre> {{ child() | json }} </pre>
  `,
})
export class ChildDetailsComponent implements OnInit, OnDestroy {
  @Input() id = '';
  store = inject(Store);
  child = this.store.selectSignal(selectSelectedChildModel);
  ngOnInit(): void {
    this.store.dispatch(
      UiHintsCommands.setSelectedChildId({ payload: this.id })
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(UiHintsCommands.clearSelectedChildId());
  }
}
