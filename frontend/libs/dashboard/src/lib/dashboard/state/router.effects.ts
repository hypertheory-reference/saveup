import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { routerNavigationAction } from "@ngrx/router-store";
import { tap } from "rxjs";


@Injectable()
export class RouterEffects {
    logThem$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(routerNavigationAction),
            tap(action => console.log(action)),
            tap(actions => {
                if (
                  actions.payload.event.id === 1 &&
                  actions.payload.event.url ===
                    '/dashboard/home/(create:add-child)'
                ) {
                  this.router.navigate(['/dashboard/home']);
                }
            })
        )
    }, {dispatch: false})
    constructor(private actions$: Actions, private router:Router) {}
}