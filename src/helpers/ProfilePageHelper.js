import { modelShow } from '../utils/API';

const setUserData = ({
  response, state, setState, modelName,
}) => {
  const { data } = response;
  if (data.exist) {
    if (modelName === 'drivers') {
      setState(
        {
          ...state,
          exist: data.exist,
          isLoading: false,
          user: {
            phone_number: data.user.phone_number,
            first_name: data.user.first_name,
            last_name: data.user.last_name,
            email: data.user.email,
            car_manufacturer: data.user.car_manufacturer,
            car_model: data.user.car_model,
            car_level: data.user.car_level,
            driver_license_image_id: data.user.driver_license_image_id,
            is_active: data.user.is_active,
            is_verified_by_admin: data.user.is_verified_by_admin,
            reservations: data.user.reservations,
            car_registration_number: data.user.car_registration_number,
          },
        },
      );
    } else {
      setState({
        ...state,
        exist: data.exist,
        isLoading: false,
        user: {
          phone_number: data.user.phone_number,
          first_name: data.user.first_name,
          last_name: data.user.last_name,
          email: data.user.email,
          reservations: data.user.reservations,
        },
      });
    }
  } else {
    setState(
      {
        ...state,
        exist: false,
        isLoading: false,
      },
    );
  }
};

const getUserData = async ({
  state, setState, modelName, userId,
}) => {
  const params = {
    model: modelName,
  };
  if (typeof userId === 'number') {
    params.userId = userId;
  } else params.userId = state.userId;

  await modelShow(params)
    .then((response) => setUserData({
      response, state, setState, modelName,
    }));
};

export default getUserData;
