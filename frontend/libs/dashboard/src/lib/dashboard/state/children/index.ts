export * from './children.actions';
export * from './children.effects';
export * from './children.reducer';

export type ChildrenEntity = {
  id: string;
  name: string;
  birthDate: string | null;
  weeklyAllowance: number | null;
};
