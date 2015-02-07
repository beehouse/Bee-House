BeeHouse.Views.ResourcesIndex = Backbone.View.extend({

  template: JST['resources/index'],

  initialize: function(){
    this.collection.on('reset', this.render, this);
  },

  render: function(eventName){
    var that = this; 
    $(this.el).html(this.template({resources: this.collection.models}));


    // add Nav 
    this.$('.main__nav').append(new BeeHouseNav().render().el);


    // add Resources 
    _.each(this.collection.models, function(resource) {
      this.$('.book__list').append(new BeeHouseResourcesItemView({model: resource}).render().el);
     }, this);


    // add Profile 

    var currentPatron = new BHPatron({
      id: BeeHouse.session.get('userId')
    }); 

    currentPatron.fetch().done(function(){
      var profileView = new BHProfile({model: currentPatron});
      $(that.el).append(profileView.render().el); 
    });
 
    return this;
  }
});