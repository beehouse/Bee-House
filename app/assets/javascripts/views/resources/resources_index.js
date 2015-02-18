BeeHouse.Views.ResourcesIndex = Backbone.View.extend({

  template: JST['resources/index'],
  events: {
    'click button.next': 'nextPage',
    'click button.previous': 'previousPage'
  },
  nextPage: function(){
    var nextPage = this.currentPage + 1;
    this.currentPage = nextPage; 

    this.collection.fetch(
      {data: {page: nextPage}, reset: true}
    ).done(function(){
      Backbone.history.navigate('books/page-'+nextPage);
      window.scrollTo(0, 0);
    });
  },
  previousPage: function(){
    if (this.currentPage !== 1) {
      var previousPage = this.currentPage - 1;
      this.currentPage = previousPage;

      this.collection.fetch(
        {data: {page: previousPage}, reset: true}
      ).done(function(){
        Backbone.history.navigate('books/page-'+previousPage);
        window.scrollTo(0, 0);
      });
    }
  },
  initialize: function(opts){
    this.per_page = 10; 
    this.currentPage = parseInt(opts.currentPage);
    this.collectionSize = $('div.container').data('count');
    this.totalPages = Math.ceil(this.collectionSize/this.per_page); 
    this.collection.on('reset', this.render, this);
  },
  render: function(){
    var previousPage = this.currentPage !== 1, 
        nextPage = this.currentPage < this.totalPages;
   
    $(this.el).html(this.template(
      {bookCount: this.collectionSize,
    previousPage: previousPage,
        nextPage: nextPage}
    ));


    // add Nav 
    this.$('.main__nav').append(new BeeHouseNav().render().el);


    // add Resources 
    _.each(this.collection.models, function(resource) {
      if (!resource.isCheckedOutByMe()) {
        this.$('.book__list').append(new BeeHouseResourcesItemView({model: resource}).render().el);
      }
    }, this);
  

    // add Profile 

    var currentPatron = BeeHouse.session.get('currentUser');
    var profileView = new BHProfile({model: currentPatron});
    $(this.el).append(profileView.render().el); 

  
    return this;
  }
});