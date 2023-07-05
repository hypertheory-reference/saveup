import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { ChildJobDocuments } from '../actions/child-jobs.actions';

export interface ChildJobsEntity {
    id: string;
    childId: string;
    jobId: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ChildJobsState extends EntityState<ChildJobsEntity> {

}

export const adapter = createEntityAdapter<ChildJobsEntity>();

const initialState = adapter.getInitialState();

export const reducer = createReducer(
  initialState,
  on(ChildJobDocuments.childJob, (state, { payload }) => adapter.addOne(payload, state)),
  on(ChildJobDocuments.childJobs, (state, { payload }) => adapter.setAll(payload, state))
);

