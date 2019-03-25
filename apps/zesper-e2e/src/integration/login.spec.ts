import { login } from '../support/app.po';

describe('Login', () => {
  beforeEach(() => {
    login();
  });

  it('check login functionality', () => {
    // assert redirected to /orders page
    cy.url().should('match', /\/orders$/);

    // assert toolbar buttons are available
    cy.get('#btn-orders').should('exist');
    cy.get('#btn-user').should('exist');
    cy.get('#btn-logout').should('exist');

    // click logout button
    cy.get('#btn-logout').click();

    // assert redirected to /login page
    cy.url().should('match', /\/login$/);

    // assert toolbar buttons are not present anymore
    cy.get('#btn-orders').should('not.exist');
    cy.get('#btn-user').should('not.exist');
    cy.get('#btn-logout').should('not.exist');
  });
});
