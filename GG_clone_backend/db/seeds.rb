require 'faker'

SuperUser.create(
  phone_number: '37455123456',
  first_name: 'John',
  last_name: 'Smith',
  password: '123456789'
)

20.times do
  driver =Driver.new(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    phone_number: "3745512#{Faker::PhoneNumber.extension}",
    email: Faker::Internet.email,
    car_model: Faker::Vehicle.model,
    car_level: 'econom',
    car_manufacturer: Faker::Vehicle.make,
    car_registration_number: Faker::Vehicle.license_plate,
    is_active: Faker::Boolean.boolean,
    is_verified_by_admin: Faker::Boolean.boolean,
    password: '123456789'
  )

  driver.save!
end

20.times do
  passenger = Passenger.new(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    phone_number: "3745512#{Faker::PhoneNumber.extension}",
    email: Faker::Internet.email,
    password: '123456789'
  )

  passenger.save!
end