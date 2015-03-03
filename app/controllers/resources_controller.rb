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

  def create 
    @resource = Resource.new(resource_params)
    if @resource.save 
      render :show and return 
    else
      render(:json => {:errors => @resource.errors}, :status => :unprocessable_entity) and return 
    end 
  end 

  def show
    @resource = Resource.find params[:id] 
  end
    private 

    def resource_params 
      params.permit(:title, :creator, :date, 
        :description, :language, :format, :publisher)
    end 
end
