class CreateConnections < ActiveRecord::Migration[6.1]
  def change
    create_table :connections do |t|
      t.integer :user1_id
      t.integer :user2_id
      t.timestamps
    end
  end
end
