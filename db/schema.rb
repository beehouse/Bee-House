# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150213234235) do

  create_table "holds", force: :cascade do |t|
    t.integer  "patron_id"
    t.integer  "resource_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "notified",    default: false
  end

  create_table "loans", force: :cascade do |t|
    t.integer  "patron_id"
    t.integer  "resource_id"
    t.integer  "renewals"
    t.datetime "began"
    t.datetime "ends"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "returned",    default: false
  end

  create_table "patrons", force: :cascade do |t|
    t.string   "email",                limit: 255
    t.string   "name",                 limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "admin"
    t.string   "encrypted_password",   limit: 255
    t.string   "authentication_token", limit: 255
  end

  create_table "resources", force: :cascade do |t|
    t.integer  "quantity"
    t.integer  "available"
    t.string   "title",       limit: 255
    t.string   "creator",     limit: 255
    t.text     "description", limit: 255
    t.string   "image",       limit: 255
    t.string   "publisher",   limit: 255
    t.date     "date"
    t.string   "format",      limit: 255
    t.string   "language",    limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "reviews", force: :cascade do |t|
    t.text     "content"
    t.integer  "patron_id"
    t.integer  "resource_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

end
