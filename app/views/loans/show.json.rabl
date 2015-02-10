object :@loan 

attributes :id, :renewals, :began, :ends, :patron_id, :resource_id 

child :patron do 
  attributes :id, :name, :email  
end 

child :resource do 
  attributes :id, :title, :creator 
end 