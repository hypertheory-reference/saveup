import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import {
  ChildrenCommands,
  ChildrenDocuments,
  ChildrenEvents,
} from '../actions/children.actions';
import { API_URL } from '@saveup/utils';
import { HttpClient } from '@angular/common/http';
import { ChildrenEntity } from '../reducers/children.reducer';
import { FeatureDocuments } from '../actions/feature.actions';

export const childAddedToCommand = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(ChildrenEvents.childAdded),
      map(({ payload }) => ChildrenCommands.addChild({ payload }))
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
