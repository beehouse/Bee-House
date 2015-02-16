BeeHouse.Views.PatronIndexItem = Backbone.View.extend({
  tagName: "li",
  template: JST['patrons/patron_item'],
  events: {
    'click .new-loans': 'newLoans',
    'click .finish-check-out': 'finishCheckout'
  },
  initialize: function(){
    this.listenTo(BHEvents, 'newLoanEvent', this.addLoan);
  },
  finishCheckout: function(){
    var doneButton = this.$('.finish-check-out'); 
    this.checkOutView.close();
    this.checkOutView = null; 
    $('.new-loans').removeClass('disabled');
    doneButton.text('Check Out')
    .removeClass('finish-check-out') 
    .addClass('new-loans');
  },
  addLoan: function(loan){
    if (loan.patron_id === this.model.get('id')) { // HACK   
      var view = new BHPatronItemLoan({model: loan});
      this.$('.patron-item-loans')
        .append(view.render().el);
    }
  },
  newLoans: function(){
    var that = this; 
 
    var userId = this.model.attributes.id; 
  
    var resources = new BHResources();
    resources.fetch()
      .done(function(){
        that.$('.new-loans').text('Done').removeClass('new-loans').addClass('finish-check-out');
        $('.new-loans').addClass('disabled');
        var newLoans = new NewLoans({collection: resources, patronId: userId});
        $('.patrons-index-container').append(newLoans.render().el); 
        that.checkOutView = newLoans;
      });
  },
  render: function() {
    var that = this;
    var currentUser = BeeHouse.session.get('currentUser'); 
    $(this.el).html(this.template(
      {
        patron: this.model.toJSON(),
        isAdmin: currentUser.isAdmin()
      }
    ));

    var currentLoans = this.model.get('current_loans');
    _.each(currentLoans, function(currentLoan){
      that.addLoan(currentLoan);
    });
   
    return this;
  }
});

var BHPatronItem = BeeHouse.Views.PatronIndexItem;