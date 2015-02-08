BeeHouse.Models.Session = Backbone.Model.extend(
  {
    defaults: {
      userId: null,
      authToken: null  
    },
    initialize: function() {
      this.load();
    },
    isAuthenticated: function(){
      return !!this.get('authToken');
    },
    save: function(){
      $.cookie('user_id', this.get('userId'));
      $.cookie('authentication_token', this.get('authToken')); 
    },
    load: function(){
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
      $.ajax(
        {
          type: 'DELETE', 
          url: '/api/session.json', 
          data: null, 
          success: function(error){
            if (data.error) {
              console.log("I couldn't destroy the session!");
            } else {
              console.log("I destroyed the session!");
            } 
          }
        }
      );
    }
  }
);

BeeHouseSession = BeeHouse.Models.Session; 