class SessionsController < ApplicationController

  respond_to :json 

  def create 
    @patron = Patron.find_by_email(params[:email])

    if @patron && @patron.authenticate(params[:password])
      create_user_session(@patron)
      respond_with @patron, :location => '/', :notice => 'Logged in!'  
    else 
      respond_with {render :json => {error: 'Invalid email or password!'}}
    end 
  end 

  def destroy 
    destroy_user_session 
    redirect_to '/', notice: "Logged out."
  end 

end
