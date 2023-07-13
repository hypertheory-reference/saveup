import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  DashboardApiResponse,
  FeatureCommands,
  FeatureDocuments,
  FeatureEvents,
} from '.';
import { map, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '@saveup/utils';
import { ChildrenDocuments } from './children';

export const enteredShouldLoadData = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(FeatureEvents.entered),
      map(() => FeatureCommands.loadDashboardData())
    );
  },
  { functional: true }
);

export const loadData = createEffect(
  (actions$ = inject(Actions), http = inject(HttpClient)) => {
    return actions$.pipe(
      ofType(FeatureCommands.loadDashboardData),
      switchMap(() =>
        http
          .get<DashboardApiResponse>(API_URL + 'dashboard/')
          .pipe(map((payload) => FeatureDocuments.dashboard({ payload })))
      )
    );
  },
  { functional: true }
);

export const getChildrenFromDashboard = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(FeatureDocuments.dashboard),
      map((c) => c.payload.children),
      map((payload) => ChildrenDocuments.children({ payload }))
    );
  },
  { functional: true }
);

