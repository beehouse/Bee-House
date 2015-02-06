BeeHouse.Routers.Resources = Backbone.Router.extend(
  {
    routes: {
      'books': 'indexResources',
      'books/:id': 'showResource'
    },

    indexResources: function(){

      this.resources = new BeeHouse.Collections.Resources();
      this.resourcesView = new BeeHouse.Views.ResourcesIndex({collection: this.resources});
      this.resources.fetch({reset: true});
      $('.container').html(this.resourcesView.render().el);

      var sessionId = BeeHouse.session.get('userId'); 
      this.currentUser = new BHPatron({id: sessionId});
      this.profileView = new BHPatronProfile({model: this.currentUser});
      this.currentUser.fetch();

      $('.container').append(this.profileView.render().el);
    },  

    showResource: function(){
      console.log("There is a resource!");
    }

  }
);
