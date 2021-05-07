import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProfileInfoTable from '../../utils/ProfileInfoTable';
import Loading from '../../shared/Animations/Loading';
import getUserData from '../../helpers/ProfilePageHelper';

const DriverProfile = ({ match }) => {
  const [state, setState] = useState({
    userId: match.params.id,
    isActive: false,
    userType: 'Driver',
    isLoading: true,
    apiUrl: '',
    user: {},
  });

  useEffect(() => {
    const modelName = 'drivers';
    getUserData({ state, setState, modelName })
      .then();
  }, []);

  return (
    <div>
      <div className="card text-center position-absolute top-50 start-50 translate-middle">
        {state.isLoading ? <Loading /> : false}
        <table className="table table-borderless">
          <ProfileInfoTable fieldsData={state.user} />
        </table>
      </div>
    </div>
  );
};
DriverProfile.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

// class DriverProfile extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       // eslint-disable-next-line react/prop-types
//       userId: props.match.params.id,
//       isActive: false,
//       userType: 'Driver',
//       isLoading: true,
//       apiUrl: '',
//       user: {},
//     };
//     this.getUserData = this.getUserData.bind(this);
//     this.setUserData = this.setUserData.bind(this);
//   }
//
//   componentDidMount() {
//     this.getUserData()
//       .then();
//   }
//
//   async getUserData() {
//     const params = {
//       model: 'drivers',
//       // eslint-disable-next-line react/destructuring-assignment
//       userId: this.state.userId,
//     };
//     await modelShow(params)
//       .then((response) => this.setUserData(response));
//   }
//
//   setUserData(response) {
//     const { data } = response;
//     // eslint-disable-next-line no-param-reassign
//     response = data;
//     if (response.exist) {
//       this.setState(
//         {
//           // eslint-disable-next-line react/no-access-state-in-setstate
//           ...this.state,
//           exist: response.exist,
//           isLoading: false,
//           user: {
//             phone_number: response.user.phone_number,
//             first_name: response.user.first_name,
//             last_name: response.user.first_name,
//             email: response.user.email,
//             car_manufacturer: response.user.car_manufacturer,
//             car_model: response.user.car_model,
//             car_level: response.user.car_level,
//             driver_license_image_id: response.user.driver_license_image_id,
//             is_active: response.user.is_active,
//             is_verified_by_admin: response.user.is_verified_by_admin,
//             car_registration_number: response.user.car_registration_number,
//           },
//         },
//       );
//     } else {
//       this.setState(
//         {
//           // eslint-disable-next-line react/no-access-state-in-setstate
//           ...this.state,
//           exist: false,
//         },
//       );
//     }
//   }
//
//   render() {
//     return (
//       <div>
//         <div className="card text-center position-absolute top-50 start-50 translate-middle">
//           {/* eslint-disable-next-line react/destructuring-assignment */}
//           {this.state.isLoading ? <Loading /> : false}
//           <table className="table table-borderless">
//             {/* eslint-disable-next-line react/destructuring-assignment */}
//             <ProfileInfoTable fieldsData={this.state.user} />
//           </table>
//         </div>
//       </div>
//     );
//   }
// }
export default DriverProfile;
