import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FeatureDocuments } from '../actions/feature.actions';
import { map } from 'rxjs';
import { DashboardDocuments } from '../actions/dashboard.actions';

export const getDashboardFromDashboard = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(FeatureDocuments.dashboard),
      map(({ payload }) => DashboardDocuments.dashboard({ payload }))
    );
  }, { functional: true }
);
