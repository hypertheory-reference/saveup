import { createActionGroup, props } from '@ngrx/store';
import { ChildrenEntity } from '../reducers/children.reducer';

export const ChildrenEvents = createActionGroup({
  source: 'Dashboard Children Events',
  events: {
    'Child Added': props<{ payload: ChildrenCreate }>(),
    'Allowance Set': props<{ payload: ChildrenSetAllowance }>(),
  },
});

export const ChildrenCommands = createActionGroup({
  source: 'Dashboard Children Commands',
  events: {
    'Add Child': props<{ payload: ChildrenCreate }>(),
    'Set Allowance': props<{ payload: ChildrenSetAllowance }>(),
  },
});

export const ChildrenDocuments = createActionGroup({
  source: 'Dashboard Children Documents',
  events: {
    Children: props<{ payload: ChildrenEntity[] }>(),
    Child: props<{ payload: ChildrenEntity }>(),
  },
});

export type ChildrenCreate = Pick<ChildrenEntity, 'name' | 'birthDate'>;

export type ChildrenAllowanceChange = Pick<ChildrenEntity, 'weeklyAllowance'>;
export type ChildrenSetAllowance = {
  entity: ChildrenEntity,
  changes: ChildrenAllowanceChange
}