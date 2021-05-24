# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Passenger.create({ first_name: 'Hakob', last_name: 'Arshakyan', phone_number: '+37444556699', email: 'harshakayan@mail.com', password_digest: Passenger.digest('Passenger1') })
Passenger.create({ first_name: 'Levon', last_name: 'Hakobyan', phone_number: '+37444121232', email: 'lakobyan777thug@mail.com', password_digest: Passenger.digest('Passenger2') })
Passenger.create({ first_name: 'Gegham', last_name: 'Antonyan', phone_number: '+37455656522', email: 'gexamo@mail.com', password_digest: Passenger.digest('Passenger3') })

Driver.create({ first_name: 'Sarqis', last_name: 'Araqelyan', phone_number: '+37444556699', email: 'harshakayan@mail.com', car_model: 'Tida', car_level: 'standard', car_manufacturer: 'Nissan', car_registration_number: '00oo555', is_active: false, is_verified_by_admin: true, password_digest: Driver.digest('Driver1') })
Driver.create({ first_name: 'Sevak', last_name: 'Levonyan', phone_number: '+37477558800', email: 'levonyansevak@mail.com', car_model: 'Camry', car_level: 'premium', car_manufacturer: 'Toyota', car_registration_number: '66uu786', is_active: false, is_verified_by_admin: false, password_digest: Driver.digest('Driver2') })
Driver.create({ first_name: 'Hambardzum', last_name: 'Bakunts', phone_number: '+37455896532', email: 'bambardzum1298@mail.com', car_model: 'Vectra', car_level: 'econom', car_manufacturer: 'Opel', car_registration_number: '19de966', is_active: true, is_verified_by_admin: true, password_digest: Driver.digest('Driver3') })

SuperUser.create(phone_number: '+37441322020', first_name: 'Vazgen', last_name: 'Admin', password_digest: SuperUser.digest('Admin1234'))

require 'faker'

SuperUser.create(
  phone_number: '055123456',
  first_name: 'John',
  last_name: 'Smith',
  password: '123456789'
)

20.times do
  driver =Driver.new(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    phone_number: "05512#{Faker::PhoneNumber.extension}",
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
    phone_number: "05512#{Faker::PhoneNumber.extension}",
    email: Faker::Internet.email,
    password: '123456789'
  )

  passenger.save!
end