export * from './jobs.actions';
export * from './jobs.effects';
export * from './jobs.reducer';

export type JobsEntity = {
  id: string;
  name: string;
  description: string;
};
