BeeHouse.Views.LoanItem = Backbone.View.extend(
  {
    template: JST['resources/loaned_item'],
    events: {
      'click button.book__renew': 'renewBook'
    },
    initialize: function(){
      
    },
    render: function(){
      $(this.el).html(this.template({resource: this.model}));
      return this; 
    },
    renewBook: function(){
      console.log(this.model.title);
    }
  }
);

LoanItemView = BeeHouse.Views.LoanItem; 