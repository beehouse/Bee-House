// active state nav highlighting. what's a better way to do this?
BeeHouse.Views.MainNav = Backbone.View.extend(
  {
    template: JST['partials/main_nav'],
    events: {
      'click .fines': 'fines',
      'click .signout': 'signout',
      'click .signin': 'signin',
      'click .admin': 'adminPanel',
      'click .books': 'booksIndex',
      'click .new': 'booksNew',
      'click .beehouse__pg-logo': 'booksIndex',
      'click .patrons': 'patronsIndex'
    },
    fines: function(e){
      e.preventDefault();
      Backbone.history.navigate('fines', {trigger: true});

    },
    booksIndex: function(e){
      e.preventDefault();
      Backbone.history.navigate('books', {trigger: true});
    },
    booksNew: function(e){
      e.preventDefault();
      Backbone.history.navigate('books/new', {trigger: true});
    },
    patronsIndex: function(e) {
      e.preventDefault();
      Backbone.history.navigate('patrons', {trigger: true});
    },
    signin: function(e){
      e.preventDefault();
      Backbone.history.navigate('signin', {trigger: true});
    },
    signout: function(e){
      e.preventDefault();
      BeeHouse.session.clear();
      Backbone.history.navigate('', {trigger: true});
    },
    adminPanel: function(e){
      e.preventDefault();
      Backbone.history.navigate('admin', {trigger: true});
    },
    render: function(){
      var currentUser = BeeHouse.session.get('currentUser');
      var session = BeeHouse.session.isAuthenticated(); 
      var currentView = Backbone.history.fragment;

 
      $(this.el).html(this.template(
        {
          currentUser: currentUser,
          session: session
        }
      ));

      if (currentView == 'admin' || 
        currentView == 'books' ||
        currentView == 'patrons') {
        this.$('.'+currentView).addClass('active');
      }
      
      return this; 
    }
  }
);

var BeeHouseNav = BeeHouse.Views.MainNav; 