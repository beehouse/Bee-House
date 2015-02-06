BeeHouse.Views.Signin = Backbone.View.extend({

  template: JST['sessions/signin'],
  events: {
    'submit form': 'authorize'
  },
  authorize: function(e){
    e.preventDefault();
    var submitButton = this.$('button');
    var theForm = this.$('form.signin');
    console.log(theForm);
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
      if (err) {cachedThis.loginFailure();}
      else {cachedThis.loginSuccess(user); }
    });
    return (theForm.data('user-authorized') === true);
  },
  loginSuccess: function(user) {
    var theForm = this.$('form.signin'); 
    theForm.data('user-authorized', true);
    console.log(user.get('id'));
    BeeHouse.session.set('userId', user.get('id'));
    BeeHouse.session.save();
    BeeHouse.resourcesRoutes.navigate('/books', true);
  },
  loginFailure: function() {
    this.$el.animate({left: '-=20'}, 100);
    this.$el.animate({left: '+=40'}, 100);
    this.$el.animate({left: '-=40'}, 100);
    this.$el.animate({left: '+=40'}, 100);
    this.$el.animate({left: '-=20'}, 100);
    this.emailField.focus();
    this.submitButton.removeClass('disabled');
  },
  render: function(){
    $(this.el).html(this.template());
    return this; 
  }

});

var BeeHouseSignin = BeeHouse.Views.Signin; 