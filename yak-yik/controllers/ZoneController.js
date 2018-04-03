var Zone = require('../models/Zone')

module.exports = {
	find: function (params, callback) {
		Zone.find(params, function(err, zones) {
			if (err)
			{
				callback(err, null)
				return
			}
			callback(null, zones)
		})
	},
	findById: function (id, callback) {
		Zone.find(id, function(err, zone) {
			if (err)
			{
				callback(err, null)
				return
			}
			callback(null, zone)
		})
	},
	update: function () {
		// body...
	},
	create: function () {
		// body...
	},
	destroy: function () {
		// body...
	}
}