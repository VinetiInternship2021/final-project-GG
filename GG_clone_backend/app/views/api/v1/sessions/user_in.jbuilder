if @user_in.nil?
  json.user_in false
else
  json.user_in true
  json.model_name @model_name
  json.user do
    json.id @user_in.id
    json.phone_number @user_in.phone_number
    json.first_name @user_in.first_name
    json.last_name @user_in.last_name
  end
end
