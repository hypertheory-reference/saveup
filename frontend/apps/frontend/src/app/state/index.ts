import { ActionReducerMap } from "@ngrx/store";
import * as fromAuth from "./auth.reducer";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppState {
    user: fromAuth.UserState
}

export const reducers:ActionReducerMap<AppState> = {
    user: fromAuth.reducers
};