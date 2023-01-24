class User < ActiveRecord::Base 
    has_many :user_interests
    has_many :interests, through: :user_interests 
    has_many :connections 
    has_many :user_occupations
    has_many :occupations, through: :user_occupations
    
end