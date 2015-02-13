object :@hold 

attributes :patron_id, :resource_id, :id, :created_at, :notified     

child :patron do 
  attributes :id, :name, :email  
end 

child :resource do 
  attributes :id, :title, :creator 
end 