class LoansController < ApplicationController
  respond_to :json

  before_action :check_admin, only: [:index, :show, :create] # don't destroy loans, 
                                                             # return them
  
  
  def index
    @loans = Loan.all
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

    def check_admin
      unless current_user.admin?
        head status: :unauthorized
      end 
    end 
end
