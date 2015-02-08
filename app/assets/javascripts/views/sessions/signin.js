BeeHouse.Views.Signin = Backbone.View.extend({

  template: JST['sessions/signin'],
  events: {
    'submit form': 'authorize'
  },
  authorize: function(e){
    e.preventDefault();
    var submitButton = this.$('button');
    var theForm = this.$('form.signin');

    if (submitButton.hasClass('disabled') && !(theForm.data('user-authorized'))) {
      return false
    } else {
      submitButton.addClass('disabled');
    }

    var cachedThis = this, 
    attrs = {
      email: this.$('input[name=email]').val(),
      password: this.$('input[name=password]').val()
    };

    BHPatron.authorize(attrs, function(err, user){
      if (err) {
        cachedThis.loginFailure();
      } else {
        cachedThis.loginSuccess(user); 
      }
    });
    return (theForm.data('user-authorized') === true);
  },
  loginSuccess: function(user) {
    console.log("You succeeded at loggin in!");
    var theForm = this.$('form.signin'); 
    theForm.data('user-authorized', true);

    var userId = user.get('id'); 
    var userAuthToken = user.get('authentication_token'); 
    console.log(user);
    console.log(userId);
    console.log(userAuthToken);
    BeeHouse.session.set('userId', userId);
    BeeHouse.session.set('authToken', userAuthToken);
    BeeHouse.session.save();
    console.log(BeeHouse.session.get('authToken'));
    console.log($.cookie('authentication_token')); 
    if (BeeHouse.session.get('redirectedFrom')) {
      var path = BeeHouse.session.get('redirectedFrom'); 
      BeeHouse.session.unset('redirectedFrom');
      console.log(path);
      Backbone.history.navigate(path, {trigger: true})
    } else {
      Backbone.history.navigate('/books', {trigger: true});
    }
  },
  loginFailure: function() {
    console.log("You failed to log in!!");
    this.$el.animate({left: '-=20'}, 100);
    this.$el.animate({left: '+=40'}, 100);
    this.$el.animate({left: '-=40'}, 100);
    this.$el.animate({left: '+=40'}, 100);
    this.$el.animate({left: '-=20'}, 100);
    this.$('input[name=email]').focus();
    this.$('button').removeClass('disabled');
  },
  render: function(){
    console.log("I'm rendering the signin!");
    $(this.el).html(this.template());
    return this; 
  }

});

var BHSignin = BeeHouse.Views.Signin; 