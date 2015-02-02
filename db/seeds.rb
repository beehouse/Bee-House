# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

books = [
  {quantity: 1, available: 1, title: "A Dark Dreambox of Another Kind:
The Poems of Alfred Starr Hamilton", creator: "Alfred Starr Hamilton",
description: "An outsider poet with a mystical flavor, Hamilton writes haunting poems about war, poverty, civil disobedience and blondes. Since Hamilton had not been published in book form since 1970, this volume is a more recent attempt to make his poetry available to a wider audience. The book is a golden yellow pocket paperback, styled as part of The Song Cave's series of publications.", publisher: "The Song Cave", date: Date.new(2013), format: "paperback", language: "American English"},
  {quantity: 1, available: 1, title: "The Lean Startup: How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses", creator: "Eric Ries", publisher: "Crown Business", date: Date.new(2014), format: "hardcover", language: "English" },
  {quantity: 1, available: 1, title: "What Is Cinema?: Volume I", creator: "Andre Bazin", publisher: "University of California Press", date: Date.new(1967), language: "English translation"},
  {quantity: 1, available: 1, title: "Letters: Poems 1953-1956", creator: "Robert Duncan", publisher: "Flood Editions", date: Date.new(2003), format: "paperback", language: "American English"},
  {quantity: 1, available: 1, creator: "John Yau", title: "Borrowed Love Poems", publisher: "Penguin Books", language: "American English", description: "inscribed by author", format: "paperback"},
  {quantity: 1, available: 1, creator: "Gilles Deleuze", title: "Cinema 1: The Movement-Image", language: "English translation", publisher: "The University of Minnesota Press", description: "inscribed by previous owner, 1999", date: Date.new(1997), format: "paperback"},
  {quantity: 1, available: 1, date: Date.new(2002), creator: "Max Picard", title: "The World of Silence", publisher: "Eighth Day Press", language: "English", format: "paperback"},
  {quantity: 1, available: 1, date: Date.new(2000), creator: "John Chris Jones", format: "hardcover", title: "The Internet and Everyone", publisher: "Ellipsis", language: "English", description: "Designer John Chris Jones quirkily meditates on the Internet, includes an index card signed by the author."},
  {quantity: 1, available: 1, date: Date.new(2012), creator: "Sianne Ngai", title: "Our Aesthetic Categories: Zany, Cute, Interesting", publisher: "Harvard University Press", language: "English", description: "In her follow-up to Ugly Feelings, Ngai continues her project of identifying and describing aesthetic categories common to postmodern culture, always with  exciting results."},
  {quantity: 1, available: 1, date: Date.new(2013), creator: "Foster Provost & Tom Fawcett", title: "Data Science for Business: What You Need to Know About Data Mining and Data-Analytic Thinking"},
  {quantity: 1, available: 1, date: Date.new(2014), creator: "Jeroen Janssens", title: "Data Science and the Command Line: Facing the Future with Time-Tested Tools", language: "English"},
  {quantity: 1, available: 1, date: Date.new(2014), title: "Fire in the Valley: the Birth and Death of the Personal Computer", publisher: "Pragmatic Bookshelf"}]

Resource.create books 

amanda = 
Patron.create name: "Amanda Kielley", 
             email: "eatingfoil@gmail.com",
            password: "password",
            password_confirmation: "password" 

clay = 
Patron.create name: "Clayton Albachten", 
              email: "clay.reed.a@gmail.com",
              password: "password",
              password_confirmation: "password"

cheryl = 
Patron.create name: "Cheryl Wu",
            email: "grungerabbit@gmail.com",
            password: "password",
            password_confirmation: "password"

nick = 
Patron.create name: "Thomas Delahaye",
              email: "minimalistcouch@gmail.com",
              password: "password", 
              password_confirmation: "password"

green = 
Resource.create quantity: 1,
               available: 1, 
                   title: "The Mystic Spiral: Journey of the Soul",
                 creator: "Jill Purce",
             description: "A history of the use of spirals in mystical & religious art.",
               publisher: "Thames and Hudson",
                    date: Date.new(1974),
                  format: "paperback monograph",
                language: "English" 

dream = 
Resource.create quantity: 1,
               available: 1,
               title: "A Dream of Passion: The Development of the Method",
               creator: "Lee Strasberg",
               description: "The Stanislavsky method is a set of practices used to bring an actor into a state where inspiration is most likely to occur. Dramaturge Lee Strasberg recounts the biographical events, intellectual influences and educational work responsible for his conversion and refinements to the method. This copy has been inscribed as a gift to previous a owner's close friend for his 26th birthday.", 
               publisher: "Little, Brown & Company",
               date: Date.new(1987),
               format: "hardcover",
               language: "English"

web = 
Resource.create quantity: 1,
                available: 1,
                title: "Jacquard's Web",
                creator: "James Essinger",
                description: "Essinger traces the history of the modern computer from the Jacquard loom in 18th century France.",
                publisher: "Oxford University Press",
                date: Date.new(2007),
                format: "paperback",
                language: "English"

analogy = 
Resource.create quantity: 1,
                available: 1,
                title: "Surfaces and Essences: Analogy as the Fuel and Fire of Thinking",
                creator: "Douglas Hofstadter & Emmanuel Sander",
                description: "Hofstadter pens another hypomanic tome, a meditation on the nature of meditation. The most beautiful cover you've ever seen.",
                publisher: "Basic Books",
                date: Date.new(2013),
                format: "hardcover",
                language: "English"

Loan.create patron_id: amanda.id, 
            resource_id: green.id, 
            renewals: 0, 
            began: Date.today, 
            ends: Date.today + 3.weeks

Loan.create patron_id: clay.id, 
          resource_id: dream.id, 
          renewals: 0,
          began: Date.today, 
          ends: Date.today + 3.weeks 

Loan.create patron_id: clay.id,
            resource_id: web.id,
            renewals: 0,
            began: Date.today, 
            ends: Date.today + 3.weeks 

Loan.create patron_id: clay.id,
            resource_id: analogy.id,
            renewals: 0,
            began: Date.today,
            ends: Date.today + 3.weeks 
