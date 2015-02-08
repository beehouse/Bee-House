Rails.application.routes.draw do

  root 'main#index'

  scope 'api' do 
    get 'loans' => 'loans#index'

    resources :resources
    resources :patrons
    resources :loans 
    resources :holds
    resource :session, :only => [:create, :destroy] 
  end 

  match '*path', to: 'main#index', via: :get 
end
