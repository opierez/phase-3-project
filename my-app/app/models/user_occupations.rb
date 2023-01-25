class UserOccupation < ActiveRecord::Base
    belongs_to :user
    belongs_to :occupation
end