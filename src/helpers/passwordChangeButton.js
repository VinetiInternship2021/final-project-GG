import { useHistory } from 'react-router-dom';
import { appRoutes } from '../utils/configs';

const PasswordChangeButton = (userId, userType) => {
  const history = useHistory();
  let path;
  switch (userType) {
    case 'super_users':
      path = `${appRoutes.admin.passChange.replace(':id', userId)}`;
      break;
    case 'drivers':
      path = `${appRoutes.driver.passChange.replace(':id', userId)}`;
      break;
    case 'passengers':
      path = `${appRoutes.client.passChange.replace(':id', userId)}`;
      break;
    default:
      path = '#';
      history.push(path);
  }
};

export default PasswordChangeButton;
