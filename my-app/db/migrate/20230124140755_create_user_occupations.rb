class CreateUserOccupations < ActiveRecord::Migration[6.1]
  def change
    create_table :user_occupations do |t|
      t.integer :user_id
      t.integer :occupation_id
      t.timestamps
    end

  end
end
