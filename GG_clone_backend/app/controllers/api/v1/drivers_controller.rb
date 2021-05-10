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
      render status: :created, location: api_v1_super_users_path(@user)
    else
      render status: :unprocessable_entity
    end
  end

  def update
    if current_user?(@user, 'Driver')
      @user = Driver.find(params[:id])
      if @user.update(user_params)
        render status: :updated, location: api_v1_super_users_path(@user)
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    else
      if @user.errors.empty?
        render json: { 'errors': 'dont have access' }, status: :unprocessable_entity
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end
  end

  def createCoordinates
    driver = Driver.find(params[:id])
    driver.latitude= params[:coordinates][:latitude]
    driver.longitude= params[:coordinates][:longitude]
    if driver.save
      render json: { message: 'driver coordinates has been saved'}
    else
      #   render status: :unprocessable_entity
      render json: { message: 'error! driver coordinates has not been saved'}
    end
  end  

  private def user_params
    params.require(:driver).permit(:first_name, :last_name, :phone_number,
                                   :email, :car_manufacturer, :car_model,
                                   :car_registration_number, :car_level,
                                   :password, :password_confirmation)
  end

end
