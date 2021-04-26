class Api::V1::SessionsController < ApplicationController
  include ActionController::Cookies
  include ActionController::RequestForgeryProtection

  def new
  end

  def create
    @model_name, @model = choose_model(params[:session][:model_name])
    @user = @model.find_by(phone_number: params[:session][:phone_number])
    user = @user
    model_name = @model_name
    if user && user.authenticate(params[:session][:password])
      log_in user, model_name
      params[:session][:remember_me] == '1' ? remember(user, model_name) : forget(user)
      render status: :ok
    else
      render status: :unprocessable_entity
    end
  end

  def current_user
    if session[:user_id]
      if (model_name = session[:model_name])
        _, model = choose_model(model_name)

        return [@current_user ||= model.find_by(id: session[:user_id]),
                model_name]
      end
    elsif (user_id = cookies.signed[:user_id])
      if (model_name = cookies.signed[:model_name])
        _, model = choose_model(model_name)
        user = model.find_by(id: user_id)
        if user && user.authenticated?(cookies[:remember_token])
          log_in(user, model_name)
          return [@current_user = user, model_name]
        end
      end
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
    end
  end

  def log_out
    user,_ = current_user
    forget(user)
    session.delete(:user_id)
    @current_user = nil
  end

  def destroy
    log_out if logged_in?
    render json: nil, status: :ok
  end

end
