class Review < ActiveRecord::Base

  validates :content, presence: true 
  
  belongs_to :patron 
  belongs_to :resource 
end
