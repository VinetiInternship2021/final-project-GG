class Api::V1::SessionsController < ApplicationController
  include ActionController::Cookies
  include ActionController::RequestForgeryProtection
  before_action :fetch_model_user, only: [:create]

  def new; end

  def fetch_model_user
    @model_name, @model = choose_model(params[:session][:model_name])
    @user = @model.find_by(phone_number: params[:session][:phone_number])
  end

  def create
    user = @user
    model_name = @model_name
    if user&.authenticate(params[:session][:password])
      log_in user, model_name
      @user.is_active = true
      ActionCable.server.broadcast 'active_drivers', {type: 'login', user: @user}
      params[:session][:remember_me] == '1' ? remember(user, model_name) : forget(user)
      render status: :ok
    else
      render status: :unprocessable_entity
    end
  end

  def logged_in?
    !current_user.nil?
  end

  def user_in
    if logged_in?
      user_array = current_user
      @user_in = user_array[0]
      @model_name = user_array[1]
    else
      false
    end
  end

  def log_out
    user = current_user.first
    if user.model_name == 'Passenger'
      reservation = Reservation.find_by(passenger_id: user.id, status: 'unassigned')
      if !reservation
      reservation = Reservation.find_by(passenger_id: user.id, status: 'assigned')
      end 
      if reservation
        reservation.destroy
      end  
    end   

    if user.model_name == 'Driver'
      ActionCable.server.broadcast 'active_drivers', {type: 'logout', user: user}
      user[:latitude] = nil
      user[:longitude] = nil
      user[:is_active] = false
      user.save
    end

    user, = current_user
    forget(user)
    session.delete(:user_id)
    @current_user = nil
  end

  def destroy
    log_out if logged_in?
    render json: nil, status: :ok
  end
end
