import { createSelector } from '@ngrx/store';
import { _selectChildrenBranch } from '..';
import * as fromChildren from './children.reducer';
import * as models from '../../models';

const {
  selectAll: selectChildrenEntityArray,
  selectEntities: selectChildEntities,
  selectTotal: selectNumberOfChildren,
} = fromChildren.adapter.getSelectors(_selectChildrenBranch);

export const selectChildrenListmodel = createSelector(
  selectChildrenEntityArray,
  (e) => e as models.ChildListModel[]
);
