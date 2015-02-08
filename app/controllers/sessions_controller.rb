class SessionsController < ApplicationController

  respond_to :json 
  
  skip_before_action :check_auth_token, only: :create  

  def create 

    @patron = Patron.find_by_email(params[:email])
     
    if @patron && @patron.valid_password?(params[:password])
      respond_with @patron, :location => '/', :notice => 'Logged in!'  
    else 
      render :json => {:error => "Invalid email or password!"}
    end 
  end 

end
