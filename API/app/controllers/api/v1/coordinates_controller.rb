class Api::V1::CoordinatesController < ApplicationController
  def update_driver_coordinates
    driver = Driver.find(params[:id])
    driver.latitude = params[:coordinates][:latitude]
    driver.longitude = params[:coordinates][:longitude]
    driver.is_active = true
    if driver.save
      render json: { message: 'driver coordinates has been saved' }
    else
      #   render status: :unprocessable_entity
      render json: { message: 'error! driver coordinates has not been saved' }
    end
  end

  def active_drivers
    # drivers = Driver.where("latitude > ? AND car_level = ?", 0, params[:carType])
    drivers = Driver.where("is_active = ? AND car_level = ?", true, params[:carType])
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
    reservation = Reservation.find_by(driver_id: params[:driverId], status: 'unassigned')
    return if reservation

    passenger = Passenger.find(params[:passengerId])
    reservation = passenger.reservations.create(driver_id: params[:driverId])
    reservation.status = 'unassigned'
    reservation = fetch_params reservation
    if reservation.save
      render json: { message: 'reservation has been saved', id: reservation.id }, status: :ok
    else
      render json: { message: 'error! reservation has not been saved' }, status: :unprocessable_entity
    end
  end

  def rate_driver 
    reservation = Reservation.where(passenger_id: params[:passengerId]);  
    reservation = reservation.order(created_at: :desc) 
    reservation = reservation.first
    reservation.rating = params[:rate];
    if reservation.save
      render json: { message: 'rating has been updated'}
    else
      render json: { message: 'error!' }
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
    if reservation 
      driver = Driver.find(params[:id])
      driver.is_active = false
      reservation[:status] = 'assigned'
      if reservation.save
        if driver.save
          render json: { message: 'reservation has been saved with status assigned, and driver is_active set to false' }
        else 
          render json: { message: 'reservation has been saved with status assigned but driver is_active does not set to false' }
        end
      else
        render json: { message: 'error! reservation has not been saved with status assigned and driver is_active does not set to false' }
      end
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

  def arrived
    reservation = Reservation.find_by(driver_id: params[:id], status: 'assigned')
    if reservation 
      reservation[:status] = 'arrived'
      if reservation.save
        render json: { message: 'reservation has been saved with status arrived' }
      else
        render json: { message: 'error! reservation has not been saved with status arrived' }
      end
    end
  end  

  def pickup
    reservation = Reservation.find_by(driver_id: params[:id], status: 'arrived')
    if reservation 
      reservation[:status] = 'picked up'
      if reservation.save
        render json: { message: 'reservation has been saved with status picked up' }
      else
        render json: { message: 'error! reservation has not been saved with status picked up' }
      end
    end
  end  

  def complete
    reservation = Reservation.find_by(driver_id: params[:id], status: 'picked up')
    if reservation 
      reservation[:status] = 'completed'
      if reservation.save
        render json: { message: 'reservation has been saved with status complete' }
      else
        render json: { message: 'error! reservation has not been saved with status complete' }
      end
    end
  end  

  def driver_arrived_message
    reservation = Reservation.find_by(passenger_id: params[:id], status: 'arrived')
    if reservation
      render json: { message: 'driver has arrived' }
    else
      render json: { message: 'error' }
    end
  end  

  def fetch_params(reservation)
    reservation.pickupLat = params[:pickUpLocation][:lat]
    reservation.pickupLng = params[:pickUpLocation][:lng]
    reservation.dropoffLat = params[:dropOffLocation][:lat]
    reservation.dropoffLng = params[:dropOffLocation][:lng]
    reservation.price = params[:price]
    reservation
  end
end
