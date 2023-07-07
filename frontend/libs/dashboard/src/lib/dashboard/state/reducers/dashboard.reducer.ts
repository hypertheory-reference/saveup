import { createReducer, on } from "@ngrx/store";
import { DashboardDocuments } from "../actions/dashboard.actions";

export interface DashboardState {
    id: string;
    familyName: string;
}

export const initialState: DashboardState = {
    id: '',
    familyName: ''
}

export const reducer = createReducer(initialState,
    on(DashboardDocuments.dashboard, (state, action) => { return { ...state, id: action.payload.id, familyName: action.payload.familyName } })
    );