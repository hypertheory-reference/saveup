import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { JobDocuments } from '../actions/jobs.actions';

export interface JobsEntity {
  id: string;
  name: string;
  description: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface JobsState extends EntityState<JobsEntity> {}

export const adapter = createEntityAdapter<JobsEntity>();

const initialState = adapter.getInitialState();

export const reducer = createReducer(
  initialState,
  on(JobDocuments.job, (state, { payload }) => adapter.addOne(payload, state)),
  on(JobDocuments.jobs, (state, { payload }) => adapter.setAll(payload, state))
);
