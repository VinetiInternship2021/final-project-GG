class CreateReservations < ActiveRecord::Migration[6.1]
  def change
    create_table :reservations do |t|
      t.integer :driver_id
      t.integer :passenger_id
      t.decimal :pickupLat
      t.decimal :pickupLng
      t.decimal :dropoffLat
      t.decimal :dropoffLng
      t.boolean :driverConfirmation
      t.boolean :passengerConfirmation
      t.boolean :finished
      t.timestamps
    end
  end
end
