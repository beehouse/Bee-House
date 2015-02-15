BeeHouse.Views.NewLoans = Backbone.View.extend(
  { 
    template: JST['loans/create_loans'],
    initialize: function(options){
      this.options = options || {};
    },
    render: function(){
      $(this.el).html(this.template());
      var patronId = this.options.patronId;
      var that = this; 

      _.each(this.collection.models, function(resource){
        if (!resource.attributes.on_loan) {
          that.$('.create-loans-index').append(
            new NewLoan({model: resource, patronId: patronId}).render().el
          );
        }
      });

      return this; 
    }
  }
);

var NewLoans = BeeHouse.Views.NewLoans; 