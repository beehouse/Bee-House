window.BeeHouse = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    this.patronsRoutes = new BeeHouse.Routers.Patrons(); 
    this.resourcesRoutes = new BeeHouse.Routers.Resources();
    this.sessionsRoutes = new BeeHouse.Routers.Sessions(); 

    Backbone.history.start(
      {pushState: true}
    );
    


    this.session = new BeeHouseSession();

    if (this.session.isAuthenticated()) {
      Backbone.history.navigate('/books', {trigger: true});
    } else {
      Backbone.history.navigate('', {trigger: true});
    }
  
  }
};

$(document).ready(function(){
  BeeHouse.initialize();
});
