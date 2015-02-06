BeeHouse.Routers.Patrons = Backbone.Router.extend(
  {
    routes: {
      'signup': 'showSignUp'
    },
    showSignUp: function(){
      this.signupView = new BeeHouseSignup({collection: this.patrons});
      $('.container').html(this.signupView.render().el);
    }

  }
);
