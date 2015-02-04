class Resource < ActiveRecord::Base

  has_many :loans 
  has_many :holds 
  has_many :patrons, through: :loans
 end
