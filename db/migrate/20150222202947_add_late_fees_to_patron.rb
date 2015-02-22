class AddLateFeesToPatron < ActiveRecord::Migration
  def change
    add_column :patrons, :late_fees, :integer, default: 0
  end
end
