import { ChildrenEntity } from '../state/reducers/children.reducer';
import { JobsEntity } from '../state/reducers/jobs.reducer';

export type ChildListModel = ChildrenEntity;

export type JobListModel = JobsEntity;


export type DashboardModel = {
    id: string;
    familyName: string;
    totalWeeklyAllowance: number;
    totalMonthlyAllowance: number;
    totalYearlyAllowance: number;
    totalChildren: number;
    children: Pick<ChildrenEntity, 'id'| 'name'|'weeklyAllowance'>[];
}