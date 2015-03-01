BeeHouse.Views.BHNewResource = Backbone.View.extend(
  {
    template: JST['resources/new_resource'],
    initialize: function(){


    },
    render: function(){
      $(this.el).html(this.template());
      this.$('.main__nav').append(new BeeHouseNav().render().el);

      return this;
    }
  }
);

var BHNewResource = BeeHouse.Views.BHNewResource;