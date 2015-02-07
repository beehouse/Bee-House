BeeHouse.Views.Landing = Backbone.View.extend(
  {
    template: JST['partials/landing'],
    events: {
      'click .signuplink': 'showSignup',
      'click .signinlink': 'showSignin'
    },
    initialize: function(){
      this.signin = new BHSignin();
      this.signup = new BHSignup();
      this.collection.on('reset', this.render, this);
    },
    render: function(){
      var path = Backbone.history.fragment; 
      $(this.el).html(this.template({books: this.collection}));
      if (path === 'signup') {
        $(this.el).append(this.signup.render().el);
      } else {
        $(this.el).append(this.signin.render().el);
      }
      return this; 
    },
    showSignup: function(){
      this.signin.close();
      this.signup.delegateEvents();
      $(this.el).append(this.signup.render().el);
      Backbone.history.navigate('signup');
    },
    showSignin: function(){
      this.signup.close();
      this.signin.delegateEvents();
      $(this.el).append(this.signin.render().el);
      Backbone.history.navigate('signin');
    }
  }
);

var BeeHouseLanding = BeeHouse.Views.Landing; 