class AddNotifiedToHolds < ActiveRecord::Migration
  def change
    add_column :holds, :notified, :boolean, default: false 
  end
end
