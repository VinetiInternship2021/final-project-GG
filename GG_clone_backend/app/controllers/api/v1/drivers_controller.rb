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
    @user = Driver.find(params[:id])
    if @user.update(user_params)
      render status: :updated, location: api_v1_super_users_path(@user)
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  private def user_params
    params.require(:driver).permit(:first_name, :last_name, :phone_number,
                                   :email, :car_manufacturer, :car_model,
                                   :car_registration_number, :car_level,
                                   :password, :password_confirmation)
  end

end
