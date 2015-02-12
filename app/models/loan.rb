class Loan < ActiveRecord::Base
  belongs_to :patron
  belongs_to :resource 

  def returned?
    self.returned 
  end 

  def out?
    !self.returned 
  end 

  def return 
    self.update returned: true 
  end 

  def to_h 
    {
      id: self.id, 
      patron_id: self.patron_id,
      patron_name: self.patron.name, 
      resource_id: self.resource_id,
      ends: self.ends, 
      began: self.began,
      title: self.resource.title, 
      renewals: self.renewals,
      returned: self.returned,
      due_on: self.ends.strftime('%-d/%-m/%Y'),
      ends_formatted: self.ends.strftime('%-d/%-m/%Y')
    }
  end 
end
