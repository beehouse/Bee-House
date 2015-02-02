class PatronsController < ApplicationController

  respond_to :json 

  def index
    @patrons = Patron.all 
  end

  def show
    @patron = Patron.find params[:id] 
  end
end
