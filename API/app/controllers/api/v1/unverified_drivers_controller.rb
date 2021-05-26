class Api::V1::UnverifiedDriversController < ApplicationController
  def index
    render json: Driver.where(is_verified_by_admin: false)
  end

  def verify
    driver = Driver.find(params[:id])
    driver.update_column(:is_verified_by_admin, true)
    render json: driver
  end
end
