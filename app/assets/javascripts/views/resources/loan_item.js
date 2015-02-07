BeeHouse.Views.LoanItem = Backbone.View.extend(
  {
    template: JST['resources/loaned_item'],
    events: {
      'click button.book__renew': 'renewBook'
    },
    initialize: function(){ 

    },
    render: function(){
      console.log("I'm rendering!");
      $(this.el).html(this.template({resource: this.model.toJSON()}));
      return this; 
    },
    renewBook: function(){
      var that = this;  
      this.model.renew(function(model, resp, opts){  
        console.log("I'm setting the model to the resp JSON!") 
        that.model = that.model.set(resp);
        that.render();
      });
    }
  }
);

LoanItemView = BeeHouse.Views.LoanItem; 