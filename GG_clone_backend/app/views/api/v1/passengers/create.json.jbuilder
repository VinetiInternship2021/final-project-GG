if @user.save
  json.created true
  json.model_name 'Passenger'
  json.user do
    json.id @user.id
    json.phone_number @user.phone_number
    json.first_name @user.first_name
    json.last_name @user.first_name
    json.email @user.email
  end
else
  json.created false
  json.errors @user.errors
end
