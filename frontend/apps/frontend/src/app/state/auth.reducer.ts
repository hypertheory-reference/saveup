import { createReducer, on } from '@ngrx/store';
import { AuthDocuments } from './auth.actions';

export interface UserState {
  isLoggedIn: boolean;
  user: UserInfo | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  user: null,
};

export const reducers = createReducer(
  initialState,
  on(AuthDocuments.user, (state, { user }) => ({
    ...state,
    user,
    isLoggedIn: !!user,
  }))
);

export type UserInfo = {
  sub: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
};
