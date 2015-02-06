BeeHouse.Views.PatronProfile = Backbone.View.extend({

  template: JST['patrons/profile'],
  initialize: function(){
    _.bindAll(this, 'render');
    this.model.on('change', this.render);
  },
  render: function(){
    
    $(this.el).html(this.template({user: this.model.toJSON()}));
     _.each(this.model.get('resources'), function(loanedBook) {
       this.$('#paton-loans-list').append(new LoanItemView({model: loanedBook}).render().el);
    }, this)

    return this; 
  }

});

BHPatronProfile = BeeHouse.Views.PatronProfile; 