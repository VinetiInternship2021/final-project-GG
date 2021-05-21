class AddActiveReservationToDrivers < ActiveRecord::Migration[6.1]
  def change
    add_column :drivers, :active_reservation, :boolean
  end
end
