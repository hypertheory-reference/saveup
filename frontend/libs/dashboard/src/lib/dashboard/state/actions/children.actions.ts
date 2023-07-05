import { createActionGroup, props } from '@ngrx/store';
import { ChildrenEntity } from '../reducers/children.reducer';

export const ChildrenEvents = createActionGroup({
  source: 'Dashboard Children Events',
  events: {
    'Child Added': props<{ payload: ChildrenCreate }>(),
  },
});

export const ChildrenCommands = createActionGroup({
  source: 'Dashboard Children Commands',
  events: {
    'Add Child': props<{ payload: ChildrenCreate }>(),
  },
});

export const ChildrenDocuments = createActionGroup({
  source: 'Dashboard Children Documents',
  events: {
    Children: props<{ payload: ChildrenEntity[] }>(),
    Child: props<{ payload: ChildrenEntity }>(),
  },
});

export type ChildrenCreate = Omit<ChildrenEntity, 'id'>;
