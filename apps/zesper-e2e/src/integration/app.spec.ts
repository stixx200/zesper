import { getTitle } from '../support/app.po';

describe('Startscreen', () => {
  beforeEach(() => cy.visit('/'));

  it('shows page title', () => {
    getTitle().contains('Zesper');
  });
});
