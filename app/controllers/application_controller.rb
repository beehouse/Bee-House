class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user 

    private 

    def current_user 
      return @current_user if @current_user

      if session[:user_id]
        @current_user = User.find(session[:user_id])
      elsif (header = request.headers['Authorization'].to_s.sub('Basic', '')) != ''
        header = Base64.decode64(header).split(':')
        username = header.shift 
        password = header.join(':')
        @current_user = User.authenticate(username, password)
      end 
    end 

    def create_user_session(user)
      session[:user_id] = user.id 
    end 

    def destroy_user_session
      session[:user_id] = nil 
    end 
end
