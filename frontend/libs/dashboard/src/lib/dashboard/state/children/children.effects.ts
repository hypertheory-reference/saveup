import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, ActionCreator } from '@ngrx/store';
import { filter, map, mergeMap, tap } from 'rxjs';
import {
  ChildrenCommands,
  ChildrenDocuments,
  ChildrenEvents,
  CommandPayloadType,
} from '.';
import { FeatureDocuments } from '../';

import { API_URL } from '@saveup/utils';
const x = ChildrenDocuments.child;
type EventMapping = {
  operator: string;
  operand: unknown;
  method: 'POST' | 'PUT' | 'DELETE';
  document: ActionCreator;
  payload: unknown;
};
// const CommandToEventMap: {
//   [key: string]: (entity: CommandPayload<T>) => EventMapping<ChildrenEntity>;
// } = {
//   'Set Allowance': (entity: ChildrenEntity) => {
//     return {
//       operator: `/children/${entity.id}/allowance`,
//       method: 'POST',
//       operand: entity,
//       document: ChildrenCommands.setBirthday,
//       changes:
//     };
//   },
//   // 'Set Birthday': (id: string) => {
//   //   return {
//   //     operand: `/children/${id}/birthday`,
//   //     operator: 'POST',
//   //     document: ChildrenDocuments.child,
//   //   };
//   // },
// } as const;
type ValuesOf<T> = T[keyof T];
// type ExtractStringKeys<TObj> = ExtractKeysWhereValuesAreOfType<TObj, EventMapping<TObj>>;
type ExtractKeysWhereValuesAreOfType<TObj, TCondition> = ValuesOf<{
  [K in keyof TObj]: TObj[K] extends TCondition ? K : never;
}>;

// class CommandToApiMapper<T> {

//   //   getThingForAllowance(entity: CommandPayloadType) {
//   //   return {
//   //     operator: `/children/${entity.payload.id}/allowance`,
//   //     method: 'POST',
//   //     operand: entity,
//   //     document: ChildrenCommands.setBirthday,
//   //     payload: entity.changes
//   //   };
//   //  }

// }
type Getters<Type> = {
  [Property in keyof Type]: () => EventMapping;
};
function commandToApiMapper(payload: CommandPayloadType) {
  type x = Getters<typeof ChildrenCommands>;

  const y: x = {
    addChild: () => {
      return {
        operator: `/children`,
        method: 'POST',
        operand: payload,
        document: ChildrenCommands.addChild,
        payload: payload.payload,
      };
    },
    setAllowance: () => {
      return {
        operator: `/children/${payload.id}/allowance`,
        method: 'POST',
        operand: payload,
        document: ChildrenCommands.setAllowance,
        payload: payload.changes,
      };
    },
    setBirthday: () => {
      return {
        operator: `/children/${payload.id}/birthday`,
        method: 'POST',
        operand: payload,
        document: ChildrenCommands.setBirthday,
        payload: payload.changes,
      };
    },
  };
  return y;
}

// export const makeCommand = createEffect(
//   (actions$ = inject(Actions)) => {
//     return actions$.pipe(
//       ofType(ChildrenEvents.birthdaySet),
//       tap((a) => console.log({ birthdaySet: a })),
//       map((a) =>
//         ChildrenCommands.setBirthday({
//           id: a.entity.id,
//           payload: a.entity,
//           changes: a.changes,
//           event: 'setBirthday',
//           isCommandSideEffect: true,
//         })
//       )
//     );
//   },
//   { functional: true, dispatch: true }
// );

export const childAddedToCommand = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(ChildrenEvents.childAdded),
      map(({ payload }) => ChildrenCommands.addChild({ payload }))
    );
  },
  { functional: true }
);

// export const setBirthday = createEffect(
//   (actions$ = inject(Actions)) => {
//     return actions$.pipe(
//       ofType(ChildrenEvents.birthdaySet),
//       map(({ payload }) => {
//         const meta = CommandToEventMap['Set Birthday'](payload.entity.id);
//         console.log(meta);
//         const x = meta.document({ payload: payload.entity });
//         console.log(x);
//         //return  ChildrenCommands.setBirthday({ payload, event: CommandToEventMap['Set Allowance'](payload.entity.id) }))
//       })
//     );
//   },
//   { functional: true, dispatch: false }
// );

export const handleCommandToApi = createEffect(
  (actions$ = inject(Actions), http = inject(HttpClient)) => {
    return actions$.pipe(

      filter((action) => 'isCommandSideEffect' in action),
      map((m) => {
        const response: [CommandPayloadType, unknown] = [
          makeIntoPayloadType(m),
          m,
        ];
        return response;
      }),
      map(([mapped, action]: [CommandPayloadType, unknown]) => {
        const response: [{ [key: string]: () => unknown }, unknown] = [
          commandToApiMapper(mapped),
          action,
        ];
        return response;
      }),
      map(([mapped, action]) => {
        const a2 = action as CommandPayloadType;
        const response = mapped[a2.event]() as EventMapping;
        return response;
      }),
      tap((response: EventMapping) => {
        console.log({response});
      }),
      mergeMap((response: EventMapping) => {
        return http
          .request(response.method, API_URL + 'dashboard' + response.operator, {
            body: response.payload,
          })
          .pipe(
            map((payload) => {
              const action = response.document({ payload }) as Action;
              console.log({action});
              return action;
            })
          );
      })
    );
  },

  { functional: true, dispatch: true }
);

function makeIntoPayloadType(action: any): CommandPayloadType {
  return {
    id: action.payload.id,
    payload: action.payload,
    changes: action.changes,
    event: action.event,
    isSideEffect: true,
  };
}
// export const childCreateRequestNavigation = createEffect(
//   (actions$ = inject(Actions), router = inject(Router)) => {
//     return actions$.pipe(
//       ofType(ChildrenEvents.requestedToAddChild),
//       tap(() =>
//         router.navigate([
//           '/dashboard/home',
//           { outlets: { create: 'add-child' } },
//         ])
//       )
//     );
//   },
//   { functional: true, dispatch: false }
// );

export const childCreateRequestCompletedNavigation = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(ChildrenEvents.completedAddingChild),
      tap(() =>
        router.navigate(['/dashboard/home', { outlets: { create: 'null' } }])
      )
    );
  },
  { functional: true, dispatch: false }
);

// export const addChild = createEffect(
//   (actions$ = inject(Actions), http = inject(HttpClient)) => {
//     return actions$.pipe(
//       ofType(ChildrenCommands.addChild),
//       mergeMap(({ payload }) =>
//         http
//           .post<ChildrenEntity>(API_URL + 'dashboard/children', payload)
//           .pipe(map((payload) => ChildrenDocuments.child({ payload })))
//       )
//     );
//   },
//   { functional: true }
// );

// export const adjustAllowance = createEffect(
//   (actions$ = inject(Actions), http = inject(HttpClient)) => {
//     return actions$.pipe(
//       ofType(ChildrenCommands.setAllowance),
//       mergeMap(({ payload }) =>
//         http
//           .post(
//             API_URL + `dashboard/children/${payload.entity.id}/allowance`,
//             payload.changes
//           )
//           .pipe(
//             map(() => ({
//               ...payload.entity,
//               weeklyAllowance: payload.changes.weeklyAllowance,
//             })),
//             map((payload) => ChildrenDocuments.child({ payload }))
//           )
//       )
//     );
//   },
//   { functional: true }
// );

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
