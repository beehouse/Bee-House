class AdminMailer < ActionMailer::Base
  default to: Patron.admins.pluck(:email),
        from: 'beehouse.robot@gmail.com'

  BEE_SMTP_SETTINGS = {    
    address: 'smtp.gmail.com',
    port: '587',
    domain: 'gmail.com',
    authentication: 'plain',
    enable_starttls_auto: true, 
    user_name: 'beehouse.robot',
    password: ENV['BEE_GMAIL_PASSWORD']
  }

  def notify_of_hold resource_id, patron_id 
    @resource = Resource.find(resource_id)
    @patron = Patron.find(patron_id)
    message = mail(subject: "#{@patron.name} wants #{@resource.title}", 
                    content_type: 'text/html', 
                      body: render(template: 'admin_mailer/notify_of_hold'))
    message.delivery_method.settings.merge!(BEE_SMTP_SETTINGS)
    message 
  end 

end
