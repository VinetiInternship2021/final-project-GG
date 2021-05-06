import { login } from '../utils/API';
import { ChangeActionLoading, ChangeActionLoggedIn } from '../redux/actions';

const LoginHelper = async (fields, setFields, state, dispatch, history) => {
  const params = {
    session: {
      ...fields,
      remember_me: fields.remember_me === true ? '1' : '0',
    },
  };
  await login(params)
    .then((response) => {
      dispatch(ChangeActionLoggedIn({
        ...state,
        isLoading: false,
        loggedIn: true,
        userType: response.data.model_name,
        userId: response.data.user.id,
      }));
      history.push(`/${response.data.model_name}/${response.data.user.id}`);
    })
    .catch((response) => {
      dispatch(ChangeActionLoading(false));
      setFields({ ...fields, alert: response.message });
    });
};

export default LoginHelper;
