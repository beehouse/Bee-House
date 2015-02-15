BeeHouse.Views.PatronIndexItem = Backbone.View.extend({
  template: JST['patrons/patron_item'],
  render: function() {
   
    $(this.el).html(this.template(
      {
        patron: this.model.toJSON()
      }
    ));
    return this;
  }
});

var BHPatronItem = BeeHouse.Views.PatronIndexItem;