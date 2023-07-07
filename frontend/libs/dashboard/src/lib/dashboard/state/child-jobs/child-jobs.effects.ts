import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  ChildJobCommands,
  ChildJobDocuments,
  ChildJobEvents,
  ChildJobsEntity,
} from '.';
import { map, mergeMap } from 'rxjs';
import { API_URL } from '@saveup/utils';
import { HttpClient } from '@angular/common/http';
import { FeatureDocuments } from '../';

export const childAssignedToCommands = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(ChildJobEvents.jobAssignedToChild),
      map(({ payload }) => ChildJobCommands.assignJobToChild({ payload }))
    );
  },
  { functional: true }
);

export const addAssignment = createEffect(
  (actions$ = inject(Actions), http = inject(HttpClient)) => {
    return actions$.pipe(
      ofType(ChildJobCommands.assignJobToChild),
      mergeMap(({ payload }) =>
        http
          .post<ChildJobsEntity>(API_URL + 'dashboard/child-jobs', payload)
          .pipe(map((payload) => ChildJobDocuments.childJob({ payload })))
      )
    );
  },
  { functional: true }
);

export const getAssignmentsFromDashboard = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(FeatureDocuments.dashboard),
      map((c) => c.payload.childJobs),
      map((payload) => ChildJobDocuments.childJobs({ payload }))
    );
  },
  { functional: true }
);
