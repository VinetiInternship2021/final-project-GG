Rails.application.routes.draw do
  get 'drivers/new'
  namespace :api do
    namespace :v1 do
      resources :drivers
      resources :super_users
      resources :passengers
      get 'super_users/new'
      get 'super_users/show'
      get 'drivers/show'
      get 'passengers/show'
      get 'login' => 'sessions#new'
      post 'login' => 'sessions#create'
      delete 'logout' => 'sessions#destroy'
      get 'user_in' => 'sessions#user_in'
      post 'super_users/signup' => 'super_users#create'
      post 'drivers/signup' => 'super_users#create'
      post 'passengers/signup' => 'passengers#create'
    end
  end
end
