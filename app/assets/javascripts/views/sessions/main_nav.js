BeeHouse.Views.MainNav = Backbone.View.extend(
  {
    template: JST['partials/main_nav'],
    events: {
      'click .signout': 'signout',
      'click .admin': 'adminPanel',
      'click .books': 'booksIndex'
    },
    booksIndex: function(e){
      e.preventDefault();
      Backbone.history.navigate('books', {trigger: true});
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
      console.log(currentUser);
      $(this.el).html(this.template({currentUser: currentUser}));
      return this; 
    }
  }
);

var BeeHouseNav = BeeHouse.Views.MainNav; 