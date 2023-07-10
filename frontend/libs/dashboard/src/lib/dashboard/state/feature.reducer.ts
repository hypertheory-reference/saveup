import {
  ActionReducerMap
} from '@ngrx/store';
import * as fromChildJobs from './child-jobs';
import * as fromChildren from './children';
import * as fromDashboard from './dashboard';
import * as fromJobs from './jobs';
import * as fromUiHints from './ui-hints';
export const FEATURE_NAME = 'dashboardFeature';

export interface DashboardState {
  [fromDashboard.DASHBOARD_FEATURE_KEY]: fromDashboard.DashboardState;
  [fromChildren.CHILDREN_FEATURE_KEY]: fromChildren.ChildrenState;
  [fromJobs.JOBS_FEATURE_KEY]: fromJobs.JobsState;
  [fromChildJobs.CHILD_JOBS_FEATURE_KEY]: fromChildJobs.ChildJobsState;
  [fromUiHints.UI_HINTS_FEATURE_KEY]: fromUiHints.UiHints;
}

export const reducers: ActionReducerMap<DashboardState> = {
  [fromDashboard.DASHBOARD_FEATURE_KEY]: fromDashboard.reducer,
  [fromChildren.CHILDREN_FEATURE_KEY]: fromChildren.reducer,
  [fromJobs.JOBS_FEATURE_KEY]: fromJobs.reducer,
  [fromChildJobs.CHILD_JOBS_FEATURE_KEY]: fromChildJobs.reducer,
  [fromUiHints.UI_HINTS_FEATURE_KEY]: fromUiHints.reducer,
};


