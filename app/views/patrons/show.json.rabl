object :@patron 

attributes :id, :name, :email, :created_at, :admin, :current_loans 

child :holds do  
  attributes :created_at, :id, :notified, :patron_id, :resource_id,  :updated_at, :title  
end    

node do |patron|
  {
    :joined => time_ago_in_words(patron.created_at)
  }
end 