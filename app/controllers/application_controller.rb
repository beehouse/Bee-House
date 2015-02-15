class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user 
 
  before_action :check_auth_token

    private 

    def current_user 
      if cookies[:user_id]
        Patron.find(cookies[:user_id])
      else 
        false 
      end 
    end 

    def check_auth_token 
      puts "\033[1;33;44mCertianly sir. Gonna need to see some auth tokens first.\033[0m" 
      if @user = current_user
        their_auth_token = @user.authentication_token 
        given_auth_token = cookies[:authentication_token]
        unless (their_auth_token == given_auth_token)
          head status: :unauthorized 
          return false 
        else 
          puts "\033[1;33;44mOkay. Everything seems to be in order.\033[0m"
        end 
      else 
        head status: :unauthorized 
        return false 
      end  
    end 
end
