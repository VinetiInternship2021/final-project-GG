class AddIndexToSuperusersPhone < ActiveRecord::Migration[6.1]
  def change
    add_index(:super_users, :phone_number, unique: true)
  end
end
