class Loan < ActiveRecord::Base
  belongs_to :patron
  belongs_to :resource 

  def returned?
    self.returned 
  end 

  def to_h 
    {
      id: self.id, 
      patron_id: self.patron_id,
      resource_id: self.resource_id,
      ends: self.ends, 
      began: self.began,
      returned: self.returned   
    }
  end 
end
