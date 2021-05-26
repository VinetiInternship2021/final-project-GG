import SignupPage from '../pom/SignupPage';
import { passenger, driver } from '../../fixtures/signup.json';
import { existingPassenger, existingDriver } from '../../fixtures/login.json';

describe('User signup', () => {
  const signupPage = new SignupPage();

  beforeEach(() => {
    signupPage.visit();
    cy.intercept('GET', '**/signup').as('signupRequest');
  });

  it('Signs up as passenger', () => {
    cy.signupAsPassenger(passenger);
    cy.signupSucceed();
  });
  it.only('Signs up as driver', () => {
    cy.signupAsDriver(driver);
    cy.signupSucceed();
  });
  it('Signs up as passenger with existing phone number', () => {
    cy.signupAsPassenger({ ...passenger, phoneNumber: existingPassenger.phoneNumber });
    cy.signupFailed();
  });
  it('Signs up as driver with existing phone number', () => {
    cy.signupAsDriver({ ...driver, phoneNumber: existingDriver.phoneNumber });
    cy.signupFailed();
  });
  it('Signs up as driver without phone number', () => {
    cy.signupAsDriver({ ...driver, phoneNumber: '' });
    cy.signupFailed();
  });
  it('Signs up as passenger without phone number', () => {
    cy.signupAsPassenger({ ...passenger, phoneNumber: '' });
    cy.signupFailed();
  });
  it('Signs up as driver with invalid password', () => {
    cy.signupAsDriver({ ...driver, password: 'inv' });
    cy.signupFailed();
  });
  it('Signs up as passenger with invalid password', () => {
    cy.signupAsPassenger({ ...passenger, password: 'inv' });
    cy.signupFailed();
  });
  it('Signs up as passenger without password', () => {
    cy.signupAsPassenger({ ...passenger, password: '' });
    cy.signupFailed();
  });
  it('Signs up as driver without password', () => {
    cy.signupAsDriver({ ...driver, password: '' });
    cy.signupFailed();
  });
  it('Signs up as passenger with wrong password confirmation', () => {
    cy.signupAsDriver({ ...passenger, passwordConfirm: 'typoinapassword' });
    cy.signupFailed();
  });
  it('Signs up as driver with wrong password confirmation', () => {
    cy.signupAsDriver({ ...driver, passwordConfirm: 'typoinapassword' });
    cy.signupFailed();
  });
  it('Signs up as passenger without email', () => {
    cy.signupAsPassenger({ ...passenger, email: '' });
    cy.signupSucceed();
  });

  it('Signs up as driver without email', () => {
    cy.signupAsDriver({ ...driver, email: '' });
    cy.signupSucceed();
  });

  it('Signs up as driver without first name', () => {
    cy.signupAsDriver({ ...driver, firstName: '' });
    cy.signupFailed();
  });
  it('Signs up as driver without last name', () => {
    cy.signupAsDriver({ ...driver, lastName: '' });
    cy.signupFailed();
  });
  it('Signs up as passenger without first name', () => {
    cy.signupAsPassenger({ ...passenger, lastName: '' });
    cy.signupFailed();
  });
  it('Signs up as passenger without last name', () => {
    cy.signupAsPassenger({ ...passenger, lastName: '' });
    cy.signupFailed();
  });

  it('Signs up as driver without car registration number', () => {
    cy.signupAsDriver({ ...driver, carRegistrationNumber: '' });
    cy.signupSucceed();
  });
  it('Signs up as driver without driver license image', () => {
    cy.signupAsDriver({ ...driver, imgPath: '' });
    cy.signupSucceed();
  });
  it('Signs up as driver without car model', () => {
    cy.signupAsDriver({ ...driver, carModel: '' });
    cy.signupSucceed();
  });
  it('Signs up as driver without car manufacturer', () => {
    cy.signupAsDriver({ ...driver, carManufacturer: '' });
    cy.signupSucceed();
  });
});
