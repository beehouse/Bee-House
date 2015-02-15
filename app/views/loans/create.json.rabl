object :@loan 

attributes :id, :resource_id, :patron_id, :created_at, :began, :ends 

node do |loan|
  {
    patron_name: loan.patron.name,
    title: loan.resource.title,
    renewals: loan.renewals,
    returned: loan.returned,
    due_on: loan.ends.strftime('%-d/%-m/%Y'),
    ends_formatted: loan.ends.strftime('%-d/%-m/%Y')
  }
end 