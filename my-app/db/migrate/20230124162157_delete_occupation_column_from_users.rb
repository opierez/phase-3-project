class DeleteOccupationColumnFromUsers < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :occupation
  end
end
