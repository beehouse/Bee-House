BeeHouse.Models.Session = Backbone.Model.extend(
  {
    defaults: {
      userId: null,
      authToken: null,
      currentUser: new BHPatron()  
    },
    initialize: function() {
      this.load();
    },
    isAuthenticated: function(){
      return !!this.get('authToken');
    },
    getCurrentUser: function(callback){
      var that = this;  
      if (this.get('userId') && this.get('authToken')) { 
        this.get('currentUser').set('id', this.get('userId'))
          .fetch(
            {
              success: callback
            }
          );
      } else {
        callback();
      }
    },
    save: function(){
      $.cookie('user_id', this.get('userId'));
      $.cookie('authentication_token', this.get('authToken')); 
    },
    load: function(){
      var that = this; 

      this.set(
        {
          userId: $.cookie('user_id'),
          authToken: $.cookie('authentication_token')
        }
      );
    },
    clear: function(){
      this.set('authToken', null);
      this.set('userId', null);
      this.save();
      this.set('currentUser', new BHPatron());
    }
  }
);

BeeHouseSession = BeeHouse.Models.Session; 