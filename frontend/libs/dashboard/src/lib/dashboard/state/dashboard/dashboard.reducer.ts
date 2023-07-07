import { createReducer, on } from '@ngrx/store';
import { DashboardDocuments, DashboardState } from '.';

export const initialState: DashboardState = {
  id: '',
  familyName: '',
};

export const reducer = createReducer(
  initialState,
  on(DashboardDocuments.dashboard, (state, action) => {
    return {
      ...state,
      id: action.payload.id,
      familyName: action.payload.familyName,
    };
  })
);
