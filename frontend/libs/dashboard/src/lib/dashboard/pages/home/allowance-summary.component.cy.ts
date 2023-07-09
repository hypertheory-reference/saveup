import { TestBed } from '@angular/core/testing';
import { AllowanceSummaryComponent } from './allowance-summary.component';

describe(AllowanceSummaryComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(AllowanceSummaryComponent, {
      add: {
        imports: [],
        providers: [],
      },
    });
  });

  it('renders', () => {
    cy.mount(AllowanceSummaryComponent);
  });
});
