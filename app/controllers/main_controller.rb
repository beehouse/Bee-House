class MainController < ApplicationController
  skip_before_action :check_auth_token, only: :index  
  def index
    @collection_size = Resource.all.length 
  end
end
