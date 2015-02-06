BeeHouse.Views.ResourcesIndex = Backbone.View.extend({

  template: JST['resources/index'],

  initialize: function(){
    this.collection.on('reset', this.render, this);
  },

  render: function(eventName){
    $(this.el).html(this.template({resources: this.collection.models}));

    _.each(this.collection.models, function(resource) {
      this.$('.book__list').append(new BeeHouseResourcesItemView({model: resource}).render().el);
     }, this);
 
    return this;
  }
});