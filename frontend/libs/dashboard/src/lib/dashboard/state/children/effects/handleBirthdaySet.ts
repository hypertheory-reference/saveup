import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map } from "rxjs";
import { ChildrenCommands, ChildrenEvents } from "../children.actions";

const from = ChildrenEvents.birthdaySet;
const to = ChildrenCommands.setBirthday;
export const Name = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(from),
      map(action => to({ entity: action.entity, changes: { birthDate: action.changes.birthDate } }))
    );
  },
  { functional: true }
);
