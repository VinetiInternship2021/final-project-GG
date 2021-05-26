require 'rails_helper'

RSpec.describe Api::V1::DriversController, type: :controller do

  describe "#create" do
    it "will create a Driver" do
      expect{ post :create, params: { driver:{first_name: 'test-first-name', last_name: 'test-last-name', phone_number: 123456788,
        email: 'example@gmail.com', car_manufacturer: 'mercedes', car_model:'astra', car_registration_number: "", car_level: 'Econom',
        password:'somepassword', password_confirmation:'somepassword', driver_license_image_id: ""}, controller: "api/v1/drivers", action: "create"},
        as: :json}. to change {Driver.count}.by(1)
    end
  end

  describe '#update' do
    let!(:driver) {
      Driver.create!(id: 1, first_name: "test_first_name", last_name: "test_last_name", password: "test_password", 
        car_manufacturer: "test_car_manufacturer", car_model: "test_car_model", phone_number: 123456789, is_active: false, car_level: 'Econom')
    }
    
    describe 'if the driver is not logged in' do
      it "will not have access" do      
        post :update, params: { id:1, driver:{first_name: 'test-second-name', last_name: 'test-last-name', phone_number: 123456788,
          email: 'example@gmail.com', car_manufacturer: 'mercedes', car_model:'astra', car_registration_number: "", car_level: 'Econom',
          password:'somepassword', password_confirmation:'somepassword', driver_license_image_id: ""}, controller: "api/v1/drivers", action: "update"},
          as: :json
        expect(JSON.parse(response.body)).to have_value('dont have access')
      end
    end
    
    describe 'if the driver is logged in' do
      before(:each) do
        ApplicationController.any_instance.stub(:current_user?).and_return(true)
      end

      it "will update the driver" do
        post :update, params: { id:1, driver:{first_name: 'test-second-name', last_name: 'test-last-name', phone_number: 123456788,
          email: 'example@gmail.com', car_manufacturer: 'mercedes', car_model:'astra', car_registration_number: "", car_level: 'Econom',
          password:'somepassword', password_confirmation:'somepassword', driver_license_image_id: ""}, controller: "api/v1/drivers", action: "update"},
          as: :json
        expect(JSON.parse(response.body)).to have_value('saved')
      end
    end
  end
end    