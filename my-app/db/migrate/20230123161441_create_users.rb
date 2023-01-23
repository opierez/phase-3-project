class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password
      t.string :first_name 
      t.string :last_name 
      t.string :city 
      t.string :country 
      t.string :postal_code 
      t.datetime :date_of_birth 
      t.string :industry 
      t.timestamps
    end
  end
end
