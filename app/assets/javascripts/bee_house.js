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

$(document).ready(function(){
  CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
  BeeHouse.session = new BeeHouseSession();
  BeeHouse.session.getCurrentUser(function(){
    BeeHouse.begin();
  }); 
});
