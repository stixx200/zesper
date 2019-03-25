export const getToolbar = () => cy.get('zesper-navbar mat-toolbar');
export const login = () =>
  cy.fixture('credentials').then(({ email, password }) => {
    cy.visit('/login');
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);
    cy.get('button[type=submit]').click();
  });
