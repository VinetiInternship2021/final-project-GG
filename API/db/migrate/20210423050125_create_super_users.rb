class CreateSuperUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :super_users do |t|
      t.string :phone_number
      t.string :first_name
      t.string :last_name
      t.string :password_digest

      t.timestamps
    end
  end
end
