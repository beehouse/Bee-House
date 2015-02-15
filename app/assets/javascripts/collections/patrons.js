BeeHouse.Collections.Patrons = Backbone.Collection.extend({

  model: BeeHouse.Models.Patron, 
  url: '/api/patrons'

});

var BHPatrons = BeeHouse.Collections.Patrons; 