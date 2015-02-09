BeeHouse.Models.Session = Backbone.Model.extend(
  {
    defaults: {
      userId: null,
      authToken: null,
      currentUser: new BHPatron()  
    },
    initialize: function() {
      this.on('authentication', this.getCurrentUser);
      this.load();
      this.getCurrentUser();
    },
    isAuthenticated: function(){
      return !!this.get('authToken');
    },
    getCurrentUser: function(){
      var that = this; 
      if (this.get('userId') && this.get('authToken')) { 
        this.get('currentUser').set('id', this.get('userId'))
          .fetch().done(function(){
            console.log(that.get('currentUser'));
          }); 
      }
    },
    save: function(){
      $.cookie('user_id', this.get('userId'));
      $.cookie('authentication_token', this.get('authToken'));
      this.trigger('authentication');  
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
    }
  }
);

BeeHouseSession = BeeHouse.Models.Session; 