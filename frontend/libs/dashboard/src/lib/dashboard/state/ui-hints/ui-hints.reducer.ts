import { createReducer, on } from "@ngrx/store";
import { UiHintsCommands } from "./ui-hints.actions";
export const UI_HINTS_FEATURE_KEY = 'uiHints';
export type UiHints = {
  selectedChildId: string | null;
};

const initialState: UiHints = {
  selectedChildId: null,
};

export const reducer = createReducer(initialState,
    on(UiHintsCommands.setSelectedChildId, (s, a) => ({...s, selectedChildId: a.payload})),
    on(UiHintsCommands.clearSelectedChildId, (s) => ({...s, selectedChildId: null}))
    );
