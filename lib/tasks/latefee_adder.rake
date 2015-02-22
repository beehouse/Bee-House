desc "This task adds 50¢ in latefees to all patrons w/ overdue books.\n It should be run only once a day"
task :add_latefees => :environment do 
  Loan.where(returned: false).each do |loan|
    if loan.overdue? 
      patron = Patron.find(loan.patron_id)
      patron.late_fees += 50 
      patron.save 
    end 
  end  
end 
