if current_user?(@user, 'SuperUser')
  json.array! @users do |user|
    json.driver do
      json.id user.id
      json.phone_number = user.phone_number
      json.fisrt_name user.first_name
      json.last_name user.last_name
    end
  end
else
  json.errors 'dont have access'
end
