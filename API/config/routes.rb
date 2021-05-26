Rails.application.routes.draw do
  get 'drivers/new'
  namespace :api do
    namespace :v1 do
      resources :drivers
      resources :super_users
      resources :passengers
      get 'login' => 'sessions#new'
      post 'login' => 'sessions#create'
      delete 'logout' => 'sessions#destroy'
      get 'user_in' => 'sessions#user_in'
      post 'drivers/coordinates' => 'coordinates#update_driver_coordinates'
      post 'coordinates/drivers' => 'coordinates#active_drivers'
      post 'coordinates/reservation' => 'coordinates#create_reservation'
      post '/coordinates/trip' => 'coordinates#reservation'
      post '/coordinates/confirm' => 'coordinates#confirm_reservation'
      post '/coordinates/driverAssigned' => 'coordinates#assigned_reservation'
      get '/admin/unverified_drivers' => 'unverified_drivers#index'
      post '/admin/unverified_drivers' => 'unverified_drivers#verify'
      delete '/coordinates/reservation' => 'coordinates#delete_reservation'
      post '/coordinates/arrived' => 'coordinates#arrived'
      post '/coordinates/pickup' => 'coordinates#pickup'
      post '/coordinates/complete' => 'coordinates#complete'
      post '/coordinates/driverArrived' => 'coordinates#driver_arrived_message'
      post '/coordinates/rateDriver' => 'coordinates#rate_driver'
    end
  end
end
