import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  DashboardModelResponse,
  FeatureCommands,
  FeatureDocuments,
  FeatureEvents,
} from '../actions/feature.actions';
import { map, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '@saveup/utils';

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
          .get<DashboardModelResponse>(API_URL + 'dashboard/')
          .pipe(map((payload) => FeatureDocuments.dashboard({ payload })))
      )
    );
  },
  { functional: true }
);
