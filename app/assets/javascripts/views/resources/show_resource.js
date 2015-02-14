BeeHouse.Views.ResourcePage = Backbone.View.extend(
  { 
    template: JST['resources/show_resource'],
    initialize: function(){},
    showReaders: function(readers){
      var links = _.map(readers, function(reader){
        return '<a href="mailto:'+reader.email+'">'+reader.name+'</a>'; 
      });
      console.log(links);
      return links.join(', ') + '...';
    },
    render: function(){
      var resource = this.model.toJSON(); 
      console.log(resource);
      
      $(this.el).html(this.template(
        {
          resource: resource,
          readers: !_.isEmpty(resource.patrons),
          showReaders: this.showReaders
        }
      ));

      this.$('.main__nav').append(new BeeHouseNav().render().el);

      // add reviews 
      // TODO 

      return this; 
    }
  }
);

var BHResourcePage = BeeHouse.Views.ResourcePage; 