if current_user?(@user, 'Driver')
  if @user.nil?
    json.errors 'account not found'
  else
    json.exist true
    json.user do
      json.id @user.id
      json.phone_number @user.phone_number
      json.first_name @user.first_name
      json.last_name @user.first_name
      json.email @user.email
      json.car_manufacturer @user.car_manufacturer
      json.car_model @user.car_model
      json.car_level @user.car_level
      json.driver_license_image_id @user.driver_license_image_id
      json.is_active @user.is_active
      json.is_verified_by_admin @user.is_verified_by_admin
      json.car_registration_number @user.car_registration_number
      end
  end
else
  json.errors 'dont have access'
end