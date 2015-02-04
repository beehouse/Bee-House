BeeHouse.Views.ResourcesItem = Backbone.View.extend(
  {
    template: JST['resources/item'],
    events: {
      'click button.book__reserve': 'reserveBook'
    }, 
    initialize: function() {

    },
    render: function() {
      $(this.el).html(this.template({book: this.model}))
      return this; 
    },
    reserveBook: function(e) {
      console.log(this.model.attributes.id);  
    }
  }
);

var BeeHouseResourcesItemView = BeeHouse.Views.ResourcesItem; 