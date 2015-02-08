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

  def update
    @loan = Loan.find params[:id]
    update_params = loan_params 
    if update_params.include? "ends"
      update_params["renewals"] = @loan.renewals + 1 
      @loan.update update_params
    else
       @loan.update update_params
    end   
  end 

    private 

    def loan_params
      params.require(:loan).permit(:ends, :patron_id, :resource_id, :began)
    end 
end
