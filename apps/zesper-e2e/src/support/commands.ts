// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// add new command to the existing Cypress interface
declare global {
  namespace Cypress {
    interface Greeting {
      greeting: string,
      name: string
    }

    interface Chainable {
      /**
       * Yields sum of the arguments.
       *
       * @memberof Cypress.Chainable
       *
       * @example
       ```
       cy.sum(2, 3).should('equal', 5)
       ```
       */
      login: () => Chainable
    }
  }
}

export function login() {
  cy.fixture('credentials').then(({ email, password }) => {
    cy.visit('/login');
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);
    cy.get('button[type=submit]').click();
  });
}

Cypress.Commands.add('login', login);
