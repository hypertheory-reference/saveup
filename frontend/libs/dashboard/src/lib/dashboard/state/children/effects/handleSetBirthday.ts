import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { API_URL } from '@saveup/utils';
import { map, mergeMap } from 'rxjs';
import { ChildrenCommands, ChildrenDocuments, ChildrenEntity } from '..';

const from = ChildrenCommands.setBirthday;
const to = ChildrenDocuments.child;

export default  createEffect(
  (actions$ = inject(Actions), http = inject(HttpClient)) => {
    return actions$.pipe(
        ofType(from),
        mergeMap(({ payload }) =>  
            http
            .post<ChildrenEntity>(API_URL + `Path`, payload)
                .pipe(
                    map((payload) => to({ payload }))
                )
        )
    
    );
  },
  { functional: true, dispatch: true }
);
