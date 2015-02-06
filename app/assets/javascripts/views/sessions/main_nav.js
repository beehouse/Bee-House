BeeHouse.Views.MainNav = Backbone.View.extend(
  {
    template: JST['partials/main_nav'],
    events: {
      'click .signout': 'signout'
    },
    signout: function(e){
      e.preventDefault();
      BeeHouse.session.set('userId', null);
      BeeHouse.session.save();
      Backbone.history.navigate('', {trigger: true});
    },
    render: function(){
      $(this.el).html(this.template());
      return this; 
    }
  }
);

var BeeHouseNav = BeeHouse.Views.MainNav; 