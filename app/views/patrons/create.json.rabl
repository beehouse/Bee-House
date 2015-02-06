object :@patron 

attributes :id, :name, :email, :created_at

node do |patron|
  {
    :joined => time_ago_in_words(patron.created_at) 
  }
end 

child :resources do 
  attributes :id, :title, :creator 
end 