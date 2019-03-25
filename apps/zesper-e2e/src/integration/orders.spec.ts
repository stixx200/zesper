import { login } from '../support/app.po';

describe('Orders', () => {
  beforeEach(() => {
    login();
  });

  it('highlights orders button in toolbar', () => {
    cy.get('#btn-orders').should('have.class', 'active');
    cy.get('#btn-user').click();
    cy.get('#btn-orders').should('have.not.class', 'active');
    cy.get('#btn-orders').click();
  });
});
