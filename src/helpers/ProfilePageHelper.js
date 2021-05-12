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
            last_name: data.user.first_name,
            email: data.user.email,
            car_manufacturer: data.user.car_manufacturer,
            car_model: data.user.car_model,
            car_level: data.user.car_level,
            driver_license_image_id: data.user.driver_license_image_id,
            is_active: data.user.is_active,
            is_verified_by_admin: data.user.is_verified_by_admin,
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
          last_name: data.user.first_name,
          email: data.user.email,
        },
      });
    }
  } else {
    setState(
      {
        ...state,
        exist: false,
      },
    );
  }
};

const getUserData = async ({ state, setState, modelName }) => {
  const params = {
    model: modelName,
    userId: state.userId,
  };
  await modelShow(params)
    .then((response) => setUserData({
      response, state, setState, modelName,
    }));
};

export default getUserData;
