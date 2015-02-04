class CreateHolds < ActiveRecord::Migration
  def change
    create_table :holds do |t|
      t.integer :patron_id
      t.integer :resource_id

      t.timestamps
    end
  end
end
