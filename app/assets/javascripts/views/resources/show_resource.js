BeeHouse.Views.ResourcePage = Backbone.View.extend(
  { 
    template: JST['resources/show_resource'],
    events: {
      'click .request-resource': 'requestResource',
      'click .signin': 'signinRedirect',
      'click .add-review__toggle': 'toggleNewReview'
    },
    toggleNewReview: function(e){
      var reviewOpen = this.reviewView;
      if (!BeeHouse.session.isAuthenticated()) {
        // this feels a little rude but... 
        Backbone.history.navigate('signin', {path: '/'});
      }

      if (!reviewOpen) {
        this.reviewView = new BHNewReview({model: this.model}); 
        this.reviewView.render().$el.insertBefore('ul.reviews');
        e.currentTarget.innerText = 'Actually, Forget This Review';
      } else {
        this.reviewView.close(); 
        this.reviewView = false; 
        e.currentTarget.innerText = 'Add Your Review';
      }
    },
    requestResource: function(){
      var hold = new BHHold(),
      that = this,
      resourceId = this.model.get('id'),
      currentPatronId = BeeHouse.session.get('userId');
      hold.set('resource_id', resourceId);
      hold.set('patron_id', currentPatronId);
      hold.save()
        .done(function(){
          that.model.fetch();
        });
    },
    signinRedirect: function(){
      // decouple requestResource & 
      // store it as a callback on session 
      Backbone.history.navigate('signin', {trigger: true});
    },
    initialize: function(){
      this.listenTo(BHEvents, 'newReviewEvent', this.addReview);
      this.model.on('change', this.render, this);
    },
    showReaders: function(readers){
      var links = _.map(readers, function(reader){
        return '<a href="mailto:'+reader.email+'">'+reader.name+'</a>'; 
      });
      return links.join(', ') + '...';
    },
    buttonValue: function(resourceModel){

      var noHolds = _.isEmpty(resourceModel.get('holds')); 
      var onLoan = !!resourceModel.get('on_loan');
      var notCheckedOut = !onLoan;

      if (noHolds && notCheckedOut) {
        return 'Reserve';
      } else {
        if (notCheckedOut && resourceModel.isReservedByMe()) {           
          return 'Reserved';
        } else if (resourceModel.isHeldByMe()) {
          return 'Held';
        } else {
          return 'Hold';
        }
      }
    },
    buttonClass: function(resourceModel, signedIn){
      var noHolds = resourceModel.get('holds').length === 0,
         heldByMe = resourceModel.isHeldByMe(); 

      if (signedIn) {
        if (noHolds || !heldByMe) {
          return 'request-resource';
        } else {
          return 'disabled';
        }
      } else {
        return 'signin'
      }
    },
    addReview: function(reviewModel){
      var reviewsUl = this.$('.reviews');
      var reviewItem = new BHReviewItem(
        {model: reviewModel});
      reviewsUl.append(reviewItem.render().el);
    },
    render: function(){
      var resource = this.model.toJSON(),
      resourceId = this.model.get('id'),
        that = this; 
      
      $(this.el).html(this.template(
        {
          resource: resource,
          onLoan: resource.on_loan,
          thisResource: this.model, 
          readers: !_.isEmpty(resource.patrons),
          showReaders: this.showReaders,
          buttonValue: this.buttonValue,
          buttonClass: this.buttonClass, 
          isSignedIn: BeeHouse.session.isAuthenticated()
        }
      ));

      this.$('.main__nav').append(new BeeHouseNav().render().el);

      // add reviews 
      var reviews = new BHReviews();
      reviews.url = '/api/resources/'+resourceId+'/reviews'; 
      reviews.fetch()
        .done(function(){
          _.each(reviews.models, function(review){
            that.addReview(review);
          });
        });
      

      return this; 
    }
  }
);

var BHResourcePage = BeeHouse.Views.ResourcePage; 