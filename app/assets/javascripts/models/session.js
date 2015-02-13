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

      var userId = this.get('userId');
      var authToken = this.get('authToken'); 

      if (userId && authToken) { 
        var currentUser = this.get('currentUser'); 
        currentUser.set('id', userId); 
        currentUser.fetch(
            {
              success: function(){
      
                callback();
              }
            }
          );
      } else {
    
        callback();
        
      }
    },
    save: function(){
      $.cookie('user_id', this.get('userId'), { path: '/' });
      $.cookie('authentication_token', this.get('authToken'), { path: '/' }); 
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
      $.removeCookie('authentication_token', { path: '/' });
      $.removeCookie('user_id', { path: '/' });
      this.set('currentUser', new BHPatron());
    }
  }
);

BeeHouseSession = BeeHouse.Models.Session; 