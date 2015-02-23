BeeHouse.Views.PaymentsView = Backbone.View.extend(
  {
    template: JST['patrons/payments'],
    events: {
      'submit form': 'processCard'
    },
    processCard: function(e){
      e.preventDefault();

      var that = this, 
          card = {
            number: this.$('#payments__number').val(),
            cvc: $('#payments__cvs').val(),
            expMonth: $('#payments__exp-month').val(),
            expYear: this.$('#payments__exp-year').val()
          };

      
      Stripe.createToken(card, function(status, response){
        
        if (status == 200) {
          
          var fine = new BHFine({stripeToken: response.id});
          fine.save()
            .done(function(response){
              
              var patron = BeeHouse.session.get('currentUser');
              patron.set('late_fees', 0);
              Backbone.history.navigate('books', 
                {trigger: true});

            })
            .fail(function(e){
              that.$('.payment-errors').text(
                e.responseJSON.error
              );
            });
        } else {
          
          this.$('.payment-errors').text(
            response.error.message
          );
        }

      });
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