class AddRememberDigestPassenger < ActiveRecord::Migration[6.1]
  def change
    add_column :passengers, :remember_digest, :string
  end
end
