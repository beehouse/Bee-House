collection :@resources

attributes :id, :title, :creator, :date, :description, :publisher, :quantity, :available, :language, :format, :image    

child :holds do 
  attributes :id, :patron_id, :resource_id, :created_at
end 