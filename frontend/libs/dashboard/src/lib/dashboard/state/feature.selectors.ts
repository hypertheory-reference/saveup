import { createFeatureSelector, createSelector } from '@ngrx/store';

import { DashboardState, FEATURE_NAME } from '.';
import * as models from '../models';
import * as fromChildJobs from './child-jobs';
import * as fromChildren from './children';
import * as fromJobs from './jobs';
import * as fromDashboard from './dashboard';

const selectFeature = createFeatureSelector<DashboardState>(FEATURE_NAME);

const selectChildrenBranch = createSelector(selectFeature, (f) => f.children);
const selectJobsBranch = createSelector(selectFeature, (f) => f.jobs);
const selectDashboarBranch = createSelector(selectFeature, (f) => f.dashboard);
const selectChildJobsBranch = createSelector(selectFeature, (f) => f.childJobs);

const childrenSelectors =
  fromChildren.adapter.getSelectors(selectChildrenBranch);

const childJobsSelectors = fromChildJobs.adapter.getSelectors(
  selectChildJobsBranch
);
const jobsSelectors = fromJobs.adapter.getSelectors(selectJobsBranch);
const dashboardSelectors = createSelector(
  selectDashboarBranch,
  fromDashboard.selectDashboardState
);

export const selectChildrenListmodel = createSelector(
  childrenSelectors.selectAll,
  (e) => e as models.ChildListModel[]
);

export const selectJobsListModel = createSelector(
  jobsSelectors.selectAll,
  (e) => e as models.JobListModel[]
);

export const selectChildModel = (id?: string) =>
  createSelector(childrenSelectors.selectEntities, (entities) => {
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
    childJobsSelectors.selectAll,
    jobsSelectors.selectAll,
    (assignments, jobs) => {
      if (!id) {
        return undefined;
      } else {
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
    childJobsSelectors.selectAll,
    jobsSelectors.selectEntities,
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
  dashboardSelectors,
  childrenSelectors.selectAll,
  (db, children) => {
    const kids = children.map((c) => ({
      ...c,
      weeklyAllowance: c.weeklyAllowance || 0,
    }));
    const weekly = kids.reduce((p, c) => p + c.weeklyAllowance, 0);
    const model: models.DashboardModel = {
      id: db.id,
      familyName: db.familyName,
      allowanceSummary: {
        totalWeeklyAllowance: weekly,
        totalMonthlyAllowance: weekly * 4,
        totalYearlyAllowance: weekly * 52,
      },
      totalChildren: children.length,
      children: kids,
    };
    return model;
  }
);
