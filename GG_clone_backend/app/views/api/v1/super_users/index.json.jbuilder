json.array! @users do |user|
  json.super_user do
    json.id user.id
    json.phoneNumber user.phone_number
    json.firstName user.first_name
    json.lastName user.last_name
  end
end
