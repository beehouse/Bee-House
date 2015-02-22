class AddWarnedToLoan < ActiveRecord::Migration
  def change
    add_column :loans, :warned, :boolean, default: false 
  end
end
