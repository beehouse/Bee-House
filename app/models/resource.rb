class Resource < ActiveRecord::Base

  has_many :loans 
  has_many :holds
  has_many :reviews  
  has_many :patrons, through: :loans

  # get the one loan that hasn't been returned  
  def current_loan
    self.loans.find &:out? 
  end 

  def on_loan
    current_loan ? current_loan.to_h : false 
  end 
end
