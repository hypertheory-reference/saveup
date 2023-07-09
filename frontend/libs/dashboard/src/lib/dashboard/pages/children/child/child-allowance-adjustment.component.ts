import { Component, EventEmitter, Input, OnInit, Output, Signal, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { FormDataType } from "@saveup/utils";
import { ChildrenAllowanceChange, ChildrenEntity, ChildrenEvents, ChildrenSetAllowance } from "../../../state/children";
import { CommonModule } from "@angular/common";


@Component({
  selector: 'saveup-child-allowance-adjustment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: ` <form
    [formGroup]="allowanceForm"
    (ngSubmit)="adjustAllowance()"
  >
    <div class="form-group">
      <label class="label"
        >Weekly Allowance:
        <input
          type="number"
          class="input input-bordered w-full max-w-xs"
          formControlName="weeklyAllowance"
        />
      </label>
    </div>
  </form>`,
})
export class ChildAllowanceAdjustmentComponent implements OnInit {

    @Input({ required: true }) child:Signal<ChildrenEntity | undefined> = signal(undefined);
    @Output() allowanceChange = new EventEmitter<Pick<ChildrenEntity, 'weeklyAllowance'>>();
  allowanceForm = new FormGroup<ChildAllowanceFormType>({
    weeklyAllowance: new FormControl<number>(0, { nonNullable: true }),
  });

  ngOnInit() {
    // TODO: 
    this.allowanceForm.patchValue({ weeklyAllowance: this.child()?.weeklyAllowance || 0 });
  }
  adjustAllowance() {
    const allowance = this.allowanceForm.value as Pick<ChildrenEntity, 'weeklyAllowance'>;
    this.allowanceChange.emit(allowance);
    
  }
}

type ChildAllowanceFormType = FormDataType<ChildrenAllowanceChange>;
