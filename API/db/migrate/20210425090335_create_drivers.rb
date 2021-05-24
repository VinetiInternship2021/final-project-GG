class CreateDrivers < ActiveRecord::Migration[6.1]
  def change
    create_table :drivers do |t|
      t.string :first_name
      t.string :last_name
      t.string :phone_number
      t.string :email
      t.string :car_manufacturer
      t.string :car_model
      t.string :car_registration_number
      t.string :driver_license_image_id
      t.boolean :is_active
      t.boolean :is_verified_by_admin
      t.string :car_level

      t.timestamps
    end
  end
end
