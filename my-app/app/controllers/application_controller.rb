class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'
  
  # Add your routes here
  get "/" do
    # { message: "Good luck with your project!" }.to_json
    occupations = Occupation.all
    occupations.to_json
  end

  post '/login' do
    user = User.find_by(username: params[:username], password: params[:password])
    user.to_json
  end

  post '/signup' do

    user = User.find_by(username: params[:username])

    if user == nil
      user = User.create(username: params[:username], password: params[:password], first_name: params[:first_name],
      last_name: params[:last_name], city: params[:city], postal_code: params[:postal_code], 
      date_of_birth: params[:date_of_birth])
      user.to_json
    else
      flash[:notice] = '<p>"Username already exists."</p>'
      redirect to '/signup'
    end

  end

  get '/occupations' do
    occupations = Occupation.all
    occupations.to_json
  end

  get '/users' do
    users = User.all
    users.to_json
  end

  get '/users/:id' do
    user = User.find(params[:id])
    user.to_json(include: :interests)
  end

  get '/interests' do
  interests = Interest.all
  interests.to_json
  end


end
