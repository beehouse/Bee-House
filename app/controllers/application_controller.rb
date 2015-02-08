class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user 
 
  before_action :check_auth_token 
  # before_action :show_hashes
  skip_before_action :check_auth_token, only: :index

    private 

    def show_hashes
      p session 
      p cookies 
    end 

    def current_user 
      if session[:user_id]
        Patron.find(session[:user_id])
      else 
        false 
      end 
    end 

    def check_auth_token 
      puts "Certianly sir. Gonna need to see some auth tokens first." 
      if @user = current_user
        their_auth_token = @user.authentication_token 
        given_auth_token = session[:authentication_token]
        unless (their_auth_token == given_auth_token)
          head status: :unauthorized 
          return false 
        end
      else 
        head status: :unauthorized 
        return false 
      end  
    end 

    def create_user_session(user)
      session[:user_id] = user.id 
      session[:authentication_token] = user.authentication_token
    end 

    def destroy_user_session
      session[:user_id] = nil 
      session[:authentication_token] = nil 
    end 
end
