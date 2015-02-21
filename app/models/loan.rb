class Loan < ActiveRecord::Base
  belongs_to :patron
  belongs_to :resource 

  after_create :destroy_holds 

  def returned?
    self.returned 
  end 

  def out?
    !self.returned 
  end 

  def reminded?
    self.reminded 
  end 

  def unreminded?
    !self.reminded
  end 

  def renewable?
    self.renewals < 3 
  end 

  def return 
    self.update returned: true 
  end 

  def due_in? time 
    due_date = self.ends 
    test_date = due_date - time 
    Date.today > test_date
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

    private 

    def destroy_holds
      Hold.where(
        patron_id: self.patron_id,
        resource_id: self.resource_id
      ).each &:destroy
    end 
end
