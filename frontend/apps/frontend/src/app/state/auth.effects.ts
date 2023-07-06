import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppEvents } from '@saveup/utils';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { filter, map, mergeMap, switchMap } from 'rxjs';
import { AuthDocuments, AuthEvents } from './auth.actions';
import { API_URL } from '@saveup/utils';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class AuthEffects {
  requestLogin$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthEvents.loginRequested),
        map(() => this.oidcService.authorize())
      );
    },
    { dispatch: false }
  );

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

  handleLogoutRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthEvents.logoutRequested),
      switchMap(() =>
        this.oidcService
          .logoff()
          .pipe(map(() => AuthDocuments.user({ user: null })))
      )
    );
  });
  sendLoginActivityToApi$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthDocuments.user),
        filter((user) => user.user !== null),
        mergeMap((user) =>
          this.http.post(`${API_URL}dashboard/login`, user.user)
        )
      );
    },
    { dispatch: false }
  );
  constructor(
    private actions$: Actions,
    private oidcService: OidcSecurityService,
    private http: HttpClient
  ) {}
}
