class ResourcesController < ApplicationController
  respond_to :json
  skip_before_action :check_auth_token, only: :show
   
  
  def index
    page = params[:page] || 1 
    @resources = Resource.page(page).per(10)
  end

  def show
    @resource = Resource.find params[:id] 
  end
end
