import { getUser } from '../utils/API';
import { ActionAddUsersList, ActionClearUsersList } from '../redux/actions';

const GetUsers = async ({ client, dispatch }) => {
  await getUser(client)
    .then((response) => {
      dispatch(ActionAddUsersList({ usersList: response.data }));
    })
    .catch(() => dispatch(ActionClearUsersList()));
};

export default GetUsers;
