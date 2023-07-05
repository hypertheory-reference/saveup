import { createActionGroup, emptyProps } from "@ngrx/store";

export const AppEvents = createActionGroup({
    source: 'APP',
    events: {
        'App Started': emptyProps(),
    }
})