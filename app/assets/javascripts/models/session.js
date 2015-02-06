BeeHouse.Models.Session = Backbone.Model.extend(
  {
    defaults: {
      userId: null 
    },
    initialize: function() {
      this.load();
    },
    isAuthenticated: function(){
      return !!this.get('userId');
    },
    save: function(){
      $.cookie('user_id', this.get('userId'));
    },
    load: function(){
      this.set(
        {
          userId: $.cookie('user_id')
        }
      ); 
    }
  }
);

BeeHouseSession = BeeHouse.Models.Session; 