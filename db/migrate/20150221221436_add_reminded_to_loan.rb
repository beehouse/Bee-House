class AddRemindedToLoan < ActiveRecord::Migration
  def change
    add_column :loans, :reminded, :boolean, default: false 
  end
end
