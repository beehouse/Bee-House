BeeHouse.Views.AdminItem = Backbone.View.extend(
  {
    template: JST['resources/admin_item'],
    events: {
      'click button.return-loan': 'returnLoan'
    },
    initialize: function(){
      this.model.on('change', this.render, this);
    },
    render: function(){

      var queue = _.sortBy(this.collection, 'created_at');
      var firstHold = _.first(queue);
      var firstHoldee = firstHold.get('holdee');
      var firstInLine = firstHoldee.split(' ')[0];

      $(this.el).html(this.template(
        {
          holds: this.collection,
          resource: this.model.toJSON(),
          onLoan: this.model.get('on_loan'),
          firstInLine: firstInLine
        }
      ));

      return this;
    },
    returnLoan: function(){
      var that = this; 
  
      var loanId = this.model.get('on_loan').id;
      var patronId = parseInt(this.model.get('on_loan').patron_id); 

      console.log('patron_id: '+patronId);
     
      var loan = new BHLoan({id: loanId});
      loan.destroy().done(function(){
        that.model.fetch();
      });

      var currentUserId = parseInt(BeeHouse.session.get('currentUser').get('id'));
      if (currentUserId === patronId) {
        BeeHouse.session.get('currentUser').fetch();
      }
    }


  }
);

var BHAdminItem = BeeHouse.Views.AdminItem; 