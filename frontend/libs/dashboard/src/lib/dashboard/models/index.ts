import { ChildrenEntity } from '../state/children';
import { JobsEntity } from '../state/jobs';

export type ChildListModel = ChildrenEntity;

export type JobListModel = JobsEntity;

export type DashboardModel = {
  id: string;
  familyName: string;
  totalWeeklyAllowance: number;
  totalMonthlyAllowance: number;
  totalYearlyAllowance: number;
  totalChildren: number;
  children: Pick<ChildrenEntity, 'id' | 'name' | 'weeklyAllowance'>[];
};
