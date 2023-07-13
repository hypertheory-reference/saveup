import { DialogRef, DIALOG_DATA } from "@angular/cdk/dialog";
import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from "@angular/forms";
import { DialogData } from "../child-details.component";

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
              <label for="name">Child's Name</label>
              <input
                class="input"
                formControlName="name"
                type="text"
                id="name"
                name="name"
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
export class AddChildDialogComponent {
  constructor(
    private dialogRef: DialogRef<string | null>,
    @Inject(DIALOG_DATA) public data: DialogData
  ) {}

  form = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
  close(didIt: boolean) {
    if (didIt && this.form.valid) {
      this.dialogRef.close(this.form.controls.name.value);
    }
    if (!didIt) {
      this.dialogRef.close(null);
    }
  }
}
