window.BeeHouse = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    Backbone.history.start(
      {pushState: true}
    );
    
    this.patronsRoutes = new BeeHouse.Routers.Patrons(); 
    this.resourcesRoutes = new BeeHouse.Routers.Resources();
    this.sessionsRoutes = new BeeHouse.Routers.Sessions(); 

    this.session = new BeeHouseSession();

    if (this.session.isAuthenticated()) {
      this.resourcesRoutes.navigate('/books', true);
    } else {
      this.sessionsRoutes.navigate('/signin', true);
    }
  
  }
};

$(document).ready(function(){
  BeeHouse.initialize();
});
