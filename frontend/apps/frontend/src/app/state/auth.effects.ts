import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppEvents } from '@saveup/utils';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map, switchMap } from 'rxjs';
import { AuthDocuments, AuthEvents } from './auth.actions';

@Injectable()
export class AuthEffects {

  requestLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthEvents.loginRequested),
      map(() => this.oidcService.authorize())
    );
  }, {dispatch: false});

  checkAuthOnStartup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppEvents.appStarted),
      switchMap(() =>
        this.oidcService.checkAuth().pipe(
          map((auth) => {
            
            if (auth.isAuthenticated) {
              return AuthDocuments.user({ user: auth.userData });
            } else {
              return AuthDocuments.user({ user: null });
            }
          })
        )
      )
    );
  });
  constructor(
    private actions$: Actions,
    private oidcService: OidcSecurityService
  ) {}
}
