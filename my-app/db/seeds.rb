require 'faker'

puts "🌱 Seeding spices..."

#user data
brittany = User.create(username: "bcatone", password: "password", first_name: "Brittany", last_name: "Catone", city: "Charlotte", country: "United States", postal_code: "28105", date_of_birth: "1989-01-01", occupation: "Software Engineer")
olivia = User.create(username: "olive", password: "password", first_name: "Olivia", last_name: "Perez", city: "Austin", country: "United States", postal_code: "73301", date_of_birth: "1989-03-03", occupation: "Project Manager")
chloe = User.create(username: "chloexoxo", password: "password", first_name: "Chloe", last_name: "Peccorino" , city: "Beacon", country: "United States", postal_code: "12508", date_of_birth: "1985-07-23", occupation: "Content")
patrick = User.create(username: "patrick123", password: "password", first_name: "Patrick", last_name: "Knowles", city: "Orlando", country: "United States", postal_code: "32789", date_of_birth: "1997-04-24", occupation: "Marketing")
alex = User.create(username: "alexxx", password: "password", first_name: "Alex", last_name: "Mac", city: "Orlando", country: "United States", postal_code: "32804", date_of_birth: "1998-03-01", occupation: "IT")

# interest data
arts = Interest.create(interest: "Art and Culture")
gaming = Interest.create(interest: "Gaming")
reading = Interest.create(interest: "Reading")
traveling = Interest.create(interest: "Travel")
sports = Interest.create(interest: "Sports")
outdoor_activies = Interest.create(interest: "Outdoor Activies")
health = Interest.create(interest: "Health and Wellness")
politics = Interest.create(interest: "Politics")
religion = Interest.create(interest: "Religion and Spirituality")

# user interests data
brittany_interest1 = UserInterest.create(user_id: brittany.id, interest_id: gaming.id)
brittany_interest2 = UserInterest.create(user_id: brittany.id, interest_id: traveling.id)
olivia_interest1 = UserInterest.create(user_id: olivia.id, interest_id: arts.id)
olivia_interest2 = UserInterest.create(user_id: olivia.id, interest_id: traveling.id)
chloe_interest1 = UserInterest.create(user_id: chloe.id, interest_id: outdoor_activies.id)
chloe_interest2 = UserInterest.create(user_id: chloe.id, interest_id: religion.id)
patrick_interest1 = UserInterest.create(user_id: patrick.id, interest_id: politics.id)
patrick_interest2 = UserInterest.create(user_id: patrick.id, interest_id: health.id)
alex_interest1 = UserInterest.create(user_id: alex.id, interest_id: reading.id)
alex_interest2 = UserInterest.create(user_id: alex.id, interest_id: sports.id)


puts "✅ Done seeding!"
