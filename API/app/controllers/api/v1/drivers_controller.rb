class Api::V1::DriversController < ApplicationController
  def index
    @users = Driver.all
  end

  def new
    @user = Driver.new
  end

  def show
    @user = Driver.find(params[:id])
  end

  def create
    @user = Driver.new(user_params)
    if @user.save
      log_in @user, 'Driver'
      render status: :created, location: api_v1_super_users_path(@user)
    else
      render status: :unprocessable_entity
    end
  end

  def update
    @user = Driver.find(params[:id])
    if current_user?(@user, 'Driver')
      if @user.update(user_params)
        render json: { 'status': 'saved' }, status: :accepted
      else render json: @user.errors, status: :unprocessable_entity 
      end
    elsif @user.errors.empty?
      render json: { 'errors': 'dont have access' }, status: :unprocessable_entity
    else render json: @user.errors, status: :unprocessable_entity
    end
  end
  
  private

  def user_params
    params.require(:driver).permit(:first_name, :last_name, :phone_number,
                                   :email, :car_manufacturer, :car_model,
                                   :car_registration_number, :car_level,
                                   :password, :password_confirmation, :driver_license_image_id)
  end
end
