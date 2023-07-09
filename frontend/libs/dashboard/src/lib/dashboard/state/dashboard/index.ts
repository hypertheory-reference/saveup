export * from './dashboard.actions';
export * from './dashboard.effects';
export * from './dashboard.reducer';

export const DASHBOARD_FEATURE_KEY = 'dashboard';
export type DashboardState = {
  id: string;
  familyName: string;
};

export const selectDashboardState = (state:DashboardState) => state;