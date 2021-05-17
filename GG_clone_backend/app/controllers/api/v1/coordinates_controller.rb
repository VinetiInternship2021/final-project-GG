class Api::V1::CoordinatesController < ApplicationController
  def update_driver_coordinates
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

  def active_drivers
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

  def create_reservation
    reservation = Reservation.find_by(driver_id: params[:id], status: 'unassigned')
    return if reservation

    passenger = Passenger.find(params[:passengerId])
    reservation = passenger.reservations.create(driver_id: params[:driverId])
    reservation.status = 'unassigned'
    reservation = fetch_params reservation
    if reservation.save
      # driver = Driver.find(params[:driverId])
      # driver.active_reservation = true
      # driver.save
      render json: { message: 'reservation has been saved', id: reservation.id }, status: :ok
    else
      render json: { message: 'error! reservation has not been saved' }, status: :unprocessable_entity
    end
  end

  def reservation
    reservation = Reservation.find_by(driver_id: params[:id], status: 'unassigned')
    if reservation
      render json: { data: reservation }
    else
      render json: { message: 'error! no reservation matched the request' }
    end
  end

  def confirm_reservation
    reservation = Reservation.find_by(driver_id: params[:id], status: 'unassigned')
    return unless reservation

    reservation[:status] = 'assigned'
    if reservation.save
      render json: { message: 'reservation has been saved with status assigned' }
    else
      render json: { message: 'error! reservation has not been saved with status assigned' }
    end
  end

  def assigned_reservation
    reservation = Reservation.find_by(passenger_id: params[:id], status: 'assigned')
    if reservation
      render json: { message: 'driver confirmed the trip and is on the way' }
    else
      render json: { message: 'error' }
    end
  end

  def delete_reservation
    reservation = Reservation.find(params[:reservationId])
    if reservation
      reservation.destroy
      render json: { message: "reservation number #{params[:reservationId]} has been deleted" }
    else
      render json: { message: "error: reservation number #{params[:reservationId]} has not been deleted" }
    end
  end

  # def cancel_reservation
  #   # puts params
  #   # puts 'cancel_reservationnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn'
  #   driver = Driver.find(params[:id])
  #   reservation = Reservation.find_by(driver_id: params[:id], status: 'unassigned')
  #   puts 'reservation:'
  #   puts reservation
  #   puts 'driver.active_reservation: '
  #   puts driver.active_reservation

  #   if !reservation && !driver.active_reservation
  #     render json: { message: "no reservation yet" }
  #   elsif !reservation && driver.active_reservation
  #     render json: { message: "reservation has been deleted" }
  #     driver.active_reservation = false
  #     driver.save
  #   end
  # end

  def fetch_params(reservation)
    reservation.pickupLat = params[:pickUpLocation][:lat]
    reservation.pickupLng = params[:pickUpLocation][:lng]
    reservation.dropoffLat = params[:dropOffLocation][:lat]
    reservation.dropoffLng = params[:dropOffLocation][:lng]
    reservation
  end
end
