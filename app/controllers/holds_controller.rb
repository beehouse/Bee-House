class HoldsController < ApplicationController
  respond_to :json 
  
  def index
    @holds = Hold.all 
  end

  def show
    @hold = Hold.find(params[:id]) 
  end

  def create
    @hold = Hold.new(create_holds_params)
    if @hold.save
      render :create  
      AdminMailer.notify_of_hold(@hold).deliver
    else
      render :json => {:error => "Problems!"}  
    end 
  end

    private 

    def create_holds_params
      params.permit(:patron_id, :resource_id) 
    end 
end
