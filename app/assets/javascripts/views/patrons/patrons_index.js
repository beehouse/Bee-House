BeeHouse.Views.PatronsIndex = Backbone.View.extend({

  template: JST['patrons/index'],
  initialize: function(){
    this.collection.on('reset', this.render, this);
  },

  render: function() {
    $(this.el).addClass('patrons-index-container');
    $(this.el).html(this.template(
      {
        patrons: this.collection.models
      }
    ));

    // add Nav 
    this.$('.main__nav').append(new BeeHouseNav().render().el);

    // add Patrons
    _.each(this.collection.models, function(patron) {
      this.$('.patrons__list').append(new BHPatronItem({model: patron}).render().el);
    }, this);

    return this;
  }
});