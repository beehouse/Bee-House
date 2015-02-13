class PatronMailer < ActionMailer::Base
  default from: "clay.reed.a@gmail.com"

  def welcome_patron id
    @patron = Patron.find id  
    mail(
      to: @patron.email, 
      subject: 'Welcome to Beehouse!') 
  end 

  def notify_patron patron_id, resource_id 
    @patron = Patron.find patron_id
    @resource = Resource.find resource_id
    mail(
      to: @patron.email,
      subject: "#{@resource.title}'s ready, come get it!")
  end 
end
