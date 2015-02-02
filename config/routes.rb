Rails.application.routes.draw do

  root 'application#index'

  get 'loans' => 'loans#index'

  resources :resources do
    resources :loans
  end 

  resources :patrons do 
    resources :loans
  end 

end
