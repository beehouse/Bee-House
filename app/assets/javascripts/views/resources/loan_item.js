BeeHouse.Views.LoanItem = Backbone.View.extend(
  {
    template: JST['resources/loaned_item'],
    events: {
      'click button.book__renew': 'renewBook'
    },
    initialize: function(){

    },
    render: function(){
      $(this.el).html(this.template({resource: this.model.toJSON()}));
      return this; 
    },
    renewBook: function(){
      if (parseInt(this.model.get('renewals')) < 3){ 
        var that = this; 
        this.model.renew(function(model, resp, opts){  
          that.model = that.model.set(resp);
          that.render();
        });  
      }
    }
  }
);

LoanItemView = BeeHouse.Views.LoanItem; 