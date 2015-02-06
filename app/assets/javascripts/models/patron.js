BeeHouse.Models.Patron = Backbone.Model.extend(
  {
    idAttribute: 'id',
    urlRoot: '/api/patrons',
    defaults: {
      resources: []
    },
    authenticate: function(password, callback) {
      var cachedThis = this;

      $.ajax(
        {
          type: 'POST',
          url: '/api/session.json',
          data: {
            email: this.get('email'),
            password: password
          },
          success: function(data) {
            if (data.error) {
              callback.call(this, data.error, cachedThis);
            } else {
              cachedThis.set(data);
              callback.call(this, null, cachedThis);
            }
          }
        }
      );
    }
  }
);

var BHPatron = BeeHouse.Models.Patron; 

BHPatron.authorize = function(attrs, callback) {
  var patron = new BeeHousePatron({email: attrs.email});
  patron.authenticate(attrs.password, callback);
}