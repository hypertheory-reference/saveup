import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromChildren from './children';
import * as fromJobs from './jobs';
import * as fromChildJobs from './child-jobs';
import * as fromDashboard from './dashboard';
import * as models from '../models';
export const FEATURE_NAME = 'dashboardFeature';

export interface DashboardState {
  dashboard: fromDashboard.DashboardState;
  children: fromChildren.ChildrenState;
  jobs: fromJobs.JobsState;
  childJobs: fromChildJobs.ChildJobsState;
}

export const reducers: ActionReducerMap<DashboardState> = {
  dashboard: fromDashboard.reducer,
  children: fromChildren.reducer,
  jobs: fromJobs.reducer,
  childJobs: fromChildJobs.reducer,
};

const selectFeature = createFeatureSelector<DashboardState>(FEATURE_NAME);

const selectChildrenBranch = createSelector(selectFeature, (f) => f.children);
const selectJobsBranch = createSelector(selectFeature, (f) => f.jobs);
const selectChildJobsBranch = createSelector(selectFeature, (f) => f.childJobs);
const selectDashboarBranch = createSelector(selectFeature, (f) => f.dashboard);

const { selectAll: selectChildJobsEntityArray } =
  fromChildJobs.adapter.getSelectors(selectChildJobsBranch);

const {
  selectAll: selectChildrenEntityArray,
  selectEntities: selectChildEntities,
  selectTotal: selectNumberOfChildren,
} = fromChildren.adapter.getSelectors(selectChildrenBranch);

const { selectAll: selectJobsEntityArray, selectEntities: selectJobEntities } =
  fromJobs.adapter.getSelectors(selectJobsBranch);

export const selectChildrenListmodel = createSelector(
  selectChildrenEntityArray,
  (e) => e as models.ChildListModel[]
);

export const selectJobsListModel = createSelector(
  selectJobsEntityArray,
  (e) => e as models.JobListModel[]
);

export const selectChildModel = (id?: string) =>
  createSelector(selectChildEntities, (entities) => {
    if (!id) {
      return undefined;
    } else {
      const kid = entities[id];
      return {
        ...kid,
        weeklyAllowance: kid?.weeklyAllowance ?? null,
      } as models.ChildListModel;
    }
  });

export const selectChildJobsNotAssignedToChild = (id?: string) =>
  createSelector(
    selectChildJobsEntityArray,
    selectJobsEntityArray,
    (assignments, jobs) => {
      if (!id) {
        return undefined;
      } else {
        // go through all the jobs and find the ones that are assigned to the child
        // and return the ones that are assigned to the child
        return jobs
          .map((j) => j.id)
          .filter((jobId) => {
            return (
              assignments.filter((a) => a.jobId === jobId && a.childId === id)
                .length === 0
            );
          })
          .map((jobId) =>
            jobs.find((j) => j.id === jobId)
          ) as models.JobListModel[];
      }
    }
  );

export const selectChildJobsAssignedToChild = (id?: string) =>
  createSelector(
    selectChildJobsEntityArray,
    selectJobEntities,
    (assignments, jobs) => {
      if (!id) {
        return undefined;
      } else {
        return assignments
          .filter((e) => e.childId === id)
          .map((j) => jobs[j.jobId]) as models.JobListModel[];
      }
    }
  );

export const selectDashboardModel = createSelector(
  selectDashboarBranch,
  selectChildrenEntityArray,
  (db, children) => {
    const kids = children.map((c) => ({
      id: c.id,
      name: c.name,
      weeklyAllowance: c.weeklyAllowance || 0,
    }));
    const weekly = kids.reduce((p, c) => p + c.weeklyAllowance, 0);
    const model: models.DashboardModel = {
      id: db.id,
      familyName: db.familyName,
      totalWeeklyAllowance: weekly,
      totalMonthlyAllowance: weekly * 4,
      totalYearlyAllowance: weekly * 52,
      totalChildren: children.length,
      children: kids,
    };
    return model;
  }
);
