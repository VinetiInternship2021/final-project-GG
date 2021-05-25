/* eslint-disable max-len */
import SignupPage from '../integration/pom/SignupPage';

const signup = (userType, {
  phoneNumber = '', password = '', passwordConfirm = password, firstName = '', lastName = '', email = '', carRegistrationNumber = '', carManufacturer = '', carModel = '', imgPath = '',
}) => {
  const signupPage = new SignupPage();
  signupPage.selectUserType(userType);
  signupPage.fillPhoneNumber(`${phoneNumber}${Math.round(Math.random() * 100)}`);
  signupPage.fillFirstName(firstName);
  signupPage.fillLastName(lastName);
  signupPage.fillEmail(email);
  signupPage.fillPassword(password);
  signupPage.fillPasswordConfirmation(passwordConfirm);

  if (userType === 'Driver') {
    signupPage.fillCarRegistrationNumber(carRegistrationNumber);
    signupPage.fillCarManufacturer(carManufacturer);
    signupPage.fillCarModel(carModel);
    signupPage.uploadPhoto(imgPath);
  }

  signupPage.submit();
};

export default signup;
