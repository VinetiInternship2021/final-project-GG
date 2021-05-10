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
      history.push(`/${response.data.userType}/${userId}`);
    })
    .catch((response) => {
      dispatch(ChangeActionLoading(false));
      const errors = [];
      if (response.status === 500) {
        errors.push('This phone number registered');
        setFields({ ...fields, alert: errors });
      } else if (!response.updated) {
        try {
          Object.entries(response.errors).map((error) => {
            errors.push(`${error[0]} ${error[1]}`);
            return errors;
          });
          setFields({ ...fields, alert: errors });
        } catch {
          // eslint-disable-next-line no-console
          console.log(response);
        }
      } else {
        setFields({ ...fields, alert: response.message });
      }
    });
};

export default UpdateHelper;
