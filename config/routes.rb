Rails.application.routes.draw do

  root 'main#index'

  scope 'api' do 
    get 'loans' => 'loans#index'

    resources :resources do 
      resources :reviews 
    end 


    resources :patrons do 
      resources :reviews 
    end 
    
    resources :loans 
    resources :holds
    resource :session, only: :create 
  end 

  match '*path', to: 'main#index', via: :get 
end
