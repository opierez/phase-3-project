require 'pry'

class User < ActiveRecord::Base 
    has_many :user_interests
    has_many :interests, through: :user_interests 
    has_many :connections 
    has_many :user_occupations
    has_many :occupations, through: :user_occupations
    
    def update_interests(interest_arr)
        self.interests.destroy_all 
        my_new_interest_arr = interest_arr.map do |interest|
          new_interest = Interest.all.find_by(interest: interest)
          UserInterest.create(user_id: self.id, interest_id: new_interest.id)
        end
        my_new_interest_arr
        # binding.pry
    end

    def update_user_occupation occupation_arr 
      occupation = Occupation.all.find_by(job_title: occupation_arr[0])
      self.user_occupations.update(occupation_id: occupation.id)
    end
      

end