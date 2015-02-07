BeeHouse.Models.Loan = Backbone.Model.extend(
  {
    idAttribute: 'id',
    urlRoot: '/api/loans',
    renew: function(callback){
  
      var dateStr = this.get('ends');
      var date = new Date(dateStr);
      // 1. coerce `date` into integer 
      // 2. add seconds in 3 weeks 
      // 3. pass this value to date constructor 
      var renewedDate = new Date(+date+12096e5);
  
      this.set('ends', renewedDate.toISOString()); 
      this.save(null, 
        {
          success: callback
        }
      );
    }
  }
);

BHLoan = BeeHouse.Models.Loan; 