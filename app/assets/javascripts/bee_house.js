window.BeeHouse = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  begin: function() {
 
    this.BHRouter = new BHRouter();  
    Backbone.history.start(
      {pushState: true}
    );

  }
};

BeeHouse.Events = {}; 
var BHEvents = BeeHouse.Events;
_.extend(BHEvents, Backbone.Events);

$(document).ready(function(){
  CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
  BeeHouse.session = new BeeHouseSession(); 
  BeeHouse.session.getCurrentUser(function(){
    BeeHouse.begin();
  }); 
});
