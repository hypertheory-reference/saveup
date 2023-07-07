import { Component, Input, OnInit, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  ChildrenAllowanceChange,
  ChildrenEvents,
  ChildrenSetAllowance,
  ChildrenEntity,
} from '../../../state/children/';
import {
  selectChildJobsAssignedToChild,
  selectChildJobsNotAssignedToChild,
  selectChildModel,
} from '../../../state';
import { JobsEntity } from '../../../state/jobs';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormDataType } from '@saveup/utils';
import { ChildJobCreate, ChildJobEvents } from '../../../state/child-jobs';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent implements OnInit {
  @Input({ required: true }) id?: string;
  store = inject(Store);
  child!: Signal<ChildrenEntity | undefined>;
  unassignedJobs!: Signal<JobsEntity[] | undefined>;
  assignedJobs!: Signal<JobsEntity[] | undefined>;

  allowanceForm = new FormGroup<ChildAllowanceFormType>({
    weeklyAllowance: new FormControl<number>(0, { nonNullable: true }),
  });

  ngOnInit(): void {
    this.child = this.store.selectSignal(selectChildModel(this.id));
    this.unassignedJobs = this.store.selectSignal(
      selectChildJobsNotAssignedToChild(this.id)
    );
    this.assignedJobs = this.store.selectSignal(
      selectChildJobsAssignedToChild(this.id)
    );
  }
  adjustAllowance() {
    const kid = this.child();
    if (kid) {
      const payload: ChildrenSetAllowance = {
        entity: kid,
        changes: {
          weeklyAllowance: this.allowanceForm.controls.weeklyAllowance.value,
        },
      };
      this.store.dispatch(ChildrenEvents.allowanceSet({ payload }));
    }
  }
  assign(jobId: string) {
    if (this.id) {
      const payload: ChildJobCreate = {
        childId: this.id,
        jobId: jobId,
      };
      this.store.dispatch(ChildJobEvents.jobAssignedToChild({ payload }));
    }
  }
}

type ChildAllowanceFormType = FormDataType<ChildrenAllowanceChange>;
