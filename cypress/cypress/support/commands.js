/* eslint-disable import/no-extraneous-dependencies */
import signup from '../actions/signup';
import login from '../actions/login';
import 'cypress-file-upload';

Cypress.Commands.add('loginAsPassenger', (phoneNumber, password, rememberMe = false) => {
  login(phoneNumber, password, 'Client', rememberMe);
});
Cypress.Commands.add('loginAsDriver', (phoneNumber, password, rememberMe = false) => {
  login(phoneNumber, password, 'Client', rememberMe);
});
Cypress.Commands.add('loginSucceed', () => {
  cy.get('nav form button').should('contain', 'Profile');
  cy.wait('@loginRequest').its('response.statusCode').should('be.oneOf', [200, 304]);
});
Cypress.Commands.add('loginFailed', () => {
  cy.wait('@loginRequest').its('response.statusCode').should('be.equal', 422);
});

Cypress.Commands.add('signupAsPassenger', (credentials) => {
  signup('Client', credentials);
});
Cypress.Commands.add('signupAsDriver', (credentials) => {
  signup('Driver', credentials);
});
Cypress.Commands.add('signupSucceed', () => {
  cy.get('nav form button').should('contain', 'Profile');
  cy.wait('@singupRequest').its('response.statusCode').should('be.oneOf', [200, 304]);
});
Cypress.Commands.add('signupFailed', (message) => {
  cy.wait('@singupRequest').its('response.statusCode').should('be.equal', 422);
  if (message) cy.get('#error_explanation').invoke('text').should('include', message);
});
