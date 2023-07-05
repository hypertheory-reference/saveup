import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { LogLevel, provideAuth } from 'angular-auth-oidc-client';
import { appRoutes } from './app.routes';
import { reducers } from './state';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      withEnabledBlockingInitialNavigation(),
      withComponentInputBinding()
    ),
    provideStore(reducers),
    provideStoreDevtools(),
    provideEffects([]),
    provideHttpClient(),
   provideAuth({
    config: {
      authority: 'https://localhost:8080/realms/saveup',
      authWellknownEndpointUrl: 'http://localhost:8080/realms/saveup/.well-known/openid-configuration',
      redirectUrl: window.location.origin,
      postLogoutRedirectUri: window.location.origin,
      clientId: 'frontend',
      scope: 'openid profile email offline_access',
      responseType: 'code',
      silentRenew: true,
      useRefreshToken: true,
      logLevel: LogLevel.Debug,
    }
   })
  ],
  
};
