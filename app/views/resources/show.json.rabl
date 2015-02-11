object :@resource 

attributes :id, :title, :creator, :date, :description, :publisher, :quantity, :available, :language, :format, :on_loan  

child :holds do 
  attributes :id, :patron_id, :resource_id, :created_at
end 

child :loans do 
  attributes :id, :patron_id, :resource_id, :ends, :began, :returned  
end 


