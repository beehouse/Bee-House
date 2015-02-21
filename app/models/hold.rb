class Hold < ActiveRecord::Base
  belongs_to :patron 
  belongs_to :resource 

  def title 
    self.resource.title 
  end 
end
