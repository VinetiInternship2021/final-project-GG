import { updateUser } from '../utils/API';
import { ChangeActionLoading, ChangeActionLoggedIn } from '../redux/actions';

const UpdateHelper = async (fields, setFields, state, dispatch, history, params) => {
  const { userId } = state;
  await updateUser({ params, userId })
    .then((response) => {
      dispatch(ChangeActionLoggedIn({
        ...state,
        isLoading: false,
      }));
      history.push(`/${response.data.userType}/${response.data.user.id}`);
    })
    .catch((response) => {
      const errors = [];
      if (response.status === 500) {
        errors.push('This phone number registered');
        dispatch(ChangeActionLoading({ isLoading: false }));
        setFields({ ...fields, alert: errors });
      } else if (!response.created) {
        Object.entries(response.errors).map((error) => {
          errors.push(`${error[0]} ${error[1]}`);
          return errors;
        });
        setFields({ ...fields, alert: errors });
      } else {
        setFields({ ...fields, alert: response.message });
      }
    });
};

export default UpdateHelper;
