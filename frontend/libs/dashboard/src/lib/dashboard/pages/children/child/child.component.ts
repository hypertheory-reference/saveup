import { Component, Input, OnInit, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  selectChildJobsAssignedToChild,
  selectChildJobsNotAssignedToChild,
  selectChildModel,
} from '../../../state';
import { ChildrenEntity } from '../../../state/reducers/children.reducer';
import { JobsEntity } from '../../../state/reducers/jobs.reducer';
import {
  ChildJobCreate,
  ChildJobEvents,
} from '../../../state/actions/child-jobs.actions';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent implements OnInit {
  @Input({required: true}) id?: string;
  store = inject(Store);
  child!: Signal<ChildrenEntity | undefined>;
  unassignedJobs!: Signal<JobsEntity[] | undefined>;
  assignedJobs!: Signal<JobsEntity[] | undefined>;
  ngOnInit(): void {
    this.child = this.store.selectSignal(selectChildModel(this.id));
    this.unassignedJobs = this.store.selectSignal(
      selectChildJobsNotAssignedToChild(this.id)
    );
    this.assignedJobs = this.store.selectSignal(
      selectChildJobsAssignedToChild(this.id)
    );
  }

  assign(jobId: string) {
    if (this.id) {
      const payload: ChildJobCreate = {
        childId: this.id,
        jobId: jobId,
      };
      this.store.dispatch(
        ChildJobEvents.jobAssignedToChild({ payload })
      );
    }
  }
}
