/* eslint-disable class-methods-use-this */
class LoginPage {
  fillPhoneNumber(phoneNumber) {
    cy.get('form input#phone').type(phoneNumber);
  }

  fillPassword(password) {
    cy.get('form input#password').type(password, { sensitive: true });
  }

  checkRememberMe() {
    cy.get('form input[name="rememberMe"]').check();
  }

  submit() {
    cy.intercept('GET', '**/login').as('loginRequest');
    cy.get('form[class="text-center w-25 border position-absolute top-50 start-50 translate-middle"] button[type="submit"]');
  }

  selectUserType(type) {
    cy.contains(type).click();
  }

  visit() {
    cy.visit('/login');
  }
}

export default LoginPage;
