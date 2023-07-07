import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ChildrenEntity } from '../reducers/children.reducer';
import { JobsEntity } from '../reducers/jobs.reducer';
import { ChildJobsEntity } from '../reducers/child-jobs.reducer';

export const FeatureEvents = createActionGroup({
  source: 'Dashboard Feature Events',
  events: {
    Entered: emptyProps(),
  },
});

export const FeatureCommands = createActionGroup({
  source: 'Dashboard Feature Commands',
  events: {
    'Load Dashboard Data': emptyProps(),
  },
});

export const FeatureDocuments = createActionGroup({
  source: 'Dashboard Feature Documents',
  events: {
    Dashboard: props<{ payload: DashboardApiResponse }>(),
  },
});

export type DashboardApiResponse = {
  id: string;
  familyName: string;
  children: ChildrenEntity[];
  jobs: JobsEntity[];
  childJobs: ChildJobsEntity[];
};
