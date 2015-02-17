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
            password_confirmation: "password", 
            admin: false  

clay = 
Patron.create name: "Clayton Albachten", 
              email: "clay.reed.a@gmail.com",
              password: "password",
              password_confirmation: "password",
              admin: true

cheryl = 
Patron.create name: "Cheryl Wu",
            email: "grungerabbit@gmail.com",
            password: "password",
            password_confirmation: "password", 
            admin: true 

nick = 
Patron.create name: "Thomas Delahaye",
              email: "minimalistcouch@gmail.com",
              password: "password", 
              password_confirmation: "password", 
              admin: false 

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
               description: "The Stanislavsky method is a set of practices used to bring an actor into a state where inspiration is most likely to occur. Dramaturge Lee Strasberg recounts the biographical events, intellectual influences and educational work responsible for his conversion and refinements to the method. This copy has been inscribed as a gift by a close friend of the previous owner for his 26th birthday.", 
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
                description: "Hofstadter pens a hypomanic tome to house his thought on the nature of thought. It has the most beautiful cover you've ever seen.",
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


Resource.create [
  {
    quantity: 1,
    available: 1, 
    title: 'The Compleat Purge',
    creator: 'Trisha Low',
    description: 'Poet Trisha Low models a scramble suit of suicidal young women for our pleasure & delight.',
    publisher: 'Kenning Editions',
    date: Date.parse('October, 2013'), 
    format: 'paperback',
    language: 'American English'
  },
  {
    quantity: 1,
    available: 1,
    title: 'A Discipline of Programming',
    creator: 'Edgar W. Dijkstra',
    description: 'Dijkstra thinks about programs through a formal mathematical lens.',
    publisher: 'Prentice-Hall',
    date: Date.new(1976),
    format: 'hardcover',
    language: 'English'
  },
  {
    quantity: 1,
    available: 1,
    title: 'Collected Poems',
    creator: 'Joseph Ceravolo',
    description: 'All poems Joseph Ceravolo wrote, organized by book.',
    publisher: 'Wesleyan University Press',
    date: Date.new(2013),
    format: 'hardcover',
    language: 'American English'
  },
  {
    quantity: 1,
    available: 1,
    title: 'The Poets of the New York School',
    creator: 'John Bernard Myers',
    description: 'John Bernard Myers, co-founder of the Tibor de Nagy gallery, collects together representative works by the New York School of Poets. Including poems by Ashbery, Ceravolo, Kenward Elmslie, Barbara Guest, Kenneth Koch, Frank Lima, O\'Hara, Schuyler & Tony Towle, the volume interleaves these w/ some paintings.',
    date: Date.new(1969),
    publisher: 'The Falcon Press',
    format: 'hardcover',
    language: 'American English'
  },
  {
    quantity: 1,
    available: 1,
    title: 'The Mythical Man-Month',
    creator: 'Frederick P. Brooks, Jr.',
    description: 'Several essays on making software. The title alludes to the thought, "The more developers working on it, the faster it\'ll get done." This is the greenish blue, 20th Anniversary Edition, paperback.',
    date: Date.new(2007),
    publisher: 'Addison-Wesley',
    format: 'paperback',
    language: 'English'
  },
  {
    quantity: 1,
    available: 1,
    title: 'Francesca Woodman\'s Notebook',
    creator: 'Francesca Woodman',
    description: 'This is a reproduction of Woodman\'s previously unpublished artist book Quaderno.',
    date: Date.new(2011),
    publisher: 'SilvanaEditoriale',
    format: 'booklet',
    language: 'Italian, English'
  },
  {
    quantity: 1,
    available: 1,
    title: 'Algebra Made Easy',
    creator: 'Edwin J. Houston',
    description: 'Being a Clear Explanation of the Mathematical Formulae Found in Prof. Thompson\'s Dynamo-Electric Machinery and Polyphase Electric Currents. Or, in other words, a voice from the 1900s elucidates the meaning of elementary mathematical symbols to one interested in learning themselves some-a \'em dynamo-electric machines.',
    date: Date.new(2012),
    publisher: 'Forgotten Books',
    format: 'paperback',
    language: 'American English'
  },
  {
    quantity: 1,
    available: 1,
    title: 'No.014: Alejandro Jodorowsky',
    description: 'This is a pink booklet reproducing pages from Jodorowsky\'s DUNE notebook, where he writes about tarot cards & art\'s power to heal.'
  },
  {
    quantity: 1,
    available: 1,
    title: 'Poem From Jail',
    creator: 'Ed Sanders',
    description: 'Very fragile, almost to the point where the cover is falling off.',
    date: Date.new(1963),
    publisher: 'City Lights Books',
    format: 'paperback',
    language: 'American English'
  },
  {
    quantity: 1,
    available: 1,
    title: 'Catching Fire',
    creator: 'Suzanne Collins',
    description: 'The second book of the Hunger Games trilogy.',
    date: Date.new(2009),
    publisher: 'Scholastic Press',
    format: 'hardcover',
    language: 'English'
  },
  {
    quantity: 1,
    available: 1,
    title: 'Schaums\'s Outline Series: Theory and Problems of Essential Computer Mathematics',
    creator: 'Seymour Lipschutz',
    description: 'An introduction to computer mathematics from the 1980s. Beautifully typeset with a lurid pink cover, perfect for maths.',
    date: Date.new(1982),
    publisher: 'McGraw-Hill Book Company',
    format: 'paperback',
    language: 'English'
  },
  {
    quantity: 1,
    available: 1,
    title: 'Beautiful Geometry',
    creator: 'Eli Maor and Eugen Jost',
    description: 'An art book, the union of a mathematical historian and an artist to explain the elegance of geometric principles. Gorgeous illustrations, diagrams, and proofs. Cogent, easy introduction to geometry.',
    date: Date.new(2014),
    publisher: 'Princeton University Press',
    format: 'hardcover',
    language: 'English'
  },
  {
    quantity: 1,
    available: 1,
    title: 'AngularJS Novice to Ninja',
    creator: 'Sandeep Panda',
    description: 'A fun guidebook to AngularJS.',
    date: Date.new(2014),
    publisher: 'Sitepoint',
    format: 'paperback',
    language: 'English'
  },
  {
    quantity: 1,
    available: 1,
    title: 'Becoming Functional',
    creator: 'Joshua Backfield',
    description: '',
    date: Date.new(2014),
    publisher: 'O\'Reilly Media',
    format: 'paperback',
    language: 'English'
  },
  {
    quantity: 1,
    available: 1,
    title: 'The Fractal Geometry of Nature',
    creator: 'Benoit B. Mandlebrot',
    description: 'Third edition. Beautiful math and beautiful prints, the seminal book on fractals from Mandlebrot himself. Requires knowledge of advanced mathematics to fully understand the paper, although Mandlebrot\'s prose is glorious.',
    date: Date.new(1983),
    publisher: 'W. H. Freeman and Company',
    format: 'hardcover',
    language: 'English'
  },
  {
    quantity: 1,
    available: 1,
    title: 'SVG Essentials',
    creator: 'J. David Eisenberg and Amelia Bellamy-Royds',
    description: 'Second edition. A beginner\'s guide to Scalable Vector Graphics. Does not require prior experience with web development or design to get started.',
    date: Date.new(2014),
    publisher: 'O\'Reilly Media',
    format: 'paperback',
    language: 'English'
  },
  {
    quantity: 1,
    available: 1,
    title: 'The Little Prince',
    creator: 'Antoine de Saint-Exupéry',
    description: 'English translation. The beloved short story from Saint-Exupéry, alongside his original pen and watercolor illustrations. Charming modern edition.',
    date: Date.new(2000),
    publisher: 'Harcourt',
    format: 'paperback',
    language: 'English'
  },
  {
    quantity: 1,
    available: 1,
    title: 'Le Petit Prince',
    creator: 'Antoine de Saint-Exupéry',
    description: 'Original French version. The beloved short story from Saint-Exupéry, alongside his original pen and watercolor illustrations. Charming modern edition.',
    date: Date.new(2001),
    publisher: 'Harcourt',
    format: 'paperback',
    language: 'French'
  }
]
