class Patron < ActiveRecord::Base
  devise :database_authenticatable, :token_authenticatable

  validates :name, :email, presence: true   
  validates :email, format: { with: /.+@.+\..+/i,
    message: "must be a valid address" }
  validates :name, length: { minimum: 2 } 
  validates :email, uniqueness: { case_sensitive: false, message: "has already registered with us" } 

  validates :password, :password_confirmation, presence: true, :if => :password_required?
  validates_confirmation_of :password, :if => :password_required?

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

    def password_required? # if we don't have a patron 
      # or they try to enter a password 
      !self.persisted? || !password.nil? || !password_confirmation.nil?
    end 

    def defaults 
      self.admin = false if self.admin.nil? 
    end 
end


