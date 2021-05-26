if @user&.authenticate(params[:session][:password])
  json.login true
  json.model_name @model_name
  json.user do
    json.id @user.id
    json.phone_number @user.phone_number
    json.first_name @user.first_name
    json.last_name @user.last_name
  end
else
  json.login false
  json.message 'Login or password wrong'
end
