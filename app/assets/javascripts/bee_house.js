window.BeeHouse = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new BeeHouse.Routers.Resources();
    Backbone.history.start(
      {pushState: true}
    );
  }
};

$(document).ready(function(){
  BeeHouse.initialize();
});
