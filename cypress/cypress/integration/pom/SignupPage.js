/* eslint-disable class-methods-use-this */
class SignupPage {
  constructor() {
    this.userType = 'passenger';
  }

  fillPhoneNumber(phoneNumber) {
    if (phoneNumber.length) cy.get('form input[type="tel"]').type(phoneNumber);
  }

  fillFirstName(firstName) {
    if (firstName.length) cy.get('form input#first_name').type(firstName);
  }

  fillLastName(lastName) {
    if (lastName.length) cy.get('form input#last_name').type(lastName);
  }

  fillEmail(email) {
    if (email.length) cy.get('form input#email').type(email);
  }

  fillCarManufacturer(carManufacturer) {
    if (carManufacturer.length) cy.get('form input#car_manufacturer').type(carManufacturer);
  }

  fillCarModel(carModel) {
    if (carModel.length) cy.get('form input#car_model').type(carModel);
  }

  fillCarRegistrationNumber(carRegistrationNumber) {
    if (carRegistrationNumber.length) cy.get('form input#car_registration_number').type(carRegistrationNumber);
  }

  fillPassword(password) {
    if (password.length) cy.get('form input#password').type(password, { sensitive: true });
  }

  fillPasswordConfirmation(password) {
    if (password.length) cy.get('form input#password_confirmation').type(password, { sensitive: true });
  }

  uploadPhoto(imgPath) {
    if (imgPath) {
      cy.fixture(imgPath).as('logo');
      // eslint-disable-next-line func-names
      cy.fixture(imgPath).then((fileContent) => {
        cy.get('input#driver_license_image_id').attachFile({
          fileContent: fileContent.toString(),
          fileName: imgPath,
          mimeType: 'image/jpeg',
        });
      });
    }
  }

  submit() {
    cy.get('.body form button[type="submit"]').click();
  }

  selectUserType(type) {
    this.userType = type;
    cy.contains(type).click();
  }

  visit() {
    cy.visit('signup');
  }
}

export default SignupPage;
