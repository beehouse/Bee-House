object :@patron 

attributes :id, :name, :email, :created_at, :admin  

node do |patron|
  {
    :joined => time_ago_in_words(patron.created_at),
    :current_loans => patron.current_loans
  }
end 