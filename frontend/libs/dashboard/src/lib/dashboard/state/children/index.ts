export * from './children.actions';

export * from './children.reducer';
export * as _childrenSelectors from './children.selectors';

export const CHILDREN_FEATURE_KEY = 'children';
export type ChildrenEntity = {
  id: string;
  name: string;
  birthDate: string | null;
  weeklyAllowance: number | null;
};
