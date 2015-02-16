BeeHouse.Views.NewLoan = Backbone.View.extend(
  {
    tagName: "li",
    template: JST['loans/new_loan'],
    events: {
      'click button.create-loan': 'createLoan'
    },
    initialize: function(options){
      this.options = options || {};

    },
    createLoan: function(){
      var that = this; 
      var patronId = parseInt(this.options.patronId); 
      var resourceId = this.model.get('id');


      var newLoan = new BHLoan({patron_id: patronId, resource_id: resourceId});
      newLoan.save()
        .done(function(){
          that.$('button.create-loan')
          .text('Loaned')
          .removeClass('create-loan')
          .addClass('disabled');
          BHEvents.trigger('newLoanEvent', newLoan.toJSON());
          var currentUser = BeeHouse.session.get('currentUser'); 
          var currentUserId = parseInt(currentUser.get('id'));
          if (currentUserId === patronId){
            BHEvents.trigger('reloadCurrentUser');
          }
        }); 
    },
    render: function(){
      $(this.el).html(this.template(
        {
          resource: this.model.toJSON()
        }
      ));
      return this; 
    }
  }
);

var NewLoan = BeeHouse.Views.NewLoan; 