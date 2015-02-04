BeeHouse.Views.ResourcesIndex = Backbone.View.extend({

  template: JST['resources/index'],

  initialize: function(){
    this.model.on('reset', this.render, this);
  },

  render: function(eventName){
    $(this.el).html(this.template({resources: this.model.models}));

    _.each(this.model.models, function(resource) {
      this.$('.book__list').append(new BeeHouseResourcesItemView({model: resource}).render().el)
     }, this);
 
    return this;
  },

  listResource: function(resource){
    console.log("Fig");
  }

});