import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { JobDocuments, JobsEntity } from '.';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface JobsState extends EntityState<JobsEntity> {}

export const adapter = createEntityAdapter<JobsEntity>();

const initialState = adapter.getInitialState();

export const reducer = createReducer(
  initialState,
  on(JobDocuments.job, (state, { payload }) => adapter.addOne(payload, state)),
  on(JobDocuments.jobs, (state, { payload }) => adapter.setAll(payload, state))
);
