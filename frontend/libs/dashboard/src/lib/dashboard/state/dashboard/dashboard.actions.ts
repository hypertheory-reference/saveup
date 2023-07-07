import { createActionGroup, props } from '@ngrx/store';
import { DashboardApiResponse } from '../';

export const DashboardDocuments = createActionGroup({
  source: 'Dashboard Documents',
  events: {
    Dashboard: props<{ payload: DashboardApiResponse }>(),
  },
});

export type DashboardData = Pick<DashboardApiResponse, 'id' | 'familyName'>;
