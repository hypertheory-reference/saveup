import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ChildrenEntity } from '.';

export const ChildrenEvents = createActionGroup({
  source: 'Dashboard Children Events',
  events: {
    'Child Added': props<{ payload: ChildrenCreate }>(),
    'Allowance Set': props<{ payload: ChildrenSetAllowance }>(),
    'Requested To Add Child': emptyProps(),
    'Completed Adding Child': props<{ payload: ChildrenAdddedRequestResult }>(),
  },
});

export const ChildrenCommands = createActionGroup({
  source: 'Dashboard Children Commands',
  events: {
    'Add Child': props<{ payload: ChildrenCreate }>(),
    'Set Allowance': props<{ payload: ChildrenSetAllowance }>(),
    'Set Selected Child Id': props<{ payload: string }>(),
    'Clear Selected Child Id': emptyProps(),
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
  entity: ChildrenEntity;
  changes: ChildrenAllowanceChange;
};

export type ChildrenAdddedRequestResult = 'completed' | 'cancelled';