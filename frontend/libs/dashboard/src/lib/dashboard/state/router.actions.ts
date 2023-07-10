import { NavigationExtras } from "@angular/router";
import { createActionGroup, props } from "@ngrx/store";

export const RouterCommands = createActionGroup({
    source: 'Router Router Commands',
    events: {
        'go': props<{payload: {path: string[], extras?: NavigationExtras}}>(),
    }
})