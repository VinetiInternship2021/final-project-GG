class Api::V1::CoordinatesController < ApplicationController
  # def createCoordinateDriver
  def updateDriverCoordinates
    driver = Driver.find(params[:id])
    driver.latitude = params[:coordinates][:latitude]
    driver.longitude = params[:coordinates][:longitude]
    if driver.save
      render json: { message: 'driver coordinates has been saved' }
    else
      #   render status: :unprocessable_entity
      render json: { message: 'error! driver coordinates has not been saved' }
    end
  end

  # def getCoordinateDrivers
  def getActiveDrivers
    drivers = Driver.where('LENGTH(latitude) > 0')
    array = []
    drivers.each do |driver|
      elem = { id: driver.id, latitude: driver.latitude, longitude: driver.longitude }
      array << elem
    end
    if array.length.positive?
      render json: { drivers: array }
    else
      #   render status: :unprocessable_entity
      render json: { message: 'error!, no driver' }
    end
  end

  # def trip_nearestdriver
  def createReservation
    reservation = Reservation.find_by(driver_id: params[:id], status: 'unassigned')
    return if reservation

    passenger = Passenger.find(params[:passengerId])
    reservation = passenger.reservations.create(driver_id: params[:driverId])
    reservation.pickupLat = params[:pickUpLocation][:lat]
    reservation.pickupLng = params[:pickUpLocation][:lng]
    reservation.dropoffLat = params[:dropOffLocation][:lat]
    reservation.dropoffLng = params[:dropOffLocation][:lng]
    reservation.status = 'unassigned'
    if reservation.save
      render json: { message: 'reservation has been saved' }, status: :ok
    else
      render json: { message: 'error! reservation has not been saved' }, status: :unprocessable_entity
    end
  end

  # def trip
  def getReservation
    reservation = Reservation.find_by(driver_id: params[:id], status: 'unassigned')
    if reservation
      render json: { data: reservation }
    else
      render json: { message: 'error! no reservation matched the request' }
    end
  end

  # def confirm
  def confirmReservation
    reservation = Reservation.find_by(driver_id: params[:id], status: 'unassigned')
    return unless reservation

    reservation[:status] = 'assigned'
    if reservation.save
      render json: { message: 'reservation has been saved with status assigned' }
    else
      render json: { message: 'error! reservation has not been saved with status assigned' }
    end
  end

  # def driverAssigned
  def assignedReservation
    reservation = Reservation.find_by(passenger_id: params[:id], status: 'assigned')
    if reservation
      render json: { message: 'driver confirmed the trip and is on the way' }
    else
      render json: { message: 'error' }
    end
  end

  # private def user_params
  #   params.require(:driver).permit(:first_name, :last_name, :phone_number,
  #                                  :email, :car_manufacturer, :car_model,
  #                                  :car_registration_number, :car_level,
  #                                  :password, :password_confirmation)
  # end
end
