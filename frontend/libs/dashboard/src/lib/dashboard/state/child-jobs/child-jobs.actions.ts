import { createActionGroup, props } from '@ngrx/store';
import { ChildJobsEntity } from '.';

export const ChildJobEvents = createActionGroup({
  source: 'Dashboard Child Jobs Events',
  events: {
    'Job Assigned to Child': props<{ payload: ChildJobCreate }>(),
  },
});

export const ChildJobCommands = createActionGroup({
  source: 'Dashboard Child Jobs Commands',
  events: {
    'Assign Job to Child': props<{ payload: ChildJobCreate }>(),
  },
});

export const ChildJobDocuments = createActionGroup({
  source: 'Dashboard Child Jobs Documents',
  events: {
    ChildJobs: props<{ payload: ChildJobsEntity[] }>(),
    ChildJob: props<{ payload: ChildJobsEntity }>(),
  },
});

export type ChildJobCreate = Omit<ChildJobsEntity, 'id'>;
