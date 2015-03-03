class ReviewsController < ApplicationController

  skip_before_action :check_auth_token, only: :index 

  def index 
    if params[:paron_id]
      @reviews = Patron.find(params[:patron_id]).reviews 
    elsif params[:resource_id]
      @reviews = Resource.find(params[:resource_id]).reviews 
    else 
      @reviews = Review.all 
    end 
  end 

  def create 
    @review = Review.new(review_params) 
    unless @review.save
      render :json => {errors: @review.errors}, status: :unprocessable_entity  
    end
  end

    private 

    def review_params 
      params.permit(:resource_id, :patron_id, :content)
    end  
end
