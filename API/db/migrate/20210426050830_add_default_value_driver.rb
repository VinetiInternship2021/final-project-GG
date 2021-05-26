class AddDefaultValueDriver < ActiveRecord::Migration[6.1]
  def change
    change_column :drivers, :is_active, :boolean, default: false
    change_column :drivers, :is_verified_by_admin, :boolean, default: false
  end
end
