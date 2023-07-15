import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { API_URL } from '@saveup/utils';
import { map, mergeMap, tap } from 'rxjs';
import { ChildrenCommands, ChildrenDocuments, ChildrenEntity } from '..';
import { Store } from '@ngrx/store';
import { selectChildEntityById } from '../..';

const from = ChildrenCommands.setBirthday;
const to = ChildrenDocuments.child;
const collectionResource = 'dashboard/children';
const documentResource = 'birthdate';
export const handleSetBirthday = createEffect(
  (
    actions$ = inject(Actions),
    http = inject(HttpClient),
    store = inject(Store)
  ) => {
    return actions$.pipe(
      ofType(from),
      mergeMap((action) =>
        http
          .post<ChildrenEntity>(
            `${API_URL}${collectionResource}/${action.entity.id}/${documentResource}`,
            action.changes
          )
          .pipe(
            concatLatestFrom(() =>
              store.select(selectChildEntityById(action.entity.id))
            ),
            map(
              ([child, entity]) => ({ ...entity, ...child } as ChildrenEntity)
            ),
            map((payload) => to({ payload }) as ReturnType<typeof to>)
          )
      )
    );
  },
  { functional: true, dispatch: true }
);
