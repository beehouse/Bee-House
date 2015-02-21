BeeHouse.Views.PatronProfileHoldItem = Backbone.View.extend(
  {
    template: JST['holds/item'],
    events: {
      'click .cancel_request': 'destroyHold'
    },
    destroyHold: function(){
      var holdId = this.model.id,
      resourceId = this.model.resource_id; 

      var patron = BeeHouse.session.get('currentUser'),
            that = this, 
            hold = new BHHold(
              {id: holdId});

      var patronHolds = patron.get('holds');

      hold
      .destroy()
      .done(function(){
        var idx = _.findIndex(patronHolds, 
          function(holdEl){
            return holdEl.id === holdId;
        });

        patronHolds.splice(idx, 1);

        BHEvents.trigger('destroyHoldEvent', resourceId);

        that.close(); 
      });  
    },
    render: function(){
      $(this.el).html(this.template(
        {hold: this.model}
      ));
      return this; 
    }
  }
);

var HoldItemView = BeeHouse.Views.PatronProfileHoldItem; 