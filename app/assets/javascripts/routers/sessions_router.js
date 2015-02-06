BeeHouse.Routers.Sessions = Backbone.Router.extend(
  {
    routes: {
      '': 'landingPage'
    },

    landingPage: function(){
      this.resources = new BeeHouse.Collections.Resources();
      this.signin = new BeeHouseSignin();
      this.landing = new BeeHouseLanding({collection: this.resources});
      this.resources.fetch({reset: true});
      $('.container').html(this.landing.render().el);
      $('.container').append(this.signin.render().el);


    }

  }
);

