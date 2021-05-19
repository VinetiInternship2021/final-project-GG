import LoginPage from '../integration/pom/LoginPage';

const login = (phoneNumber, password, userType, rememberMe = false) => {
  const loginPage = new LoginPage();

  loginPage.selectUserType(userType);
  loginPage.fillPhoneNumber(phoneNumber);
  loginPage.fillPassword(password);

  if (rememberMe) loginPage.checkRememberMe();

  loginPage.submit();
};

export default login;
