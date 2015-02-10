class PatronMailer < ActionMailer::Base
  default from: "clay.reed.a@gmail.com"

  def welcome_patron(id)
    @patron = Patron.find(id)  
    mail(
      to: @patron.email, 
      subject: 'Welcome to Beehouse!') 
  end 
end
