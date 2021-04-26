class Api::V1::SuperUsersController < ApplicationController

  def index
    @users = SuperUser.all
  end

  def new
    @user = SuperUser.new
  end

  def show
    @user = SuperUser.find(params[:id])
  end

  def create
    @user = SuperUser.new(user_params)
    if @user.save
      render status: :created, location: api_v1_super_users_path(@user)
    else
      render status: :unprocessable_entity
    end
  end

  def update
    @user = SuperUser.find(params[:id])
    if @user.update(user_params)
      render status: :updated, location: api_v1_super_users_path(@user)
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  private def user_params
    params.require(:super_user).permit(:first_name, :last_name, :phone_number,
                                       :password, :password_confirmation)
  end

end
