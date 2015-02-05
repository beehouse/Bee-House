BeeHouse.Routers.Patrons = Backbone.Router.extend(
  {
    routes: {
      '': 'checkSession',
      'sign_in': 'showSignIn',
      'sign_up': 'showSignUp'
    },
    checkSession: function(){
      this.showSignUp();
    },
    showSignIn: function(){

    },
    showSignUp: function(){
      this.signupView = new BeeHouseSignup({collection: this.patrons});
      $('.container').html(this.signupView.render().el);
    }

  }
);
