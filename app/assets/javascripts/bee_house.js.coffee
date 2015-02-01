window.BeeHouse =
  Models: {}
  Collections: {}
  Views: {}
  Routers: {}
  initialize: -> 
    alert 'Hello from Backbone!'

window.App = window.BeeHouse

$(document).ready ->
  App.initialize()
