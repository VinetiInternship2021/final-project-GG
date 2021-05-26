class RemoveDriverConfirmationFromReservation < ActiveRecord::Migration[6.1]
  def change
    remove_column :reservations, :driverConfirmation, :boolean
  end
end
