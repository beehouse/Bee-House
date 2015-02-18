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
      'books/page-:num': 'indexResources',
      'books/:id': 'showResource',
      'admin': 'showAdminPanel',
      'patrons': 'indexPatrons',
      '': 'landingPage',
      'signout': 'signoutPatron',
      'signin': 'landingPage',
      'signup': 'landingPage',
      '*default': 'landingPage'
    }, 
    // Use regex in requiresAuth for dynamic paths 
    // e.g. if books/:id, /^books\/[1-9][0-9]*$/ 
    requiresAuth: ['books', 'patrons', 'admin', 'signout'],
    redirectToAfter: [/^books\/[1-9][0-9]*$/],
    preventAccessWhenAuth: ['signup', 'signin', ''], 
    before: function(params, next){
      // check if user is authenticated
      // check if path requires auth 
      var isAuth = BeeHouse.session.isAuthenticated();
      console.log("They are authed?  "+isAuth+'!');
      var path = Backbone.history.fragment;
      var sayPath = path === '' ? 'the root view' : path;

      // needed a Underscore predicate so used _.some()
      var needAuth = _.some(this.requiresAuth, function(requireAuthPath){
        if (_.isRegExp(requireAuthPath)) {
          return requireAuthPath.test(path); 
        } else {
          return path === requireAuthPath; 
        }
      });

      var redirectToAfter = _.some(this.redirectToAfter, function(redirectToAfterPath){
        if (_.isRegExp(redirectToAfterPath)) {
          return redirectToAfterPath.test(path);
        } else {
          return redirectToAfterPath === path; 
        }
      });
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
        if(redirectToAfter && !isAuth) {
          console.log("If they log in I'll send 'em back here.");
          BeeHouse.session.set('redirectedFrom', path);
        }
        
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
      // Handle fetch error 
    },
    // the VIEWS 
    landingPage: function(){
      var landingPageView = new BeeHouseLanding();
      this.changeView(landingPageView);   
    },
    indexResources: function(page){
      page = page || 1; 
      var that = this; 
      var resources = new BeeHouse.Collections.Resources();

      resources.fetch({data: {page: page}})
        .done(function(){
          var resourcesView = new BeeHouse.Views.ResourcesIndex(
            {
              collection: resources,
              currentPage: page 
            }
          );
          that.changeView(resourcesView); 
        }).fail(function(error){
          console.log("There was an error!:"); 
          console.log(error);
        });
    }, 
    showResource: function(resourceId){
      var that = this; 
      
      var resource = new BHResource({id: resourceId});
      resource.fetch()
        .done(function(){
          var resourcePage = new BHResourcePage({model: resource});

          that.changeView(resourcePage);
        });
    },
    indexPatrons: function() {
      var that = this;
      var patrons = new BeeHouse.Collections.Patrons();

      patrons.fetch()
        .done(function() {
          var patronsView = new BeeHouse.Views.PatronsIndex({collection: patrons});
          that.changeView(patronsView);
        }).fail(function(error) {
          console.log("There was an error!");
          console.log(error);
        });
    },
    showPatrons: function(patronId) {

      // will reinstate later
      /*var that = this;

      var patrons = new BHPatrons();
      patrons.fetch()
        .done(function() {
          var patronPage = new BHPatrons({model: patronId});

          that.changeView(patronPage);
        });*/
    },
    signoutPatron: function(){
      BeeHouse.session.clear(); 
      Backbone.history.navigate('', {trigger: true});
    },
    showAdminPanel: function(){
      var currentUser = BeeHouse.session.get('currentUser');
      var isAdmin = currentUser.get('admin');

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