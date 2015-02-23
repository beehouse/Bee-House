class FinesController < ApplicationController
  def create
    if @patron = current_user 
      if !@patron.late_fees.zero?
        customer = Stripe::Customer.create(
          email: @patron.email,
           card: params[:stripeToken]
        )

        charge = Stripe::Charge.create(
             customer: customer.id,
               amount: @patron.late_fees,
          description: 'Overdue fines on Beehouse',
             currency: 'usd'  
        )
        @patron.update late_fees: 0 
        render 'patrons/show' and return 
      end
      render json:
        {:error => 'Hey, you have no fines at present. No point in paying us nothing when you don\'t owe us anything.'}, 
        status: 400 and return 
    else 
      render nothing: true, status: 401 and return 
    end 

    rescue Stripe::CardError => e
      logger.error "Stripe error while charging customer: #{e.message}"
      render json: 
        {:error => 'We\'re sorry, your card was declined. Be sure your payment details are correct.'},
        status: 400 and return 
  end
end
