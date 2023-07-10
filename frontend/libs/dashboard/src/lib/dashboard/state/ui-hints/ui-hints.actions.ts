import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const UiHintsCommands = createActionGroup({
    source: 'Dashboard Ui Hints Commands',
    events: {
        'Set Selected Child Id': props<{ payload: string }>(),
        'Clear Selected Child Id': emptyProps(),
    }
})

