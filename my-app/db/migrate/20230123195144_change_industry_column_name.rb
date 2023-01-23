class ChangeIndustryColumnName < ActiveRecord::Migration[6.1]
  def change
    rename_column :users, :industry, :occupation 
  end
end
