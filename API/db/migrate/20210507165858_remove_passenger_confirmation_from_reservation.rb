class RemovePassengerConfirmationFromReservation < ActiveRecord::Migration[6.1]
  def change
    remove_column :reservations, :passengerConfirmation, :boolean
  end
end
