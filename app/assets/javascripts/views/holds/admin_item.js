BeeHouse.Views.AdminItem = Backbone.View.extend(
  {
    template: JST['resources/admin_item'],
    events: {
      'click button.return-loan': 'returnLoan',
      'click button.new-loan': 'newLoan'
    },
    initialize: function(){
      var that = this;
      this.queue = _.sortBy(this.collection.models, function(hold){
        return hold.get('created_at');
      }); 
      this.model.on('change', this.render, this);
    },
    render: function(){

      var firstHold = _.first(this.queue);
      var firstHoldee = firstHold.get('holdee');
      var firstInLine = firstHoldee.split(' ')[0];

      $(this.el).html(this.template(
        {
          holds: this.queue,
          thisModel: this.model, 
          thisCollection: this.collection, 
          resource: this.model.toJSON(),
          onLoan: this.model.get('on_loan'),
          firstHold: firstHold,
          buttonClass: this.buttonClass,
          buttonValue: this.buttonValue,
          firstInLine: firstInLine
        }
      ));

      return this;
    },
    buttonClass: function(thisModel, thisCollection){
      var isOnLoan = thisModel.get('on_loan');
      var firstHold = _.first(thisCollection);
      var isNotified = firstHold.get('notified');
 
      if (isNotified) {
        return 'disabled';
      } else {
        return isOnLoan ? 'return-loan' : 'new-loan';
      }
    },
    buttonValue: function(thisCollection){
      var firstHold = _.first(thisCollection);
      var isNotified = firstHold.get('notified'); 
      var firstHoldeeName = firstHold.get('holdee');
      var firstHoldeeFirstName = firstHoldeeName.split(' ')[0] 
      if (isNotified) {
        return 'notified '+firstHoldeeFirstName;
      } else {
        return 'notify '+firstHoldeeFirstName; 
      }
    },
    newLoan: function(){
      var that = this; 
      var firstHold = _.first(this.queue);
      var firstHoldId = firstHold.get('id');
      $.ajax('/api/loans/new',
        {
          type: 'GET',
          data: {hold_id: firstHoldId},
          success: function(resp){
            var hold = that.collection.get(firstHoldId);
            hold.fetch().done(function(){
              that.queue = _.sortBy(that.collection.models, function(hold){
        hold.get('created_at');
      }); 
              that.render();
            });
          }
        }
      );
    },
    returnLoan: function(){
      var that = this; 
  
      var loanId = this.model.get('on_loan').id;
      var patronId = parseInt(this.model.get('on_loan').patron_id); 
     
      var loan = new BHLoan({id: loanId});
      loan.destroy().done(function(){
        that.model.fetch();
        that.newLoan();
      });

      var currentUserId = parseInt(BeeHouse.session.get('currentUser').get('id'));
      if (currentUserId === patronId) {
        BeeHouse.session.get('currentUser').fetch();
      }
    }


  }
);

var BHAdminItem = BeeHouse.Views.AdminItem; 