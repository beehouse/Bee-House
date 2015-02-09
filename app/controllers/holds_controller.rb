class HoldsController < ApplicationController
  respond_to :json 
  

  def index
    @holds = Hold.all 
  end

  def show
    @hold = Hold.find(params[:id]) 
  end

  def create
    @hold = Hold.create(create_holds_params) 
  end

  def update
    @hold = Hold.find(params[:id])
    @hold.update(params['hold'])
    respond_with @hold  
  end 

    private 

    def create_holds_params
      params.permit(:patron_id, :resource_id) 
    end 
end
