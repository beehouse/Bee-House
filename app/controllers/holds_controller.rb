class HoldsController < ApplicationController
  respond_to :json 

  before_action :check_admin, only: [:index, :show] # destroy when loaned 
                                                    # or have user cancel hold  
  def index
    @holds = Hold.all 
  end

  def show
    @hold = Hold.find(params[:id]) 
  end

  def create
    @hold = Hold.new(create_holds_params)
    if @hold.save
      AdminMailer.notify_of_hold(@hold.resource_id, @hold.patron_id).deliver_later!(wait: 1.minute)
      render :create  
    else
      render :json => {:error => "Problems!"}  
    end 
  end

    private 

    def create_holds_params
      params.permit(:patron_id, :resource_id) 
    end 

    def check_admin
      unless current_user.admin?
        head status: :unauthorized
      end 
    end 
end
