class Patron < ActiveRecord::Base
  has_secure_password 

  has_many :loans 
  has_many :holds 
  has_many :resources, through: :loans

end
