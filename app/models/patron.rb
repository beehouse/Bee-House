class Patron < ActiveRecord::Base
  devise :database_authenticatable, :token_authenticatable

  has_many :loans 
  has_many :holds 
  has_many :resources, through: :loans

  before_save :ensure_authentication_token

  def self.admins 
    Patron.where admin: true 
  end 
end
