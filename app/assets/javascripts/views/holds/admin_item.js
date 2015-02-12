BeeHouse.Views.AdminItem = Backbone.View.extend(
  {
    template: JST['resources/admin_item'],
    render: function(){
      var queue = _.sortBy(this.collection, 'created_at');
      var firstHold = _.first(queue);

      var firstHoldee = firstHold.get('holdee');
      
      var firstInLine = firstHoldee.split(' ')[0];
      console.log(firstInLine);
      $(this.el).html(this.template(
        {
          holds: this.collection,
          resource: this.model.toJSON(),
          onLoan: this.model.get('on_loan'),
          firstInLine: firstInLine
        }
      ));

      return this;
    }
  }
);

var BHAdminItem = BeeHouse.Views.AdminItem; 