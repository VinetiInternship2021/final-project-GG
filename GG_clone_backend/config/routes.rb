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
      post 'coordinates/trip_nearestdriver' => 'coordinates#create_reservation'
      post '/coordinates/trip' => 'coordinates#reservation'
      post '/coordinates/confirm' => 'coordinates#confirm_reservation'
      post '/coordinates/driverAssigned' => 'coordinates#assigned_reservation'
      delete '/coordinates/reservation' => 'coordinates#delete_reservation'
    end
  end
end
