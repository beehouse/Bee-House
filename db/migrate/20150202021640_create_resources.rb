class CreateResources < ActiveRecord::Migration
  def change
    create_table :resources do |t|
      t.integer :quantity
      t.integer :available
      t.string :title
      t.string :creator
      t.string :description
      t.string :image
      t.string :publisher
      t.date :date
      t.string :format
      t.string :language

      t.timestamps
    end
  end
end
