var _ = require('lodash');

module.exports = {
	array: function(arrayOfCallbacks) {
		if (_.isArray(arrayOfCallbacks)) {
			return function() {
				_.each(arrayOfCallbacks, function(callback) {
					callback();
				});
			}
		} else {
			return arrayOfCallbacks;
		}
	},
	arrayWithGuarantee: function(arrayOfCallbacks) {
		var unfurled = this.array(arrayOfCallbacks);

		return unfurled === undefined ? function() {} : unfurled;	
	}
};