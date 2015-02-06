Rails.application.routes.draw do

  root 'application#index'

  scope 'api' do 
    get 'loans' => 'loans#index'

    resources :resources
    resources :patrons
    resources :loans 
    resources :holds
    resource :session, :only => [:new, :create, :destroy] 
  end 

  match '*path', to: 'application#index', via: :get 
end
