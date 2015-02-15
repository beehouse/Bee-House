object :@patron 

attributes :id, :name, :email, :created_at, :admin, :current_loans   

node do |patron|
  {
    :joined => time_ago_in_words(patron.created_at)
  }
end 