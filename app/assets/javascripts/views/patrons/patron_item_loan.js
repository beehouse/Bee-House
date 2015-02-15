BeeHouse.Views.PatronItemLoan = Backbone.View.extend(
  {
    template: JST['loans/patron_loan'],
    initialize: function(){

    },
    render: function(){
      $(this.el).html(this.template(
        {
          loan: this.model
        }
      ));

      return this; 
    }
  }
);

var BHPatronItemLoan = BeeHouse.Views.PatronItemLoan;