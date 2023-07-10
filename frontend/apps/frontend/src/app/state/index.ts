import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAuth from "./auth.reducer";
import { routerReducer, RouterState } from "@ngrx/router-store";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppState {
    user: fromAuth.UserState,
    router: RouterState.Minimal
}

export const reducers:ActionReducerMap<AppState> = {
    user: fromAuth.reducers,
    router: routerReducer
};

export const selectAuthBranch = createFeatureSelector<fromAuth.UserState>('user');



export const selectUser = createSelector(selectAuthBranch, b => b.user);
export const selectUserLoggedIn = createSelector(selectAuthBranch, b => b.isLoggedIn);