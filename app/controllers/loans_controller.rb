class LoansController < ApplicationController
  respond_to :json 
  
  def index
    # hack
    @loans =  
    if params[:patron_id]
      Patron.find(params[:patron_id]).loans  
    elsif params[:resource_id]
      Resource.find(params[:resource_id]).loans 
    else
      Loan.all 
    end 
  end

  def show
    @loan = Loan.find params[:id]
  end
end
