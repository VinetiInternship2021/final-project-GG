require 'rails_helper'

RSpec.describe Api::V1::PassengersController, type: :controller do

  describe "#create" do
    it "will create a Passenger" do
      expect{ post :create, params: { passenger:{first_name: 'test-first-name', 
        last_name: 'test-last-name', phone_number: 123456788, email: 'example@gmail.com', 
        password:'somepassword', password_confirmation:'somepassword'}, controller: "api/v1/passengers", 
        action: "create"}, as: :json}. to change {Passenger.count}.by(1)
    end
  end

  describe '#update' do
    let!(:passenger) {
      Passenger.create!(id: 1, first_name: "test_first_name", last_name: "test_last_name", password: "test_password", 
        phone_number: 123456789)
    }

    describe 'if the passenger is not logged in' do
      it "will not have access" do      
        put :update, params: { id:1, passenger:{first_name: 'testf-second-name', last_name: 'testf-last-name', 
        phone_number: 1234656788, email: 'example@gmail.com', password:'somepassword', password_confirmation:'somepassword'}, 
        controller: "api/v1/passengers", action: "update"}, as: :json
        expect(JSON.parse(response.body)).to have_value('dont have access')
      end
    end

    describe 'if the passenger is logged in' do
      before(:each) do
        ApplicationController.any_instance.stub(:current_user?).and_return(true)
      end

      it "will update the passenger" do
        put :update, params: { id:1, passenger:{first_name: 'test-second-name', last_name: 'test-last-name', 
          phone_number: 123456788, email: 'example@gmail.com', password:'somepassword', password_confirmation:'somepassword'}, 
          controller: "api/v1/passengers", action: "update"},
          as: :json
        expect(JSON.parse(response.body)).to have_value('saved')
      end
    end
  end
end    