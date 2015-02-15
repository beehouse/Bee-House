object :@resource 

attributes :id, :title, :creator, :date, :description, :publisher, :quantity, :available, :language, :format, :on_loan  

node do |resource|
  {
    year: resource.date && resource.date.strftime('%Y'),
    patrons: resource.patrons.map(&:to_h) 
  }
end 

child :holds do 
  attributes :id, :patron_id, :resource_id, :created_at
end 

child :loans do 
  attributes :id, :patron_id, :resource_id, :ends, :began, :returned  
end 

child :reviews do
  attributes :id, :patron, :patron_id, :content 
end 
