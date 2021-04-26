class ApplicationController < ActionController::API
  helper_method :choose_model, :log_in, :remember,
                :forget

  def choose_model(model_name)
    case model_name
    when 'SuperUser'
      model = SuperUser
    when 'Driver'
      model = Driver
    when 'Passenger'
      model = Passenger
    else
      return nil
    end

    [model_name, model]
  end

  def log_in(user, model_name)
    session[:user_id] = user.id
    session[:model_name] = model_name

  end

  def remember(user, model_name)
    user.remember
    cookies.permanent.signed[:user_id] = user.id
    cookies.permanent[:remember_token] = user.remember_token
    cookies.permanent[:model_name] = model_name
  end

  def forget(user)
    user.forget
    cookies.delete(:user_id)
    cookies.delete(:remember_token)
    cookies.delete(:model_name)
  end

end
