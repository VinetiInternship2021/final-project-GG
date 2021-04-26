class AddIndexToDriversAndPassengers < ActiveRecord::Migration[6.1]
  def change
    add_index :drivers, :phone_number, unique:true
    add_index :passengers, :phone_number, unique:true
  end
end
