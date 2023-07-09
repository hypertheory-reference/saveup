import { Component, Input } from '@angular/core';
import { DashboardAllowanceSummary } from '../../models';
import { CurrencyPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [CurrencyPipe],
  selector: 'saveup-db-allowance-summary',
  template: `
    <ul>
      <li>
        Total Weekly Allowance: {{ model.totalWeeklyAllowance | currency }}
      </li>
      <li>
        Total Monthly Allowance: {{ model.totalMonthlyAllowance | currency }}
      </li>
      <li>
        Total Yearly Allowance: {{ model.totalYearlyAllowance | currency }}
      </li>
    </ul>
  `,
})
export class AllowanceSummaryComponent {
  @Input({ required: true }) model!: DashboardAllowanceSummary;
}
