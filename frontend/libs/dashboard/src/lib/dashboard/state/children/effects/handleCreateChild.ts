import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { API_URL } from '@saveup/utils';
import { map, mergeMap } from 'rxjs';
import { ChildrenEntity } from '..';
import { ChildrenCommands, ChildrenDocuments } from '../children.actions';
import { Store } from '@ngrx/store';

const from = ChildrenCommands.addChild;
const to = ChildrenDocuments.child;
export const persistChild = createEffect(
  (actions$ = inject(Actions), http = inject(HttpClient), store = inject(Store)) => {
    return actions$.pipe(
        ofType(from),
        mergeMap(({ payload }) =>  
            http
            .post<ChildrenEntity>(API_URL + 'dashboard/children', payload)
                .pipe(
                    
                    map((payload) => to({ payload }))
                )
        )
    
    );
  },
  { functional: true, dispatch: true }
);


