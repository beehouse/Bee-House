BeeHouse.Views.PaymentsView = Backbone.View.extend(
  {
    template: JST['patrons/payments'],
    events: {
      'submit form': 'processCard'
    },
    checkWithStripe: function(status, response){
      console.log(status);
      if (status == 200) {
        console.log(response.id);
      } else {
        console.log(response.error.message);
      }

    },
    processCard: function(e){
      e.preventDefault();
      console.log('You submitted a form!');
      var card = {
        number: this.$('#payments__number').val(),
        cvc: $('#payments__cvs').val(),
        expMonth: $('#payments__exp-month').val(),
        expYear: this.$('#payments__exp-year').val()
      };
      console.log(JSON.stringify(card));
      Stripe.createToken(card, this.checkWithStripe);
    },
    initialize: function(){
      Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content'));
    },
    render: function(){
      
      $(this.el).html(this.template());
 
      this.$('.main__nav').append(new BeeHouseNav().render().el);

      return this; 
    }
  }
);

var BHPayments = BeeHouse.Views.PaymentsView;