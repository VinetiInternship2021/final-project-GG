class AddRememberDigest < ActiveRecord::Migration[6.1]
  def change
    add_column :super_users, :remember_digest, :string
  end
end
