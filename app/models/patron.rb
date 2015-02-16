class Patron < ActiveRecord::Base
  devise :database_authenticatable, :token_authenticatable

  validates :name, :email, :password, :password_confirmation, presence: true 
  validates :email, format: { with: /.+@.+\..+/i,
    message: "must be a valid address" }
  validates :name, length: { minimum: 2 } 
  validates :email, uniqueness: { case_sensitive: false, message: "has already registered with us" } 

  has_many :loans, dependent: :destroy 
  has_many :holds, dependent: :destroy 
  has_many :resources, through: :loans

  before_save :ensure_authentication_token

  def self.admins 
    Patron.where admin: true 
  end 

  def admin?
    self.admin 
  end 

  def current_loans 
    self.loans.select(&:out?).map &:to_h  
  end 

  def to_h 
    {
      id: self.id, 
      name: self.name, 
      email: self.email 
    }
  end 
end


