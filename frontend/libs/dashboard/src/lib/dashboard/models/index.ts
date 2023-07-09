import { ChildrenEntity } from '../state/children';
import { JobsEntity } from '../state/jobs';

export type ChildListModel = ChildrenEntity;

export type JobListModel = JobsEntity;

export type DashboardModel = {
  id: string;
  familyName: string;
  allowanceSummary: DashboardAllowanceSummary;
  totalChildren: number;
  children: ChildListModel[];
};

export type DashboardAllowanceSummary = {
  totalWeeklyAllowance: number;
  totalMonthlyAllowance: number;
  totalYearlyAllowance: number;
};
