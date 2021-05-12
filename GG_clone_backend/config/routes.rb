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
      post 'drivers/coordinates' => 'drivers#createCoordinates'
      get 'coordinates/drivers' => 'coordinates#getActiveDrivers'
      post 'coordinates/trip_nearestdriver' => 'coordinates#createReservation'
      post '/coordinates/trip' => 'coordinates#getReservation'
      post '/coordinates/confirm' => 'coordinates#confirmReservation'
      post '/coordinates/driverAssigned' => 'coordinates#assignedReservation'
    end
  end
end
