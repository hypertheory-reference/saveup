import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { JobCommands, JobDocuments, JobEvents, JobsEntity } from './index';
import { map, mergeMap } from 'rxjs';
import { API_URL } from '@saveup/utils';
import { HttpClient } from '@angular/common/http';
import { FeatureDocuments } from '../index';

export const jobAddedToCommand = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(JobEvents.jobAdded),
      map(({ payload }) => JobCommands.addJob({ payload }))
    );
  },
  { functional: true }
);

export const addJob = createEffect(
  (actions$ = inject(Actions), http = inject(HttpClient)) => {
    return actions$.pipe(
      ofType(JobCommands.addJob),
      mergeMap(({ payload }) =>
        http
          .post<JobsEntity>(API_URL + 'dashboard/jobs', payload)
          .pipe(map((payload) => JobDocuments.job({ payload })))
      )
    );
  },
  { functional: true }
);

export const getJobsFromDashboard = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(FeatureDocuments.dashboard),
      map((c) => c.payload.jobs),
      map((payload) => JobDocuments.jobs({ payload }))
    );
  },
  { functional: true }
);
