import { createActionGroup, props } from '@ngrx/store';
import { ChildrenEntity } from '.';

export const ChildrenEvents = createActionGroup({
  source: 'Dashboard Children Events',
  events: {
    'Child Added': props<ChildrenCreate>(),
    'Allowance Set': props<Change<ChildrenEntity, 'weeklyAllowance'>>(),
    'Birthday Set': props<Change<ChildrenEntity, 'birthDate'>>(),
   
  },
});

export const ChildrenCommands = createActionGroup({
  source: 'Dashboard Children Commands',
  events: {
   'Add Child': props<ChildrenCreate>(),
   'Set Birthday': props<Change<ChildrenEntity, 'birthDate'>>(),
  },
});

export const ChildrenDocuments = createActionGroup({
  source: 'Dashboard Children Documents',
  events: {
    Children: props<{ payload: ChildrenEntity[] }>(),
    Child: props<{ payload: ChildrenEntity }>(),
  },
});

export type ChildrenCreate = {
  payload: Pick<ChildrenEntity, 'name'>;
};
export type Change<TEntity, TProp extends keyof TEntity> = {
  payload: {
    entity: TEntity;
  changes: Pick<TEntity, TProp>;
  }
}
export type ChildrenAllowanceChange = Change<ChildrenEntity, 'weeklyAllowance'>;



