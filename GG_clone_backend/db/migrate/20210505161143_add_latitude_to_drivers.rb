class AddLatitudeToDrivers < ActiveRecord::Migration[6.1]
  def change
    add_column :drivers, :latitude, :decimal
    add_column :drivers, :longitude, :decimal
  end
end
