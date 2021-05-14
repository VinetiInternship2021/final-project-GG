if current_user && current_user[1] == 'SuperUser'
  json.array! @users do |user|
    json.passenger do
      json.id user.id
      json.phoneNumber user.phone_number
      json.firstName user.first_name
      json.lastName user.last_name
    end
  end
else
  json.errors 'dont have access'
end
