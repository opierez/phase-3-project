class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'
  
  # Add your routes here
  get "/users" do
    users = User.all 
    users.to_json 
  end

  get "/users/:id" do
    user = User.find(params[:id])
    user.to_json(include: :interests)
  end

end
