desc "This task reminds patrons when their book is becoming due"
task :remind_due => :environment do 
  Loan.where(returned: false).each do |loan|
    if loan.due_in?(5.days) && loan.unreminded?  
      PatronMailer.remind_patron(loan.id).deliver_now
      loan.update reminded: true
    end 
  end 
end 