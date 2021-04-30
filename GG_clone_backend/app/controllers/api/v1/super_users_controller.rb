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
      log_in @user, 'SuperUser'
      render status: :created, location: api_v1_super_users_path(@user)
    else
      render status: :unprocessable_entity
    end
  end

  def update
    @user = SuperUser.find(params[:id])
    if current_user?(@user, 'SuperUser')
      if @user.update(user_params)
        render status: :accepted, location: api_v1_super_users_path(@user)
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
    params.require(:super_user).permit(:first_name, :last_name, :phone_number,
                                       :password, :password_confirmation)
  end

end
