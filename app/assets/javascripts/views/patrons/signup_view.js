BeeHouse.Views.SignupView = Backbone.View.extend(
  {
    template: JST['patrons/signup'],
    events: {
      'submit form': 'signupPatron'
    },

    getAttributes: function(){
      return {
        name: this.$('input.name').val(),
        email: this.$('input.email').val(),
        password: this.$('input.password').val(),
        password_confirmation: this.$('input.password_confirmation').val()
      }
    },

    signupPatron: function(e){
      e.preventDefault();
      var that = this,  
        patron = new BHPatron(this.getAttributes());
        console.log(JSON.stringify(patron.toJSON())); 

        patron.save(null, 
          {
            error: function(orig, resp, opts){
              that.$('input').removeClass('error');
              var errors = JSON.parse(resp.responseText).errors;
              _.each(errors, 
                function(val, key){
                  that.$el.find('input.'+key).addClass('error');
                }
              );

              that.submitButton.removeClass('disabled');
            },
            success: function(orig, resp, opts){
              that.$('form.signup').data('user-created', true);
              that.loginNewPatron(patron); 
         
            }
          }
        );

        return (this.$('form.signup').data('user-created') === true);
    },
    loginNewPatron: function(user){
      var userId = user.get('id'); 
      var userAuthToken = user.get('authentication_token'); 

      BeeHouse.session.set('userId', userId);
      BeeHouse.session.set('authToken', userAuthToken);
      BeeHouse.session.save();

      if (BeeHouse.session.get('redirectedFrom')) {
        var path = BeeHouse.session.get('redirectedFrom'); 
        BeeHouse.session.unset('redirectedFrom');
        Backbone.history.navigate(path, {trigger: true})
      } else {
        Backbone.history.navigate('/books', {trigger: true});
      }
    },
    render: function(){
      $(this.el).html(this.template());
      return this; 
    }
    
  }
);

var BHSignup = BeeHouse.Views.SignupView; 