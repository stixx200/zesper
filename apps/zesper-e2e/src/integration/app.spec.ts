import { getToolbar } from '../support/app.po';

describe('Startscreen', () => {
  beforeEach(() => cy.visit('/'));

  it('contains a toolbar', () => {
    // assert redirected to /login
    cy.url().should('contain', '/login');

    // assert correct title in toolbar
    getToolbar().contains('Zesper');
  });
});
