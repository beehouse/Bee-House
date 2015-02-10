collection :@holds 

attributes :patron_id, :resource_id, :id, :created_at

child :patron do 
  attributes :id, :name, :email  
end 

child :resource do 
  attributes :id, :title, :creator 
end     