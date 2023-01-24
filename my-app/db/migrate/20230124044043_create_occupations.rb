class CreateOccupations < ActiveRecord::Migration[6.1]
  def change
    create_table :occupations do |t|
      t.string :industry
      t.string :job_title
      t.timestamps
    end

  end
end
