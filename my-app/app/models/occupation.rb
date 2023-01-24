class Occupation < ActiveRecord::Base
    has_many :user_occupations
    has_many :users, through: :user_occupations
end