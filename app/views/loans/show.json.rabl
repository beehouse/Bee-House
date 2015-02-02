object :@loan 

attributes :id, :renewals, :began, :ends

child :patron do 
  attributes :id, :name, :email  
end 

child :resource do 
  attributes :id, :title, :creator 
end 