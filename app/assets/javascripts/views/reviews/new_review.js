BeeHouse.Views.NewReview = Backbone.View.extend(
  { 
    template: JST['reviews/new_review'],
    tagName: 'section',
    events: {
      'click button.submit': 'createReview'
    },
    createReview: function(){
      var $contentTextarea = this.$('.add-review__content'),
      that = this; 
      var resourceId = this.model.get('id'),
      patronId = BeeHouse.session.get('userId'),
      content = $contentTextarea.val();

      // replace w/ Backbone model validations 
      var emptyContent = /^\s*$/.test(content),
          lessThanAWord = content.length < 5; 
      if (!(emptyContent || lessThanAWord)){
        var review = new BHReview(
          {
            patron_id: patronId,
            content: content,
            resource_id: resourceId
          }
        ); 
        
        review.urlRoot = '/api/resources/'
        +resourceId+'/reviews';

        review.save()
          .done(function(){
            BHEvents.trigger('newReviewEvent', review);
            $('button.add-review__toggle').text('Add Your Review');
            that.close();
          });

      } else {
        $contentTextarea.addClass('error');
      }
    },
    render: function(){
      $(this.el).html(this.template())
        .addClass('add-review__form');
      return this; 
    },
  }
);

var BHNewReview = BeeHouse.Views.NewReview; 