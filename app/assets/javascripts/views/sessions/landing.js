BeeHouse.Views.Landing = Backbone.View.extend(
  {
    template: JST['partials/landing'],
    initialize: function(){
      this.collection.on('reset', this.render, this);
    },
    render: function(){
      $(this.el).html(this.template({books: this.collection}));
      return this; 
    }

  }
);

var BeeHouseLanding = BeeHouse.Views.Landing; 