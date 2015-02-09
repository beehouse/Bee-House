BeeHouse.Views.ResourcesItem = Backbone.View.extend(
  {
    template: JST['resources/item'],
    events: {
      'click button.book__reserve': 'addToQueue',
      'click button.book__hold': 'addToQueue'
    }, 
    initialize: function() {
      this.model.on('change', this.render, this);
    },
    addToQueue: function(e){
      var that = this; 
      console.log(e);
      // create a hold 
      var resourceId = this.model.get('id');
      var patronId = BeeHouse.session.get('userId'); 
      console.log(resourceId); 
      console.log(patronId);
      var initData = {
        resource_id: resourceId, 
        patron_id: patronId
      };

      var hold = new BHHold(initData);

      hold.save(null, {
        success: function(model, resp, opts){
          console.log(JSON.stringify(model));
          console.log(JSON.stringify(resp));
          console.log(JSON.stringify(opts));
          that.model.fetch(); 
        }
      });
    },
    render: function() {
      console.log("rendering!");
      $(this.el).html(this.template({book: this.model.toJSON()}));
      return this; 
    }
  }
);

var BeeHouseResourcesItemView = BeeHouse.Views.ResourcesItem; 