class AddAdminsToPatrons < ActiveRecord::Migration
  def change
    add_column :patrons, :admin, :boolean
  end
end
