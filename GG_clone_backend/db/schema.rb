# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_05_07_170956) do

  create_table "drivers", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "phone_number"
    t.string "email"
    t.string "car_manufacturer"
    t.string "car_model"
    t.string "car_registration_number"
    t.string "driver_license_image_id"
    t.boolean "is_active", default: false
    t.boolean "is_verified_by_admin", default: false
    t.string "car_level"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "password_digest"
    t.string "remember_digest"
    t.decimal "latitude"
    t.decimal "longitude"
    t.index ["phone_number"], name: "index_drivers_on_phone_number", unique: true
  end

# Could not dump table "passengers" because of following StandardError
#   Unknown type 'sting' for column 'remember_digest'

  create_table "reservations", force: :cascade do |t|
    t.integer "driver_id"
    t.integer "passenger_id"
    t.decimal "pickupLat"
    t.decimal "pickupLng"
    t.decimal "dropoffLat"
    t.decimal "dropoffLng"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "status"
    t.integer "rating"
  end

  create_table "super_users", force: :cascade do |t|
    t.string "phone_number"
    t.string "first_name"
    t.string "last_name"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "remember_digest"
    t.index ["phone_number"], name: "index_super_users_on_phone_number", unique: true
  end

end
