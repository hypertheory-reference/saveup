import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ChildrenEntity } from '.';

export const ChildrenEvents = createActionGroup({
  source: 'Dashboard Children Events',
  events: {
    'Child Added': props<{ payload: ChildrenCreate }>(),
    'Allowance Set': props<Change<ChildrenEntity, 'weeklyAllowance'>>(),
    'Birthday Set': props<Change<ChildrenEntity, 'birthDate'>>(),
    'Requested To Add Child': emptyProps(),
    'Completed Adding Child': props<{ payload: ChildrenAdddedRequestResult }>(),
  },
});

export const ChildrenCommands = createActionGroup({
  source: 'Dashboard Children Commands',
  events: {
    'Add Child': props<{ payload: ChildrenCreate }>(),
    'Set Allowance': props<CommandPayload<ChildrenEntity, 'weeklyAllowance'>>(),
    'Set Birthday': props<CommandPayload<ChildrenEntity, 'birthDate'>>(),
  },
});

export const ChildrenDocuments = createActionGroup({
  source: 'Dashboard Children Documents',
  events: {
    Children: props<{ payload: ChildrenEntity[] }>(),
    Child: props<{ payload: ChildrenEntity }>(),
  },
});
export type CommandPayloadType = { id: string, payload: unknown, changes: unknown, event: string, isSideEffect: true};
export type CommandPayload<TEntity, TProp extends keyof TEntity> = {
  payload: TEntity;
  changes: Record<string, unknown>;
  event: keyof typeof ChildrenCommands
  isCommandSideEffect: true,
  id: string;

}
export type ChildrenCreate = Pick<ChildrenEntity, 'name' | 'birthDate'>;
export type Change<TEntity, TProp extends keyof TEntity> = {
  entity: TEntity;
  changes: Pick<TEntity, TProp>;
}
export type ChildrenAllowanceChange = Change<ChildrenEntity, 'weeklyAllowance'>;



export type ChildrenAdddedRequestResult = 'completed' | 'cancelled';