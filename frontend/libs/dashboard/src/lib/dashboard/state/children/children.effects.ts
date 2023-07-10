import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { API_URL } from '@saveup/utils';
import { map, mergeMap, tap } from 'rxjs';
import {
  ChildrenCommands,
  ChildrenDocuments,
  ChildrenEvents,
  ChildrenEntity,
} from '.';
import { FeatureDocuments } from '../';
import { Router } from '@angular/router';

export const childAddedToCommand = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(ChildrenEvents.childAdded),
      map(({ payload }) => ChildrenCommands.addChild({ payload }))
    );
  },
  { functional: true }
);

export const childCreateRequestNavigation = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(ChildrenEvents.requestedToAddChild),
      tap(() => router.navigate(['/dashboard/home', { outlets: {'create': 'add-child'}}])),
    )
  }, { functional: true, dispatch: false }
);

export const childCreateRequestCompletedNavigation = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(ChildrenEvents.completedAddingChild),
      tap(() =>
        router.navigate([
          '/dashboard/home',
          { outlets: { create: 'null' } },
        ])
      )
    );
  },
  { functional: true, dispatch: false }
);

export const childAllowanceToCommand = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(ChildrenEvents.allowanceSet),
      map(({ payload }) => ChildrenCommands.setAllowance({ payload }))
    );
  },
  { functional: true }
);
export const addChild = createEffect(
  (actions$ = inject(Actions), http = inject(HttpClient)) => {
    return actions$.pipe(
      ofType(ChildrenCommands.addChild),
      mergeMap(({ payload }) =>
        http
          .post<ChildrenEntity>(API_URL + 'dashboard/children', payload)
          .pipe(map((payload) => ChildrenDocuments.child({ payload })))
      )
    );
  },
  { functional: true }
);

export const adjustAllowance = createEffect(
  (actions$ = inject(Actions), http = inject(HttpClient)) => {
    return actions$.pipe(
      ofType(ChildrenCommands.setAllowance),
      mergeMap(({ payload }) =>
        http
          .post(
            API_URL + `dashboard/children/${payload.entity.id}/allowance`,
            payload.changes
          )
          .pipe(
            map(() => ({
              ...payload.entity,
              weeklyAllowance: payload.changes.weeklyAllowance,
            })),
            map((payload) => ChildrenDocuments.child({ payload }))
          )
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
