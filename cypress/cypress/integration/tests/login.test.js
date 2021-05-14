import LoginPage from '../pom/LoginPage';
import { passenger, driver } from '../../fixtures/login.json';

describe('Passenger Login', () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    loginPage.visit();
    cy.intercept('GET', '**/login').as('loginRequest');
  });

  it('Logins as passenger without remember me', () => {
    const { phoneNumber, password } = passenger;
    cy.loginAsPassenger(phoneNumber, password);
    cy.loginSucceed();
  });

  it('Logins as admin approved driver without remember me', () => {
    const { phoneNumber, password } = driver;
    cy.loginAsDriver(phoneNumber, password);
    cy.loginSucceed();
  });

  it('Logins as passenger with unexisting phone number', () => {
    const { password } = passenger;
    cy.loginAsPassenger('+37400200200', password);
    cy.loginFailed();
  });

  it('Logins as passenger with wrong password', () => {
    const { phoneNumber } = passenger;
    cy.loginAsPassenger(phoneNumber, 'wrongPassword');
    cy.loginFailed();
  });

  it('Logins as admin approved driver with unexisting phone number', () => {
    const { password } = driver;
    cy.loginAsPassenger('+37400200200', password);
    cy.loginFailed();
  });

  it('Logins as admin approved driver with wrong password', () => {
    const { phoneNumber } = driver;
    cy.loginAsPassenger(phoneNumber, 'wrongPassword');
    cy.loginFailed();
  });

  it('Logins as passenger in driver page', () => {
    const { phoneNumber, password } = passenger;
    cy.loginAsPassenger(phoneNumber, password);
    cy.loginFailed();
  });

  it('Logins as passenger with remember me', () => {
    const { phoneNumber, password } = passenger;
    cy.loginAsPassenger(phoneNumber, password, true);
    cy.loginSucceed();
  });

  it('Logins as admin approved driver witх remember me', () => {
    const { phoneNumber, password } = driver;
    cy.loginAsDriver(phoneNumber, password, true);
    cy.loginSucceed();
  });
});
