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

    BeeHouse.session.set('userId', userId);
    BeeHouse.session.set('authToken', userAuthToken);
    BeeHouse.session.save();
    BeeHouse.session.getCurrentUser(function(){

      if (BeeHouse.session.get('redirectedFrom')) {
        var path = BeeHouse.session.get('redirectedFrom'); 
        BeeHouse.session.unset('redirectedFrom');
        Backbone.history.navigate(path, {trigger: true});
      } else {
        Backbone.history.navigate('/books', {trigger: true});
      }
    });
  },
  loginFailure: function() {
    console.log("You failed to log in!!");
    var $input = this.$el.find("input");
    $input.animate({left: '-=10'}, 75).animate({left: '+=20'}, 50).animate({left: '-=10'}, 100);
    this.$('input[name=email]').focus();
    this.$('button').removeClass('disabled');
  },
  render: function(){
    $(this.el).html(this.template());
    return this; 
  }

});

var BHSignin = BeeHouse.Views.Signin; 