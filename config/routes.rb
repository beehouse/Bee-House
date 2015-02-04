Rails.application.routes.draw do

  root 'application#index'

  scope 'api' do 
    get 'loans' => 'loans#index'

    resources :resources do
      resources :loans
    end 
    
    resources :patrons do 
      resources :loans
    end 
  end 

  # match '*path', to: 'application#index'
end
