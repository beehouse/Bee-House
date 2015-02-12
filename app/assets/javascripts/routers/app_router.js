// Define BaseRouter 

BeeHouse.BaseRouter = Backbone.Router.extend(
  {

    before: function(){},
    after: function(){},
    route: function(route, name, callback){
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (_.isFunction(name)){
        callback = name; 
        name = '';
      }

      if (!callback) callback = this[name];

      var router = this; 

      Backbone.history.route(route, function(fragment){
        var args = router._extractParameters(route, fragment);
        var next = function(){
          callback && callback.apply(router, args);
          router.trigger.apply(router, ['route: '+name].concat(args));
          router.trigger('route', name, args);
          Backbone.history.trigger('route', router, name, args);
          router.after.apply(router, args);
        }
        router.before.apply(router, [args, next]);
      });

      return this; 
    }
  }
);


// AppRouter 

BeeHouse.AppRouter = BeeHouse.BaseRouter.extend(
  {
    routes: {
      'books': 'indexResources',
      'books/:id': 'showResource',
      'admin': 'showAdminPanel',
      '': 'landingPage',
      'signout': 'signoutPatron',
      'signin': 'landingPage',
      'signup': 'landingPage',
      '*default': 'landingPage'
    },
    requiresAuth: ['books', 'books/:id', 'admin', 'signout'],
    preventAccessWhenAuth: ['signup', 'signin', ''], 
    before: function(params, next){
      // check if user is authenticated
      // check if path requires auth 
  
      var isAuth = BeeHouse.session.isAuthenticated();
      console.log("They are authed?  "+isAuth+'!');
      var path = Backbone.history.fragment;
      var sayPath = path === '' ? 'the root view' : path; 
      var needAuth = _.contains(this.requiresAuth, path);
      var cancelAccess = _.contains(this.preventAccessWhenAuth, path);
      console.log("They need auth?  "+needAuth+'!'); 
      if (needAuth) {
        console.log("Because they need auth to view "+sayPath+'!');
      } else {
        console.log("Because they don't need auth to view "+sayPath+'!');
      }
      if(needAuth && !isAuth){
        console.log("They need auth and don't have it!");
        BeeHouse.session.set('redirectedFrom', path);
        console.log("If they get some auth I will redirect them to "+sayPath+'...');
        Backbone.history.navigate('', {trigger: true}); 
      } else if (isAuth && cancelAccess){
        console.log("They shouldn't go there if they're logged in! They should be looking at books!");
        Backbone.history.navigate('/books', {trigger: true});
      } else {
        console.log("Alright, they're cool.");
        
        return next();
      }
    },
    after: function(){},
    changeView: function(view){
      function setView(view){
        if(this.currentView){
          this.currentView.close();
        }
        this.currentView = view;
        $('.container').html(view.render().$el);
      }
      setView(view);
    },
    fetchError: function(error){
      // 
    },
    landingPage: function(){
      var landingPageView = new BeeHouseLanding();
      this.changeView(landingPageView);   
    },
    indexResources: function(){
      var that = this; 
      var resources = new BeeHouse.Collections.Resources();

      resources.fetch()
        .done(function(){
          var resourcesView = new BeeHouse.Views.ResourcesIndex({collection: resources});
          that.changeView(resourcesView); 
        }).fail(function(error){
          console.log("There was an error!:"); 
          console.log(error);
        });
    }, 
    showResource: function(){
      console.log("There is a resource!");
    },
    signoutPatron: function(){
      BeeHouse.session.clear(); 
      Backbone.history.navigate('', {trigger: true});
    },
    showAdminPanel: function(){
      var currentUser = BeeHouse.session.get('currentUser');
      var isAdmin = currentUser.get('admin');
      console.log('currentUser: ')
      console.log(currentUser); 
      console.log('They are admin?:  '+isAdmin+'!');
      if (isAdmin) {
        var that = this;
        var holds = new BHHolds();
        holds.fetch()
          .done(function(){
            var adminPanel = new BHAdminPanel({collection: holds});
            that.changeView(adminPanel);
          }).fail(function(error){
            console.log("There was an error!:");
            console.log(error);
          });
      } else {
        Backbone.history.navigate('/books', {trigger: true}); 
      }
    } 
  }
);

var BHRouter = BeeHouse.AppRouter; 