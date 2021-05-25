import login from '../actions/login';

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
