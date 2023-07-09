import * as fromChildren from './children.reducer';

export const {
  selectAll,
  selectEntities,
  selectTotal,
} = fromChildren.adapter.getSelectors();
