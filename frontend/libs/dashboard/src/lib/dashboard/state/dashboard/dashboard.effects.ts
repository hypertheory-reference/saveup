import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FeatureDocuments } from '../index';
import { map } from 'rxjs';
import { DashboardDocuments } from '../dashboard';

export const getDashboardFromDashboard = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(FeatureDocuments.dashboard),
      map(({ payload }) => DashboardDocuments.dashboard({ payload }))
    );
  },
  { functional: true }
);
