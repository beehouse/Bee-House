BeeHouse.Views.PatronsIndex = Backbone.View.extend({

  template: JST['patrons/index'],
  initialize: function(){
    this.collection.on('reset', this.render, this);
  },

  render: function(){
   
    $(this.el).html(this.template(
      {
        patrons: this.collection.models
      }
    ));


    // add Nav 
    this.$('.main__nav').append(new BeeHouseNav().render().el);

    // add Patrons
    _.each(this.collection.models, function(patron) {
      this.$('.patrons__list').append("hi")
    }, this);

/*
    // add Resources 
    _.each(this.collection.models, function(resource) {
      if (!resource.isCheckedOutByMe()) {
        this.$('.book__list').append(new BeeHouseResourcesItemView({model: resource}).render().el);
      }
     }, this);


    // add Profile 

    var currentPatron = BeeHouse.session.get('currentUser');
    var profileView = new BHProfile({model: currentPatron});
    $(this.el).append(profileView.render().el); 
  */
    return this;
  }
});