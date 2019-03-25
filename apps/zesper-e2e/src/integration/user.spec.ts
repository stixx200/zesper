import { login } from '../support/app.po';

describe('User', () => {
  beforeEach(() => {
    login();
    cy.get('#btn-user').click();
  });

  it('shows user data', () => {
    cy.get('#btn-user').should('have.class', 'active');
    cy.get('#btn-orders').click();
    cy.get('#btn-user').should('have.not.class', 'active');
    cy.get('#btn-user').click();
  });
});
