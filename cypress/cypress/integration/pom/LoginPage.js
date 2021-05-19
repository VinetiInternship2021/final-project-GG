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
    cy.get('form button[type="submit"]');
  }

  selectUserType(type) {
    cy.contains(type).click();
  }

  visit() {
    cy.visit('/login');
  }
}

export default LoginPage;
