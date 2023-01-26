class User < ActiveRecord::Base 
    has_many :user_interests
    has_many :interests, through: :user_interests 
    has_many :connections 
    has_many :user_occupations
    has_many :occupations, through: :user_occupations
    
    def update_interests(interest_arr)
        self.interests.destroy_all 
        interest_arr.map do |interest|
          new_interest = Interest.all.find_by(interest: interest)
          UserInterest.create(user_id: self.id, interest_id: new_interest.id)
        end
    end
      

end