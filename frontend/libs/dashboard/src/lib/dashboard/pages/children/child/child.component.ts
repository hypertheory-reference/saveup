import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  Signal,
  inject,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormDataType } from '@saveup/utils';
import {UiIconDirective} from '@saveup/ui';
import { selectChildModel } from '../../../state';
import { ChildJobCreate, ChildJobEvents } from '../../../state/child-jobs';
import {
  ChildrenAllowanceChange,
  ChildrenEntity,
} from '../../../state/children/';
import { ChildAllowanceAdjustmentComponent } from './child-allowance-adjustment.component';
@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChildAllowanceAdjustmentComponent,
    UiIconDirective

  ],
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent implements OnInit {
  @Input({ required: true }) id?: string;
  store = inject(Store);
  child: Signal<ChildrenEntity | undefined> = signal(undefined);

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.child = this.store.selectSignal(
      selectChildModel(this.id || undefined)
    );
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
