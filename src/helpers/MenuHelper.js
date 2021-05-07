const MenuHelper = ({ event, location }) => {
  let path = '';
  switch (event.target.innerText) {
    case 'Settings':
      path = `${location.pathname}/settings`;
      break;
    case 'Profile':
      path = `${location.pathname}/profile`;
      break;
    default:
      path = '';
  }
  return path;
};
export default MenuHelper;
