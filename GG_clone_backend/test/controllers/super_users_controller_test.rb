require "test_helper"

class SuperUsersControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get super_users_new_url
    assert_response :success
  end
end
