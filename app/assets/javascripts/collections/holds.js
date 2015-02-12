BeeHouse.Collections.Holds = Backbone.Collection.extend({

  model: BeeHouse.Models.Hold,
  url: '/api/holds'

});

var BHHolds = BeeHouse.Collections.Holds; 