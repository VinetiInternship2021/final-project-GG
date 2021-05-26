class ChangeDriversLicenceImgType < ActiveRecord::Migration[6.1]
  def change
    change_column :drivers, :driver_license_image_id, :text
  end
end
