import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authInterceptor, provideAuth } from 'angular-auth-oidc-client';
import { appRoutes } from './app.routes';
import { openIdConfiguration } from './openid.config';
import { reducers } from './state';
import { AuthEffects } from './state/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [
   
    provideAuth({
      config: openIdConfiguration,
    }),
    provideRouter(
      appRoutes,
      withEnabledBlockingInitialNavigation(),
      withComponentInputBinding()
    ),
    provideStore(reducers),
    provideStoreDevtools(),
    provideHttpClient(withInterceptors([authInterceptor()])),
    provideEffects([AuthEffects]),
  ],
};
