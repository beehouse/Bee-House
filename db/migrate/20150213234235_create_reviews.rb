class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.text :content
      t.integer :patron_id
      t.integer :resource_id

      t.timestamps null: false
    end
  end
end
