require 'rails_helper'

RSpec.describe Api::V1::CoordinatesController, type: :controller do
  describe "#update_driver_coordinates" do
    let!(:driver) {
      Driver.create!(id: 1, first_name: "test_first_name", last_name: "test_last_name", password: "test_password", 
        car_manufacturer: "test_car_manufacturer", car_model: "test_car_model", phone_number: 123456789)
    }
    it "creates a user" do
      post :update_driver_coordinates, params: {id: 1, coordinates: {latitude: 123, longitude: 456}}
      driver.reload
      expect(driver.latitude).to eq(123)
      expect(driver.longitude).to eq(456)
    end
  end

  describe "#create_reservation" do
    let(:driver) {
      Driver.create!(id: 1, first_name: "test_first_name", last_name: "test_last_name", password: "test_password", 
        car_manufacturer: "test_car_manufacturer", car_model: "test_car_model", phone_number: 123456789)
    }
    let(:passenger) {
      Passenger.create!(id: 1, first_name: "test_first_name", last_name: "test_last_name", password: "test_password", 
        phone_number: 123456789)
    }
    describe "when reservation exists" do
      let!(:reservation) {
        Reservation.create!(driver_id: driver.id, passenger_id: passenger.id, status: 'unassigned')
      }
      it "will not create a new reservation" do
        expect { post :create_reservation, params: {driverId: 1} }.to change { Reservation.count }.by(0)
      end
    end
    describe "when reservation doesn't exists" do
      it "will create reservation" do
        expect { post :create_reservation, params: {driverId:driver.id, passengerId: passenger.id, pickUpLocation:{lat:1234, lng:7894}, 
        dropOffLocation:{lat:4568, lng:7894}, price:1200} }. to change {Reservation.count}.by(1)
      end
    end
  end

  describe "active_drivers" do
    describe "when active drivers exist" do
      let!(:driver) {
        Driver.create!(id: 1, first_name: "test_first_name", last_name: "test_last_name", password: "test_password",
          car_manufacturer: "test_car_manufacturer", car_model: "test_car_model", phone_number: 123456789, is_active: true, car_level: 'Econom')
        Driver.create!(id: 2, first_name: "test_first_name", last_name: "test_last_name", password: "test_password",
          car_manufacturer: "test_car_manufacturer", car_model: "test_car_model", phone_number: 123456799, is_active: true, car_level: 'Econom')
      }
      
      it "will find active drivers" do
        post :active_drivers, params: {carType: 'Econom'} 
        expect(JSON.parse(response.body)).to have_key('drivers')
      end
    end

    describe "when active drivers does not exist" do
      let!(:driver) {
        Driver.create!(id: 1, first_name: "test_first_name", last_name: "test_last_name", password: "test_password",
          car_manufacturer: "test_car_manufacturer", car_model: "test_car_model", phone_number: 123456789, is_active: false, car_level: 'Econom')
        Driver.create!(id: 2, first_name: "test_first_name", last_name: "test_last_name", password: "test_password",
          car_manufacturer: "test_car_manufacturer", car_model: "test_car_model", phone_number: 123456799, is_active: false, car_level: 'Econom')
      }

      it "will not find active drivers" do
        post :active_drivers, params: {carType: 'Econom'} 
        expect(JSON.parse(response.body)).to have_value('error!, no driver')
      end
    end
  end

  describe "rate_driver" do
    let!(:driver) {
      Driver.create!(id: 1, first_name: "test_first_name", last_name: "test_last_name", password: "test_password", 
        car_manufacturer: "test_car_manufacturer", car_model: "test_car_model", phone_number: 123456789, is_active: false, car_level: 'Econom')
    }
    let(:passenger) {
      Passenger.create!(id: 1, first_name: "test_first_name", last_name: "test_last_name", password: "test_password", phone_number: 123456789)
    }
    let!(:reservation) {
      Reservation.create!(driver_id: driver.id, passenger_id: passenger.id, created_at: '02.05.2021')
      Reservation.create!(driver_id: driver.id, passenger_id: passenger.id, created_at: '03.05.2021')
      
    }
    it "will add rationg for driver" do
      post :rate_driver, params: {rate: 5, passengerId:1} 
      expect(JSON.parse(response.body)).to have_value('rating has been updated')
    end
  end

  describe "reservation" do
    let!(:driver) {
      Driver.create!(id: 1, first_name: "test_first_name", last_name: "test_last_name", password: "test_password", 
        car_manufacturer: "test_car_manufacturer", car_model: "test_car_model", phone_number: 123456789, is_active: false, car_level: 'Econom')
    }
    let(:passenger) {
      Passenger.create!(id: 1, first_name: "test_first_name", last_name: "test_last_name", password: "test_password", phone_number: 123456789)
    }
    let!(:reservation) {
      Reservation.create!(driver_id: driver.id, passenger_id: passenger.id, created_at: '02.05.2021', status: 'unassigned')
    }

    describe "when reservation exists" do
      it "will find the resevation" do
        post :reservation, params: {id: 1} 
        expect(JSON.parse(response.body)).to have_key('data')
      end
    end
    describe "when reservation does not exists" do
      it "will not find the resevation" do
        post :reservation, params: {id: 2}
        expect(JSON.parse(response.body)).to have_value('error! no reservation matched the request')
      end
    end
  end

  describe "confirm_reservation" do
    let!(:driver) {
      Driver.create!(id: 1, first_name: "test_first_name", last_name: "test_last_name", password: "test_password", 
        car_manufacturer: "test_car_manufacturer", car_model: "test_car_model", phone_number: 123456789, is_active: true, car_level: 'Econom')
    }
    let(:passenger) {
      Passenger.create!(id: 1, first_name: "test_first_name", last_name: "test_last_name", password: "test_password", 
        phone_number: 123456789)
    }
    let!(:reservation) {
      Reservation.create!(driver_id: driver.id, passenger_id: passenger.id, created_at: '02.05.2021', status: 'unassigned')
    }
    
    describe "when reservation and driver exist" do
      it "will change the reservation status to assigned and driver is_active to false" do
        post :confirm_reservation, params: {id: 1} 
        expect(JSON.parse(response.body)).to have_value('reservation has been saved with status assigned, and driver is_active set to false')
      end
    end
  end

  describe "assigned_reservation" do
    let!(:driver) {
      Driver.create!(id: 1, first_name: "test_first_name", last_name: "test_last_name", password: "test_password", 
        car_manufacturer: "test_car_manufacturer", car_model: "test_car_model", phone_number: 123456789, is_active: false, car_level: 'Econom')
    }
    let(:passenger) {
      Passenger.create!(id: 1, first_name: "test_first_name", last_name: "test_last_name", password: "test_password", 
        phone_number: 123456789)
    }
    let!(:reservation) {
      Reservation.create!(driver_id: driver.id, passenger_id: passenger.id, created_at: '02.05.2021', status: 'assigned')
    }

    describe "when reservation exists" do
      it "will find the resevation" do
        post :assigned_reservation, params: {id: 1} 
        expect(JSON.parse(response.body)).to have_value('driver confirmed the trip and is on the way')
      end
    end
    describe "when reservation does not exists" do
      it "will not find the resevation" do
        post :assigned_reservation, params: {id: 2}
        expect(JSON.parse(response.body)).to have_value('error')
      end
    end
  end

  describe "delete_reservation" do
    let!(:driver) {
      Driver.create!(id: 1, first_name: "test_first_name", last_name: "test_last_name", password: "test_password", 
        car_manufacturer: "test_car_manufacturer", car_model: "test_car_model", phone_number: 123456789, is_active: false, car_level: 'Econom')
    }
    let(:passenger) {
      Passenger.create!(id: 1, first_name: "test_first_name", last_name: "test_last_name", password: "test_password", phone_number: 123456789)
    }
    let!(:reservation) {
      Reservation.create!(driver_id: driver.id, passenger_id: passenger.id, created_at: '02.05.2021', status: 'assigned')
    }

    describe "when reservation exists" do
      it "will delete the resevation" do
        post :delete_reservation, params: {reservationId: 1} 
        expect(JSON.parse(response.body)).to have_value('reservation number 1 has been deleted')
      end
    end
  end

  describe "arrived" do
    let!(:driver) {
      Driver.create!(id: 1, first_name: "test_first_name", last_name: "test_last_name", password: "test_password", 
        car_manufacturer: "test_car_manufacturer", car_model: "test_car_model", phone_number: 123456789, is_active: false, car_level: 'Econom')
    }
    let!(:passenger) {
      Passenger.create!(id: 1, first_name: "test_first_name", last_name: "test_last_name", password: "test_password", phone_number: 123456789)
    }
    let!(:reservation) {
      Reservation.create!(driver_id: driver.id, passenger_id: passenger.id, created_at: '02.05.2021', status: 'assigned')
    }

    describe "when reservation exists" do
      it "will change the status to arrived" do
        post :arrived, params: {id: 1} 
        expect(JSON.parse(response.body)).to have_value('reservation has been saved with status arrived')
      end
    end
  end

  describe "pickup" do
    let!(:driver) {
      Driver.create!(id: 1, first_name: "test_first_name", last_name: "test_last_name", password: "test_password", 
        car_manufacturer: "test_car_manufacturer", car_model: "test_car_model", phone_number: 123456789, is_active: false, car_level: 'Econom')
    }
    let!(:passenger) {
      Passenger.create!(id: 1, first_name: "test_first_name", last_name: "test_last_name", password: "test_password", phone_number: 123456789)
    }
    let!(:reservation) {
      Reservation.create!(driver_id: driver.id, passenger_id: passenger.id, created_at: '02.05.2021', status: 'arrived')
    }

    describe "when reservation exists" do
      it "will change the status to pickup" do
        post :pickup, params: {id: 1} 
        expect(JSON.parse(response.body)).to have_value('reservation has been saved with status picked up')
      end
    end
  end

  describe "complete" do
    let!(:driver) {
      Driver.create!(id: 1, first_name: "test_first_name", last_name: "test_last_name", password: "test_password", 
        car_manufacturer: "test_car_manufacturer", car_model: "test_car_model", phone_number: 123456789, is_active: false, car_level: 'Econom')
    }
    let!(:passenger) {
      Passenger.create!(id: 1, first_name: "test_first_name", last_name: "test_last_name", password: "test_password", phone_number: 123456789)
    }
    let!(:reservation) {
      Reservation.create!(driver_id: driver.id, passenger_id: passenger.id, created_at: '02.05.2021', status: 'picked up')
    }

    describe "when reservation exists" do
      it "will change the status to complete" do
        post :complete, params: {id: 1} 
        expect(JSON.parse(response.body)).to have_value('reservation has been saved with status complete')
      end
    end
  end

  describe "driver_arrived_message" do
    let!(:driver) {
      Driver.create!(id: 1, first_name: "test_first_name", last_name: "test_last_name", password: "test_password", 
        car_manufacturer: "test_car_manufacturer", car_model: "test_car_model", phone_number: 123456789, is_active: false, car_level: 'Econom')
    }
    let!(:passenger) {
      Passenger.create!(id: 1, first_name: "test_first_name", last_name: "test_last_name", password: "test_password", phone_number: 123456789)
    }
    let!(:reservation) {
      Reservation.create!(driver_id: driver.id, passenger_id: passenger.id, created_at: '02.05.2021', status: 'arrived')
    }

    describe "when reservation exists" do
      it "will send the status: driver has arrived" do
        post :driver_arrived_message, params: {id: 1} 
        expect(JSON.parse(response.body)).to have_value('driver has arrived')
      end
    end

    describe "when reservation does not exist" do
      it "will throw an error" do
        post :driver_arrived_message, params: {id: 2} 
        expect(JSON.parse(response.body)).to have_value('error')
      end
    end
  end
end