import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map } from "rxjs";
import { ChildrenCommands, ChildrenEvents } from "../children.actions";

const from = ChildrenEvents.childAdded;
const to = ChildrenCommands.addChild;
export const handleChildCreated = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(from),
      map(({ payload }) => to({ payload }))
    );
  },
  { functional: true }
);


