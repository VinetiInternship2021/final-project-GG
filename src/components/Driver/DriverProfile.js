import React, {Component} from "react"
import axios from 'axios'
import ProfileInfoTable from '../../utils/ProfileInfoTable'
import Loading from '../../utils/Loading'
import {modelShow} from "../../utils/API";

class DriverProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.match.params.id,
      isActive: false,
      userType: 'Driver',
      isLoading: true,
      apiUrl: '',
      user: {}
    }
    this.getUserData = this.getUserData.bind(this)
    this.setUserData = this.setUserData.bind(this)
  }
  
  componentDidMount() {
    this.getUserData()
      .then()
  }
  
  async getUserData() {
    const params = {
      model: 'drivers',
      userId: this.state.userId
    }
    await modelShow(params)
      .then(response => this.setUserData(response))
  }
  
  setUserData(response) {
    response = response.data
    if (response.exist) {
      this.setState(
        {
          ...this.state,
          exist: response.exist,
          isLoading: false,
          user: {
            phone_number: response.user.phone_number,
            first_name: response.user.first_name,
            last_name: response.user.first_name,
            email: response.user.email,
            car_manufacturer: response.user.car_manufacturer,
            car_model: response.user.car_model,
            car_level: response.user.car_level,
            driver_license_image_id: response.user.driver_license_image_id,
            is_active: response.user.is_active,
            is_verified_by_admin: response.user.is_verified_by_admin,
            car_registration_number: response.user.car_registration_number
          }
        }
      )
    }
    else {
      this.setState(
        {
          ...this.state,
          exist: false
        }
      )
    }
  }
  
  render() {
    return (
      <div>
        <div className="card text-center position-absolute top-50 start-50 translate-middle">
          {this.state.isLoading ? <Loading /> : false}
            <table className="table table-borderless">
              <ProfileInfoTable fieldsData={this.state.user}/>
            </table>
        </div>
      </div>
    )
    }
}
export default DriverProfile