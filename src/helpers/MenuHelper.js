import { appRoutes } from '../utils/configs';

const MenuHelper = ({ event, userId }) => {
  let path = '';
  switch (event.currentTarget.getAttribute('data-name')) {
    case 'Settings':
      path = '#';
      break;
    case 'Profile':
      path = `${appRoutes.adminProfile.replace(':id', userId)}`;
      break;
    case 'Clients':
      path = `${appRoutes.adminClients.replace(':id', userId)}`;
      path = `${path.replace(':client', 'passengers')}`;
      break;
    case 'Drivers':
      path = `${appRoutes.adminClients.replace(':id', userId)}`;
      path = `${path.replace(':client', 'drivers')}`;
      break;
    default:
      path = '#';
  }
  return path;
};
export default MenuHelper;
