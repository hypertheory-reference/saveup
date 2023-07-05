import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserInfo } from './auth.reducer';


export const AuthEvents = createActionGroup({
  source: 'Auth Events',
  events: {
    'Login Requested': emptyProps(),
    'Logout Requested': emptyProps(),
  }
});

export const AuthCommands = createActionGroup({
  source: 'Auth Commands',
  events: {
    Login: emptyProps(),
    Logout: emptyProps(),
  },
});

export const AuthDocuments = createActionGroup({
  source: 'Auth Documents',
  events: {
    user: props<{ user: UserInfo | null }>(),
  },
});
