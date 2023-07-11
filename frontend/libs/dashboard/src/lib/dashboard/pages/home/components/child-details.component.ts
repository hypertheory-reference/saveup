import {
  DIALOG_DATA,
  Dialog,
  DialogModule,
  DialogRef,
} from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import {
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  inject
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AgePipe } from '@saveup/utils';
import { filter } from 'rxjs';
import { selectSelectedChildModel } from '../../../state';
import { UiHintsCommands } from '../../../state/ui-hints';
import { ChildrenEvents } from '../../../state/children';
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
            {{ child.name }} is {{ child.birthDate | dateToAgePipe }} years old.
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
            *ngIf="child.birthDate === null"
            class="btn btn-primary"
            data-testid="set-birthdate"
            (click)="showSetBirthdateDialog()"
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
      if(this.child() && result) {
      this.store.dispatch(ChildrenEvents.birthdaySet({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        entity: this.child()!,
        changes: {
          birthDate: result,
        }
      }));
    }
    });
  }
}

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `<div class="dialog">
    <div class="content">
      <!--content-->
      <div class="header-block">
        <!--header-->
        <div class="header-block-item">
          <h3 class="text-3xl text-black font-semibold">
            {{ data.message }}
          </h3>
        </div>
        <!--body-->
        <div class="body">
          <form (submit)="close(true)" [formGroup]="form">
            <div class="form-group">
              <label for="birthdate">Birthdate</label>
              <input
                class="input"
                formControlName="bday"
                type="date"
                id="birthdate"
                name="birthdate"
              />
            </div>
            <!--footer-->
            <div class="buttons">
              <button (click)="close(false)" type="reset">Close</button>
              <button type="submit">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>`,
  styleUrls: ['./dialog.css'],
})
export class ChildDetailsBirthdateComponent {
  constructor(
    private dialogRef: DialogRef<string | null>,
    @Inject(DIALOG_DATA) public data: DialogData
  ) {}

  form = new FormGroup({
    bday: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
  close(didIt: boolean) {
    if (didIt && this.form.valid) {
      this.dialogRef.close(this.form.controls.bday.value);
    }
    if (!didIt) {
      this.dialogRef.close(null);
    }
  }
}
