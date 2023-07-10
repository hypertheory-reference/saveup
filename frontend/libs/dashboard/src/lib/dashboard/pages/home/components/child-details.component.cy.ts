import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { selectSelectedChildModel } from '../../../state';
import { ChildrenEntity } from '../../../state/children';
import { ChildDetailsComponent } from './child-details.component';
describe(ChildDetailsComponent.name, () => {
  describe('Empty Props', () => {
    beforeEach(() => {
      const henry: ChildrenEntity = {
        id: '1',
        name: 'Henry',
        birthDate: null,
        weeklyAllowance: null,
      };
      TestBed.overrideComponent(ChildDetailsComponent, {
        add: {
          imports: [],

          providers: [
            provideMockStore({
              initialState: {},
              selectors: [
                {
                  selector: selectSelectedChildModel,
                  value: henry,
                },
              ],
            }),
          ],
        },
      });
      cy.mount(ChildDetailsComponent, {
        componentProperties: {
          id: '1',
        },
      });
    });

    it('should have a set birthdate button', () => {
      cy.get('[data-testid="set-birthdate"]').should('exist');
    });
    it('should have a an assign allowancebutton', () => {
      cy.get('[data-testid="assign-allowance"]').should('exist');
    });
    it('should not have a change allowance button', () => {
      cy.get('[data-testid="change-allowance"]').should('not.exist');
    });
    it('should not have a age display', () => {
        cy.get('[data-testid="age-display"]').should('not.exist');
        }   
    );
    it('should not have a allowance display', () => {
      cy.get('[data-testid="allowance-display"]').should('not.exist');
    });
  });

  describe('With Props', () => {
    beforeEach(() => {
      const henry: ChildrenEntity = {
        id: '1',
        name: 'Henry',
        birthDate: '03-31-2011',
        weeklyAllowance: 25.23,
      };
      TestBed.overrideComponent(ChildDetailsComponent, {
        add: {
          imports: [],

          providers: [
            provideMockStore({
              initialState: {},
              selectors: [
                {
                  selector: selectSelectedChildModel,
                  value: henry,
                },
              ],
            }),
          ],
        },
      });
      cy.mount(ChildDetailsComponent, {
        componentProperties: {
          id: '1',
        },
      });
    });

    it('should not a set birthdate button', () => {
      cy.get('[data-testid="set-birthdate"]').should('not.exist');
    });
    it('should not a assign allowance button', () => {
      cy.get('[data-testid="assign-allowance"]').should('not.exist');
    });
    it('should have a change allowance button', () => {
      cy.get('[data-testid="change-allowance"]').should('exist');
    });
    it('should  have a age display', () => {
      cy.get('[data-testid="age-display"]').should('exist');
    });
    it('should have a allowance display', () => {
      cy.get('[data-testid="allowance-display"]').should('exist');
    });
  });
});
