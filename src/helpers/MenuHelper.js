const MenuHelper = ({ event, userId, user }) => {
  let path;
  switch (event.currentTarget.getAttribute('data-name')) {
    case 'Settings':
      path = `${user.settings.replace(':id', userId)}`;
      break;
    case 'Profile':
      path = `${user.profile.replace(':id', userId)}`;
      break;
    case 'Clients':
      path = `${user.clients.replace(':id', userId)}`;
      path = `${path.replace(':client', 'passengers')}`;
      break;
    case 'Drivers':
      path = `${user.clients.replace(':id', userId)}`;
      path = `${path.replace(':client', 'drivers')}`;
      break;
    case 'New order':
      path = '/taxi';
      break;
    case 'My history':
      path = `${user.history.replace(':id', userId)}`;
      break;
    default:
      path = '#';
  }
  return path;
};

export default MenuHelper;
