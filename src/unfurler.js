'use strict';

var isArray = require('lodash').isArray;
var each = require('lodash').each;

module.exports = {
	array: function(arrayOfCallbacks) {
		if (isArray(arrayOfCallbacks)) {
			return function() {
				each(arrayOfCallbacks, function(callback) {
					callback();
				});
			};
		} else {
			return arrayOfCallbacks;
		}
	},
	arrayWithGuarantee: function(arrayOfCallbacks) {
		var unfurled = this.array(arrayOfCallbacks);

		return unfurled === undefined ? function() {} : unfurled;
	}
};