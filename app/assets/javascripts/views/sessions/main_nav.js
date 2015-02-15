// active state nav highlighting. what's a better way to do this?
var setCurrentView = "books";

BeeHouse.Views.MainNav = Backbone.View.extend(
  {
    template: JST['partials/main_nav'],
    events: {
      'click .signout': 'signout',
      'click .signin': 'signin',
      'click .admin': 'adminPanel',
      'click .books': 'booksIndex',
      'click .beehouse__pg-logo': 'booksIndex',
      'click .patrons': 'patronsIndex'
    },
    booksIndex: function(e){
      e.preventDefault();
      Backbone.history.navigate('books', {trigger: true});
      setCurrentView = "books";
    },
    patronsIndex: function(e) {
      e.preventDefault();
      Backbone.history.navigate('patrons', {trigger: true});
      setCurrentView = "patrons";
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
      setCurrentView = "admin";
    },
    render: function(){
      var currentUser = BeeHouse.session.get('currentUser');
      var session = BeeHouse.session.isAuthenticated(); 

      console.log(setCurrentView);
 
      $(this.el).html(this.template(
        {
          currentUser: currentUser,
          session: session,
          active: setCurrentView
        }
      ));

      return this; 
    }
  }
);

var BeeHouseNav = BeeHouse.Views.MainNav; 