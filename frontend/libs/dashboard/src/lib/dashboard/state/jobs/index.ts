export * from './jobs.actions';
export * from './jobs.effects';
export * from './jobs.reducer';

export const JOBS_FEATURE_KEY = 'jobs';

export type JobsEntity = {
  id: string;
  name: string;
  description: string;
};
