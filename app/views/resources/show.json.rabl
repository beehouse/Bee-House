object :@resource 

attributes :id, :title, :creator, :date, :description, :publisher, :quantity, :available, :language, :format 

child :holds do 
  attributes :id, :patron_id, :resource_id, :created_at
end 