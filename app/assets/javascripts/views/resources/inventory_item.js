BeeHouse.Views.BHInventoryItem = Backbone.View.extend(
	{
		template: JST['resources/inventory_item'],
		initialize: function() {

		},
		render: function() {
			$(this.el).html(this.template({item: this.model.toJSON()}));
			return this;
		}
	}
);

var BHInventoryItem = BeeHouse.Views.BHInventoryItem;