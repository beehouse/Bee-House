BeeHouse.Views.PatronProfile = Backbone.View.extend({

  template: JST['patrons/profile'],
  initialize: function(){
    _.bindAll(this,"render"); // keep this.model available 
    this.model.on('change', this.render);
  },
  render: function(){
    // Add their info
    $(this.el).html(this.template({user: this.model.toJSON()}));

    // jQuery UI tabs   
    this.$("section#tabs").tabs({
      active: 0,
      disabled: 1
    });

    // & add their Loans 
     _.each(this.model.get('current_loans'), function(loanedBook) {

      var loanModel = new BHLoan(loanedBook);
 
      this.$('#patron-loans-list').append(
        new LoanItemView({model: loanModel})
          .render().el);
    }, this)

    // & their holds 
    _.each(this.model.get('holds'), function(hold) {
      this.$('#patron-holds-list').append(
        new HoldItemView({model: hold})
        .render().el);
    }, this);

    return this; 
  }

});

BHProfile = BeeHouse.Views.PatronProfile; 