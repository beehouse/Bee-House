collection :@resources

attributes :id, :title, :creator, :date, :description, :publisher, :quantity, :available, :language, :format, :image, :on_loan     

child :holds do 
  attributes :id, :patron_id, :resource_id, :created_at
end 

child :loans do 
  attributes :id, :patron_id, :resource_id, :ends, :began, :returned 
end 
