BeeHouse.Views.PatronProfile = Backbone.View.extend({

  template: JST['patrons/profile'],
  initialize: function(){
    _.bindAll(this, 'render');
    this.model.on('change', this.render);
  },
  render: function(){
    // Add their info 
    $(this.el).html(this.template({user: this.model.toJSON()}));

    // & add their Loans 
     _.each(this.model.get('current_loans'), function(loanedBook) {

      // loanData = {
      //   id: loanedBook.loan_id,
      //   ends: loanedBook.ends_raw, 
      //   title: loanedBook.title,
      //   renewals: loanedBook.renewals,  
      //   ends_formatted: loanedBook.ends  
      // }; 
      var loanModel = new BHLoan(loanedBook);
 
      this.$('#patron-loans-list').append(new LoanItemView({model: loanModel}).render().el);
    }, this)

    return this; 
  }

});

BHProfile = BeeHouse.Views.PatronProfile; 