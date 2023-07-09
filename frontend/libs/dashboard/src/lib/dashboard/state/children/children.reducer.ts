import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { ChildrenEntity, ChildrenDocuments } from '.';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ChildrenState extends EntityState<ChildrenEntity> {
 
}

export const adapter = createEntityAdapter<ChildrenEntity>();

const initialState = adapter.getInitialState({
 
});

export const reducer = createReducer(
  initialState,
  on(ChildrenDocuments.children, (s, a) => adapter.setAll(a.payload, s)),
  on(ChildrenDocuments.child, (s, a) => adapter.upsertOne(a.payload, s))
);
