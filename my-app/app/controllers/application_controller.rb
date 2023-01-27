class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'
  enable :sessions
  # Add your routes here
  get "/" do
    redirect to "/login"
  end
  post '/login' do
    user = User.find_by(username: params[:username], password: params[:password])
    user.to_json(include: [:interests])
  end
  # post '/signup' do
  #   user = User.find_by(username: params[:username])
  #   if user == nil
  #     user = User.create(username: params[:username], password: params[:password], first_name: params[:first_name],
  #     last_name: params[:last_name], city: params[:city], postal_code: params[:postal_code],
  #     date_of_birth: params[:date_of_birth], interests: params[:interests], occupation: params[:occupation])
  #     user.to_json
  #   else
  #     flash[:notice] = '<p>"Username already exists."</p>'
  #     redirect to '/signup'
  #   end
  # end
  post '/signup' do
    user = User.find_by(username: params[:username])
    if user == nil
      user = User.create(username: params[:username], password: params[:password], first_name: params[:first_name],
      last_name: params[:last_name], city: params[:city], postal_code: params[:postal_code],
      date_of_birth: params[:date_of_birth], occupation: params[:occupation])
      user.create_interests(params[:interests])
      user.to_json(include: :interests)
    end
  end
  patch '/users/:id' do
    user = User.find(params[:id])
    user.update_interests(params[:interests])
    user.update(
      username: params[:username],
      password: params[:password],
      first_name: params[:first_name],
      last_name: params[:last_name],
      city: params[:city],
      postal_code: params[:postal_code],
      date_of_birth: params[:date_of_birth],
      occupation: params[:occupation]
      # interests: params[:interests],
    )
    user.reload
    user.to_json(include: :interests)
  end
  delete '/users/:id' do
    user = User.find(params[:id])
    user.interests.destroy_all
    user.occupations.destroy_all
    user.destroy
    user.to_json
  end
  get '/occupations' do
    occupations = Occupation.all
    occupations.to_json
  end
  get '/users' do
    users = User.all
    users.to_json(include: [:interests, :occupations])
  end
  get '/users/:id' do
    user = User.find(params[:id])
    user.to_json(include: [:interests, :occupations])
  end
  get '/interests' do
    interests = Interest.all
    interests.to_json
  end
  post '/connections' do
    user1 = User.find(params[:user1])
    user2 = User.find(params[:user2])
    connection_check1 = Connection.find_by(user1_id: user1.id, user2_id: user2.id)
    connection_check2 = Connection.find_by(user1_id: user2.id, user2_id: user1.id)
    if (!connection_check1 && !connection_check2)
      new_connection1 = Connection.create(user1_id: user1.id, user2_id: user2.id)
      new_connection2 = Connection.create(user1_id: user2.id, user2_id: user1.id)
      user2.to_json(include: :interests)
    else
      status 204
      "Already connected with user"
    end
  end
  get '/connections' do
    connections = Connection.all
    connections.to_json
  end
end