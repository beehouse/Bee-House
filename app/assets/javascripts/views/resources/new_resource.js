BeeHouse.Views.BHNewResource = Backbone.View.extend(
  {
    template: JST['resources/new_resource'],
    initialize: function(){


    },
    appendInventoryItem: function(bookModel) {
      var view = new BHInventoryItem({model: bookModel}); 
      this.$(".add-book__inventory")
        .append(view.render().el);
    },
    render: function(){
      $(this.el).html(this.template());
      this.$('.main__nav').append(new BeeHouseNav().render().el);

      _.each(this.collection.models, 
        function(book) {
          this.appendInventoryItem(book);
        }, 
      this); 


      return this;
    }
  }
);

var BHNewResource = BeeHouse.Views.BHNewResource;