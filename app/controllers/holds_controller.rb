class HoldsController < ApplicationController
  respond_to :json 

  def index
    @holds = Hold.all 
  end

  def show
    @hold = Hold.find params[:id]
  end

  def create
    respond_with Hold.create(params['hold']) 
  end

  def update
    @hold = Hold.find(params[:id])
    ap params 
    respond_with @hold  
  end 
end
