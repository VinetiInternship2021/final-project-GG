if current_user && current_user[1] == 'SuperUser'
  json.array! @users do |user|
    json.driver do
      json.id user.id
      json.phoneNumber user.phone_number
      json.firstName user.first_name
      json.lastName user.last_name
      json.isActive user.is_active
      json.isVerifiedByAdmin user.is_verified_by_admin
      json.carLevel user.car_level
      json.reservations user.reservations
      json.driverLicenseImageId user.driver_license_image_id
    end
  end
else
  json.errors 'dont have access'
end
