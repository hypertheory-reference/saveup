import { TestBed } from '@angular/core/testing';
import { ChildListComponent } from './child-lis.component';

describe(ChildListComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(ChildListComponent, {
      add: {
        imports: [],
        providers: [],
      },
    });
  });

  it('renders', () => {
    cy.mount(ChildListComponent, {
      componentProperties: {
        model: [
          {
            id: '1',
            name: 'Henry',
            weeklyAllowance: 180,
            birthDate: '03-31-2011',
          },
          {
            id: '2',
            name: 'Violet',
            weeklyAllowance: 0,
            birthDate: null,
          },
        ],
      },
    });
  });
});
