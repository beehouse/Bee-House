BeeHouse.Views.AdminPanel = Backbone.View.extend(
  {
    template: JST['resources/admin_index'],
    initialize: function(){


    },
    render: function(){
      var holds = this.collection.models;
      var holdActivity = !_.isEmpty(holds);
      $(this.el).html(this.template(
        {
          holdActivity: holdActivity
        }
      ));
      this.$('.main__nav').append(new BeeHouseNav().render().el);

     
      var holdsByResource = _.groupBy(holds, function(hold){
        return hold.get('resource_id');
      });
      
      _.each(holdsByResource, function(holds, resource_id){

        var holdsCollection = new BHHolds(holds); 
     

        var resource = new BHResource({id: resource_id});
        resource.fetch()
          .done(function(){
            var resourceOnHold = new BHAdminItem({collection: holdsCollection, model: resource});
            $('ul.admin-books__items').append(resourceOnHold.render().el);
          });
      });

      return this;
    }
  }
);

var BHAdminPanel = BeeHouse.Views.AdminPanel;