window.BeeHouse = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this.BHRouter = new BHRouter();  
    Backbone.history.start(
      {pushState: true}
    );
  }
};

$(document).ready(function(){
  BeeHouse.session = new BeeHouseSession();
  BeeHouse.initialize();
});
