class AddPasswordAndRememberDigestsDriver < ActiveRecord::Migration[6.1]
  def change
    add_column :drivers, :password_digest, :string
    add_column :drivers, :remember_digest, :string
  end
end
