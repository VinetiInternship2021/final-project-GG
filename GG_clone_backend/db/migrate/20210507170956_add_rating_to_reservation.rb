class AddRatingToReservation < ActiveRecord::Migration[6.1]
  def change
    add_column :reservations, :rating, :integer
  end
end
