collection :@resources

attributes :id, :title, :creator, :date, :description, :publisher, :quantity, :available, :language, :format, :image    

child :holds do 
  attributes :id, :patron_id, :resource_id, :created_at
end 

child :loans do 
  attributes :id, :patron_id, :resource_id, :ends, :began, :returned  
end 


node do |resource|
  {
    on_loan: resource.loans.map(&:to_h).select {|loan| !loan[:returned] }.first || false 
  } 
end 
