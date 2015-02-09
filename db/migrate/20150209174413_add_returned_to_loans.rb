class AddReturnedToLoans < ActiveRecord::Migration
  def change
    add_column :loans, :returned, :boolean, default: false
  end
end
