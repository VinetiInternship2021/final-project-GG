class PassengersController < ApplicationController

  def index
    @users = Passenger.all
  end

  def new
    @user = Passenger.new
  end

  def show
    @user = Passenger.find(params[:id])
  end

  def create
    @user = Passenger.new(user_params)
    if @user.save
      render status: :created, location: api_v1_super_users_path(@user)
    else
      render status: :unprocessable_entity
    end
  end

  def update
    if current_user?(@user, 'Driver')
      @user = Passenger.find(params[:id])
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

  private def user_params
    params.require(:passenger).permit(:first_name, :last_name, :phone_number,
                                   :email,
                                   :password, :password_confirmation)
  end

end
