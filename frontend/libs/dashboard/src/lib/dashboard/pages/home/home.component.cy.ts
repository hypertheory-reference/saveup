import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AllowanceSummaryComponent } from './allowance-summary.component';
import { DashboardModel } from '../../models';
import { HomeComponent } from './home.component';
import { selectDashboardModel } from '../../state';
import { ChildListComponent } from './child-lis.component';
const mockDbmodel: DashboardModel = {
  familyName: 'test',
  id: 'test',
  totalChildren: 1,
  allowanceSummary: {
    totalMonthlyAllowance: 180 * 4,
    totalWeeklyAllowance: 180,
    totalYearlyAllowance: 180 * 52,
  },
  children: [
    {
      id: '1',
      name: 'Henry',
      weeklyAllowance: 180,
      birthDate: '03-31-2011',
    },
  ],
};
describe(HomeComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(HomeComponent, {
      add: {
        imports: [AllowanceSummaryComponent, ChildListComponent],
        providers: [
          provideMockStore({
            selectors: [
              {
                selector: selectDashboardModel,
                value: mockDbmodel,
              },
            ],
          }),
        ],
      },
    });
  });

  it('renders', () => {
    cy.mount(HomeComponent);
  });
});
