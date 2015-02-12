collection :@holds 

attributes :patron_id, :resource_id, :id, :created_at

node do |hold|
  {
    holdee: hold.patron.name, 
    made_on: hold.created_at.strftime('%-d/%-m/%Y') 
  }
end 

child :patron do 
  attributes :id, :name, :email  
end 

child :resource do 
  attributes :id, :title, :creator, :on_loan 
end     