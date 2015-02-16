BeeHouse.Views.ReviewItem = Backbone.View.extend(
  {
    template: JST['reviews/item'],
    tagName: 'li',
    render: function() {
      $(this.el).html(this.template(
        {
          review: this.model.toJSON()
        }
      ));
      return this; 
    }
  }
);

var BHReviewItem = BeeHouse.Views.ReviewItem; 