import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { JobCreate, JobEvents } from '../../../state/actions/jobs.actions';
import { FormDataType } from '@saveup/utils';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'saveup-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  private readonly store = inject(Store);
  form = new FormGroup<JobFormType>({
    name: new FormControl<string>('', { nonNullable: true }),
    description: new FormControl<string>('', { nonNullable: true }),
  });

  add() {
    const payload = this.form.value as JobCreate;
    this.store.dispatch(JobEvents.jobAdded({ payload }));
  }
}

type JobFormType = FormDataType<JobCreate>;
