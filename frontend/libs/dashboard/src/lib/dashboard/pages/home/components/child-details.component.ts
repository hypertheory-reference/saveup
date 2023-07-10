import { Component, Inject, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UiHintsCommands } from '../../../state/ui-hints';
import { selectSelectedChildModel } from '../../../state';
import { CommonModule } from '@angular/common';
import { AgePipe } from '@saveup/utils';
import { Dialog, DIALOG_DATA, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export type DialogData = {
  message: string;

}
@Component({
  standalone: true,
  imports: [CommonModule, AgePipe, DialogModule],
  styles: [
   

  ],
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
   const ref =  this.dialog.open<string>(ChildDetailsBirthdateComponent, {
      width: '250px',
      height: '250px',
      hasBackdrop: true,
      data: {
        message: 'Add a Birthdate to ' + this.child()?.name || 'Your Child'
      }
    });

    ref.closed.subscribe((result) => {
      console.log(`They set the birthdate to ${result}`)
    });
  }
}


@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `<div
    class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
  >
    
    <div class="relative w-auto my-6 mx-auto max-w-6xl">
    <!--content-->
    <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
      <!--header-->
      <div class="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
        <h3 class="text-3xl text-black font-semibold">
          {{data.message}}
        </h3>
   
      </div>
      <!--body-->
      <div class="relative p-6 flex-auto">
       <form (ngSubmit)="close(true)" [formGroup]="form">
        <div class="form-group">
          <label for="birthdate">Birthdate</label>
          <input class="input" formControlName="bday" type="date" id="birthdate" name="birthdate"  />
        </div>
        <!--footer-->
        <div class="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
          <button (click)="close(false)" type="reset" class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" >
            Close
          </button>
          <button (click)="close(true)" type="submit" class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" >
            Save Changes
          </button>
        </div>
      </form>
      </div>
    </div>
  </div>
  </div>`,
  styles: [``],
})
export class ChildDetailsBirthdateComponent {
  constructor(
    private dialog: Dialog,
    private dialogRef: DialogRef<string | null>,
    @Inject(DIALOG_DATA) public data: DialogData
  ) {}

  form = new FormGroup({
    
    bday: new FormControl<string>('', { nonNullable: true, validators: [Validators.required]})
  });
  close(didIt: boolean) {
    if(didIt) {
      this.dialogRef.close(this.form.controls.bday.value);
    } else{
      this.dialogRef.close(null);
    }
  }
}