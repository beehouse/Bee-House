class ResourcesController < ApplicationController
  respond_to :json 

  skip_before_action :check_auth_token, only: [:index, :show] 
  
  def index
    @resources = Resource.all 
  end

  def show
    @resource = Resource.find params[:id] 
  end
end
