import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ChildrenCreate, ChildrenEvents } from '../../../state/children';
import { FormDataType } from '@saveup/utils';

@Component({
  selector: 'saveup-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  private readonly store = inject(Store);

  form = new FormGroup<ChildrenFormType>({
    name: new FormControl<string>('', { nonNullable: true }),
    birthDate: new FormControl<string | null>(null, { nonNullable: false }),
  });

  add() {
    const payload = this.form.value as ChildrenCreate;
    this.store.dispatch(ChildrenEvents.childAdded({ payload }));
  }
}
type ChildrenFormType = FormDataType<ChildrenCreate>;
