class Loan < ActiveRecord::Base
  belongs_to :patron
  belongs_to :resource 
end
