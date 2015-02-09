BeeHouse.Models.Resource = Backbone.Model.extend(
  {
    rootUrl: '/api/resources',
    isHeldByMe: function(){
      // O(n)
      var holds = this.get('holds');
      var currentUserId = parseInt(BeeHouse.session.get('userId'));
      var myHolds = _.filter(holds, function(hold){ 
        return hold.patron_id === currentUserId; 
      });

      if (myHolds.length === 0) {
        return false;
      } else {
        return true;
      }
    },
    isReservedByMe: function(){
      // O(whateverSortByIs)
      var holds = this.get('holds');
      var queue = _.sortBy(holds, 
        function(hold) { 
          return hold.created_at; 
        }
      );
      var firstInLine = _.first(queue).patron_id;
      var currentUser = parseInt(BeeHouse.session.get('userId')); 

      if (currentUser === firstInLine){
        return true; 
      } else {
        return false; 
      }
    }
  }
);
