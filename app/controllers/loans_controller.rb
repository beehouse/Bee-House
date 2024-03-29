class LoansController < ApplicationController
  respond_to :json

  before_action :check_admin, only: [:index, :show, :create, :destroy, :new] 

  
  
  def index
    @loans = Loan.all
  end

  def new 
    @hold = Hold.find params[:hold_id] 
    patron_id = @hold.patron_id
    resource_id = @hold.resource_id 
    PatronMailer.notify_patron(patron_id, resource_id).deliver_later!(wait: 1.minute)
    @hold.update notified: true
  end 

  def create 
    @loan = Loan.new loan_params 
    @loan.began = Date.today 
    @loan.ends = Date.today + 3.weeks
    @loan.renewals = 0
    @loan.returned = false  
    @loan.reminded = false 
    @loan.save
    ap @loan 
  end 

  def show
    @loan = Loan.find params[:id]
  end

  def update
    @loan = Loan.find params[:id]
    update_params = loan_params 
    if update_params.include? "ends"
      update_params["renewals"] = @loan.renewals + 1
      update_params["reminded"] = false  
      @loan.update update_params
    else
       @loan.update update_params
    end   
  end 

  def destroy 
    @loan = Loan.find(params[:id]) 
    if @loan.return 
      render :show 
    else 
      render :json => {:error => "Problems!"}  
    end 
  end 

    private 

    def loan_params
      params.require(:loan).permit(:ends, :patron_id, :resource_id, :began, :reminded)
    end 

    def check_admin
      unless current_user.admin?
        head status: :unauthorized
      end 
    end 

end
