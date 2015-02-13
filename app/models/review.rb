class Review < ActiveRecord::Base
  belongs_to :patron 
  belongs_to :resource 
end
