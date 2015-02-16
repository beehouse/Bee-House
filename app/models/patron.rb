class Patron < ActiveRecord::Base
  devise :database_authenticatable, :token_authenticatable

  validates :name, :email, :password, :password_confirmation, presence: true 
  validates :email, format: { with: /.+@.+\..+/i,
    message: "must be a valid address" }
  validates :name, length: { minimum: 2 } 
  validates :email, uniqueness: { case_sensitive: false, message: "has already registered with us" } 

  validates_confirmation_of :password

  has_many :loans, dependent: :destroy 
  has_many :holds, dependent: :destroy 
  has_many :reviews  
  has_many :resources, through: :loans

  before_save :ensure_authentication_token

  after_initialize :defaults

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

    private 

    def defaults 
      self.admin = false if self.admin.nil? 
    end 
end


