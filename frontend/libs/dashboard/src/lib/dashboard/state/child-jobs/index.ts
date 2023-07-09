export * from './child-jobs.actions';
export * from './child-jobs.effects';
export * from './child-jobs.reducer';

export const CHILD_JOBS_FEATURE_KEY = 'childJobs';
export type ChildJobsEntity = {
  id: string;
  childId: string;
  jobId: string;
};
