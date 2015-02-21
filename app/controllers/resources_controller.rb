class ResourcesController < ApplicationController
  respond_to :json
  skip_before_action :check_auth_token, only: :show
   
  
  def index
    # if page is unset set it to 1 
    if params[:page].nil? 
      page = 1 
    elsif params[:page] == 'false'
      # but if false... 
      page = false 
    else 
      page = params[:page]
    end 

    if page 
      @resources = Resource.page(page).per(10) 
    else 
      # ...return all resources 
      @resources = Resource.all 
    end 
  end

  def show
    @resource = Resource.find params[:id] 
  end
end
