object :@patron 

attributes :id, :name, :email, :created_at

node do |patron|
  {
    :joined => time_ago_in_words(patron.created_at),
    :resources => patron.loans.map { |loan|
      resource = JSON.parse(Resource.find(loan.resource_id).to_json)
      resource["ends_raw"] = loan.ends 
      resource["renewals"] = loan.renewals   
      resource["ends"] = loan.ends.strftime('%-m/%d/%y') 
      resource["loan_id"] = loan.id
      resource 
    }  
  }
end 