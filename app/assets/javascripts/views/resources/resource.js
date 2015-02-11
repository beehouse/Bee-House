BeeHouse.Views.ResourcesItem = Backbone.View.extend(
  {
    template: JST['resources/item'],
    events: {
      'click button.book__hold': 'addToQueue'
    }, 
    initialize: function() {
      this.model.on('change', this.render, this);
    },
    addToQueue: function(e){
      var that = this; 

      // create a hold 
      var resourceId = this.model.get('id');
      var patronId = BeeHouse.session.get('userId'); 

      var initData = {
        resource_id: resourceId, 
        patron_id: patronId
      };

      var hold = new BHHold(initData);

      hold.save(null, {
        success: function(model, resp, opts){
          that.model.fetch(); 
        }
      });
    },
    buttonValue: function(resourceModel){

      var noHolds = _.isEmpty(resourceModel.get('holds')); 
      var onLoan = !!resourceModel.get('on_loan');
      var notCheckedOut = !onLoan;

      // debug logic: 
      // console.log(resourceModel.get('title'));
      // console.log(resourceModel);
      // console.log('noHolds: '+noHolds);
      // console.log('onLoan: '+onLoan);
      // console.log('notCheckedOut: '+notCheckedOut); 

      if (noHolds && notCheckedOut) {
        return 'Reserve';
      } else {
        if (notCheckedOut && resourceModel.isReservedByMe()) {           
          return 'Reserved';
        } else if (resourceModel.isHeldByMe()) {
          return 'Held';
        } else {
          return 'Hold';
        }
      }
    },
    buttonIsDisabled: function(resourceModel){
      if (resourceModel.get('holds').length === 0){
         return ''; 
      } 

      if (resourceModel.isHeldByMe()) {
        return 'disabled'; 
      } else {
        return '';
      }
    },
    render: function() {
      console.log(this.model.get('loans'));

      $(this.el).html(this.template(
        {
          book: this.model.toJSON(),
          thisModel: this.model,
          buttonValue: this.buttonValue,
          buttonIsDisabled: this.buttonIsDisabled 
        }
      ));
      return this; 
    }
  }
);

var BeeHouseResourcesItemView = BeeHouse.Views.ResourcesItem; 