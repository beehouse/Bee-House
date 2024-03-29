class PatronsController < ApplicationController
   
  respond_to :json
  skip_before_action :check_auth_token, only: :create    

  def index
    @patrons = Patron.all 
  end

  def show
    @patron = Patron.find params[:id] 
  end

  def create 
    @patron = Patron.new(user_params)
    if @patron.save
      PatronMailer.welcome_patron(@patron.id).deliver_later!(wait: 1.minute) 
    else
      render :json => {:errors => @patron.errors}, :status => :unprocessable_entity   
    end 
  end 

    private 

    def user_params
      params.permit(:name, :email, :password, :password_confirmation) 
    end 
end
