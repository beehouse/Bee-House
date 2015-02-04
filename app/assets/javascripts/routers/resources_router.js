BeeHouse.Routers.Resources = Backbone.Router.extend(
  {
    routes: {
      '': 'indexResources',
      'resources/:id': 'showResource'
    },

    indexResources: function(){
      this.resources = new BeeHouse.Collections.Resources();
      this.resourcesView = new BeeHouse.Views.ResourcesIndex({model:this.resources});
      this.resources.fetch({reset: true});
      $('.container').html(this.resourcesView.render().el)
    },  

    showResource: function(){
      console.log("There is a resource!");
    }

  }
);
