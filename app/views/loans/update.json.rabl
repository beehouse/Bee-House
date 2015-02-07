object :@loan 

attributes :id, :renewals, :began, :ends

node do |loan|
  {
    :title => loan.resource.title, 
    :ends_formatted => loan.ends.strftime('%-m/%d/%y')  
  }
end 