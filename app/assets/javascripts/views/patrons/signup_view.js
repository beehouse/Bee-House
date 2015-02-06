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
      var cachedThis = this,  
        patron = new BHPatron(this.getAttributes());
        console.log(JSON.stringify(patron.toJSON())); 

        patron.save(null, 
          {
            error: function(orig, resp, opts){
              this.$('input').removeClass('error');
              var errors = JSON.parse(resp.responseText).errors;
              _.each(errors, 
                function(val, key){
                  cachedThis.$el.find('input.'+key).addClass('error');
                }
              );

              cachedThis.submitButton.removeClass('disabled');
            },
            success: function(){
              cachedThis.$('form.signup').data('user-created', true);
              console.log("You created a patron!");
            }
          }
        );

        return (this.$('form.signup').data('user-created') === true);
    },
  
    render: function(){
      $(this.el).html(this.template());
      return this; 
    }
    
  }
);

var BeeHouseSignup = BeeHouse.Views.SignupView; 