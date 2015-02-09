BeeHouse.Models.Resource = Backbone.Model.extend(
  {
    rootUrl: '/api/resources',
    isCheckedOutByMe: function(){
      var onLoan = this.get('on_loan');
      
      if (onLoan) {
        var currentUserId = parseInt(BeeHouse.session.get('userId'));
        var loanedToId = onLoan.patron_id; 
        return loanedToId === currentUserId;
      } else {
        return false; 
      }
    },
    isHeldByMe: function(){
      // O(n)
      var holds = this.get('holds');
      if (_.isEmpty(holds)) {
        return false 
      } else {
        var currentUserId = parseInt(BeeHouse.session.get('userId'));
        
        var myHolds = _.filter(holds, function(hold){ 
          return hold.patron_id === currentUserId; 
        });

        return !_.isEmpty(myHolds);
      }
    },
    isReservedByMe: function(){
      // O(whateverSortByIs)
      var holds = this.get('holds');

      if (_.isEmpty(holds)) {
        return false; 
      } else {

        // sort the holds into a Queue 
        var queue = _.sortBy(holds, 
          function(hold) { 
            return hold.created_at; 
          }
        );

        var firstInLine = _.first(queue).patron_id;
        var currentUser = parseInt(BeeHouse.session.get('userId')); 
        var isFirstInLine =  currentUser === firstInLine;
        console.log(firstInLine);
        console.log(currentUser);
        console.log(isFirstInLine);
        return isFirstInLine;        
      }
    }
  }
);
