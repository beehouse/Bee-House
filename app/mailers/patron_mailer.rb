class PatronMailer < ActionMailer::Base
  include Roadie::Rails::Mailer

  default from: "clay.reed.a@gmail.com"

  def welcome_patron id
    @patron = Patron.find id 
    @collection_count = Resource.all.size 
    roadie_mail(
      to: @patron.email, 
      subject: 'Welcome to Beehouse!') 
  end 

  def notify_patron patron_id, resource_id 
    @patron = Patron.find patron_id
    @resource = Resource.find resource_id
    roadie_mail(
      to: @patron.email,
      subject: "#{@resource.title}'s ready for pickup!")
  end 

  def remind_patron loan_id 
    @loan = Loan.find loan_id
    @patron = Patron.find @loan.patron_id
    @resource = Resource.find @loan.resource_id 
     
    roadie_mail(
      to: @patron.email,
      subject: "#{@resource.title}'s almost due!"
      )
  end 

  def warn_patron loan_id 
    @loan = Loan.find loan_id
    @patron = Patron.find @loan.patron_id
    @resource = Resource.find @loan.resource_id

    roadie_mail(
      to: @patron.email, 
      subject: "#{@resource.title}'s overdue!"
      )
  end 
end
