BeeHouse.Views.AdminPanel = Backbone.View.extend(
  {
    template: JST['resources/admin_index'],
    initialize: function(){


    },
    render: function(){
      $(this.el).html(this.template());
      this.$('.main__nav').append(new BeeHouseNav().render().el);

      var holds = this.collection.models;
      var holdsByResource = _.groupBy(holds, function(hold){
        return hold.get('resource_id');
      });
      
      _.each(holdsByResource, function(holds, resource_id){
        // ul.admin-books__items 
        // ul.admin-book__holds-queue
        var resource = new BHResource({id: resource_id});
        resource.fetch()
          .done(function(){
            var resourceOnHold = new BHAdminItem({collection: holds, model: resource});
            $('ul.admin-books__items').append(resourceOnHold.render().el);
          });
      });

      return this;
    }
  }
);

var BHAdminPanel = BeeHouse.Views.AdminPanel;