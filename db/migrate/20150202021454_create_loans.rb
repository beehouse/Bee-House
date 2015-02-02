class CreateLoans < ActiveRecord::Migration
  def change
    create_table :loans do |t|
      t.integer :patron_id
      t.integer :resource_id
      t.integer :renewals
      t.timestamp :began
      t.timestamp :ends

      t.timestamps
    end
  end
end
