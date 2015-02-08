class ChangePatronModel < ActiveRecord::Migration
  def change
    change_table :patrons do |t|
      t.remove :password_digest 
      t.string :encrypted_password 
      t.string :authentication_token 
    end 
  end
end
