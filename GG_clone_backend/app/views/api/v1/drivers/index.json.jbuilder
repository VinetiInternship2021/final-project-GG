json.array! @users do |user|
  json.driver do
    json.id user.id
    json.phone_number = user.phone_number
    json.fisrt_name user.first_name
    json.last_name user.last_name
    json.is_active user.is_active
    json.is_verified_by_admin user.is_verified_by_admin
    json.car_level user.car_level
  end
end