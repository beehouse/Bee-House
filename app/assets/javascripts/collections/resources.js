BeeHouse.Collections.Resources = Backbone.Collection.extend({

  model: BeeHouse.Models.Resource, 
  url: '/api/resources'

});

var BHResources = BeeHouse.Collections.Resources; 