import { TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { selectDashboardModel } from './state';
import { DashboardModel } from './models';
import { AllowanceSummaryComponent } from './pages/home/allowance-summary.component';

const mockDbmodel: DashboardModel = {
  familyName: 'test',
  id: 'test',
  totalChildren: 0,
  allowanceSummary: {
    totalMonthlyAllowance: 0,
    totalWeeklyAllowance: 0,
    totalYearlyAllowance: 0,
  },
  children: [
    {
      id: '1',
      name: 'Henry',
      weeklyAllowance: 0,
      birthDate: null,
    },
  ],
};
describe(DashboardComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(DashboardComponent, {
      add: {
        imports: [AllowanceSummaryComponent],
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
    cy.mount(DashboardComponent);
  });
});
