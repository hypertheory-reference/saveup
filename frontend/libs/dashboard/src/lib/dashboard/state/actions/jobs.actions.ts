import { createActionGroup, props } from '@ngrx/store';
import { JobsEntity } from '../reducers/jobs.reducer';

export const JobEvents = createActionGroup({
  source: 'Dashboard Jobs Events',
  events: {
    'Job Added': props<{ payload: JobCreate }>(),
  },
});

export const JobCommands = createActionGroup({
  source: 'Dashboard Jobs Commands',
  events: {
    'Add Job': props<{ payload: JobCreate }>(),
  },
});

export const JobDocuments = createActionGroup({
  source: 'Dashboard Jobs Documents',
  events: {
    Jobs: props<{ payload: JobsEntity[] }>(),
    Job: props<{ payload: JobsEntity }>(),
  },
});

export type JobCreate = Omit<JobsEntity, 'id'>;
