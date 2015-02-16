BeeHouse.Views.PatronItemLoan = Backbone.View.extend(
  {
    tagName: "li",
    template: JST['loans/patron_loan'],
    events: {
      'click .return-loan': 'returnLoan'
    },
    returnLoan: function(){
      var that = this, 
        loanId = this.model.id,
   currentUser = BeeHouse.session.get('currentUser');
      var loan = new BHLoan({id: loanId});

      var loanPatronId = parseInt(this.model.patron_id),
      currentUserId = parseInt(currentUser.get('id'));

      loan.destroy()
        .done(function(){

          if (currentUserId === loanPatronId) {
            BHEvents.trigger('reloadCurrentUser');
          }

          that.close();
        });
    },
    render: function(){
      var currentUser = BeeHouse.session.get('currentUser');
      var admin = currentUser.isAdmin();
      $(this.el).html(this.template(
        {
          loan: this.model,
          admin: admin
        }
      ));

      return this; 
    }
  }
);

var BHPatronItemLoan = BeeHouse.Views.PatronItemLoan;