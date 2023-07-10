import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ChildrenAdddedRequestResult, ChildrenCreate, ChildrenEvents } from '../../../state/children';
import { selectChildrenListmodel } from '../../../state';
import { filter, map, take } from 'rxjs';

@Component({
  standalone: true,
  selector: 'saveup-child-add',
  template: `<form [formGroup]="form" (ngSubmit)="submit()">
    <div class="form-group">
      <label for="name">Name</label>
      <input
        type="text"
        formControlName="name"
        class="input input-bordered w-full max-w-xs"
      />
      <div
        class="alert alert-error"
        *ngIf="nameField.errors && (nameField.touched || nameField.dirty)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span *ngIf="nameField.getError('required')">A name is required</span>
        <span *ngIf="nameField.getError('nonUniqueName')"
          >You already have a child witht that name.</span
        >
      </div>
    </div>
    <button  class="btn btn-primary btn-sm" type="submit">Add Child</button>
    <button class="btn btn-secondary btn-sm" type="reset" (click)="goBack('cancelled')">
      Cancel
    </button>

  </form> `,
  imports: [CommonModule, ReactiveFormsModule],
  styles: ['.ng-invalid: { border: 1px solid red; }'],
})
export class AddChildComponent  {
  store = inject(Store);
  
  form = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
      asyncValidators: [this.uniqueNameAsyncValidator()],
    }),
  });

  get nameField() {
    return this.form.controls.name;
  }
  submit() {
    if (this.form.valid) {
      const child: ChildrenCreate = {
        name: this.form.controls.name.value,
        birthDate: null,
      };
      console.log(child);
      this.store.dispatch(ChildrenEvents.childAdded({ payload: child }));
      this.goBack('completed');
    }
  }

  goBack(payload: ChildrenAdddedRequestResult = 'completed') {
    this.store.dispatch(ChildrenEvents.completedAddingChild({ payload}))
  }
  uniqueNameAsyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl) =>
      this.store.select(selectChildrenListmodel).pipe(
        map((children) => {
          return children.map((child) => child.name.toLocaleLowerCase());
        }),
        map((children) => {
          if (children.includes(control.value.trim().toLocaleLowerCase())) {
            console.log('Have the name already');
            return { nonUniqueName: true };
          } else {
            console.log('Name is unique');
            return null;
          }
        }),
        take(1)
      );
  }
}
