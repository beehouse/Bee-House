collection :@reviews 

attributes :id, :patron_id, :resource_id, :content 

node do |review|
  {
    written_ago: time_ago_in_words(review.created_at),
    author: review.patron.name 
  }  
end 