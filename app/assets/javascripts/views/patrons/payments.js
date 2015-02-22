BeeHouse.Views.PaymentsView = Backbone.View.extend(
  {
    template: JST['patrons/payments'],
    initialize: function(){},
    render: function(){
      $(this.el).html(this.template());

      this.$('.main__nav').append(new BeeHouseNav().render().el);
      
      return this; 
    }
  }
);

var BHPayments = BeeHouse.Views.PaymentsView;