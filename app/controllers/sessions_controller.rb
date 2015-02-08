class SessionsController < ApplicationController

  respond_to :json 
  skip_before_action :check_auth_token, only: :create  

  def create 

    @patron = Patron.find_by_email(params[:email])
     
    if @patron && @patron.valid_password?(params[:password])
      create_user_session(@patron)
      respond_with @patron, :location => '/', :notice => 'Logged in!'  
    else 
      render :json => {:error => "Invalid email or password!"}
    end 
  end 

  def destroy 
    destroy_user_session 
    render :json => {:success => "Session destroyed!"}
  end 

end
