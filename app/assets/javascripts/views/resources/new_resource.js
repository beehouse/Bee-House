BeeHouse.Views.BHNewResource = Backbone.View.extend(
  {
    template: JST['resources/new_resource'],
    events: {
      'submit form': 'createBook'
    },
    initialize: function(){},
    createBook: function(e){
      e.preventDefault();

      console.log("OK, sir or madame!");

          var that = this, 
          titleStr = $('#title_input').val(),
        creatorStr = $('#creator_input').val(),
           dateStr = $('#date_input').val(),
      publisherStr = $('#publisher_input').val(),
         formatStr = $('#format_input').val(),
       languageStr = $('#language_input').val(),
    descriptionStr = $('#description_textarea').val();

      var resource = new BHResource(
        {
          title: titleStr,
          creator: creatorStr,
          date: dateStr,
          publisher: publisherStr,
          format: formatStr,
          language: languageStr,
          description: descriptionStr
        }
      );

      resource.save()
        .done(function(){
          console.log("It has been as you have commanded.");
          that.render();
        })
        .fail(function(error){
          console.log("There was an error!");
          console.log(error);

        });
    },
    appendInventoryItem: function(bookModel) {
      var view = new BHInventoryItem({model: bookModel}); 
      this.$(".add-book__inventory")
        .append(view.render().el);
    },
    render: function(){
      $(this.el).html(this.template(
        {bookCount: this.collection.length}));

      this.$('.main__nav').append(new BeeHouseNav().render().el);

      _.each(this.collection.models, 
        function(book) {
          this.appendInventoryItem(book);
        }, 
      this); 
      
      return this;
    }
  }
);

var BHNewResource = BeeHouse.Views.BHNewResource;