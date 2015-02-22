desc "This task warns patrons when their book is overdue"
task :warn_overdue => :environment do 
  Loan.where(returned: false).each do |loan|
    if loan.overdue? && loan.unwarned?
      PatronMailer.warn_patron(loan.id).deliver_now
      loan.update warned: true 
    end 
  end  
end 
