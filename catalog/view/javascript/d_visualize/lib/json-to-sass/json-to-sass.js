var _ = require('lodash');

module.exports = function (data) {
	var scss = '';

	if (!data) {
		return;
	}

	data = JSON.parse(data);

	function parseData(data, scss, parent_key) {
		_.mapKeys(data, function (value, key) {
			if (key === 'settings') {
				return;
			}
			if (_.isArray(value)) {
				value = '( '+value.join(',')+' )'
			}
			if (_.isObject(value)) {
				scss = parseData(value, scss, key);
			} else {
				if (parent_key) {
					scss += '$' + parent_key + '-' + key + ': ' + value + ';\r\n';
				} else {
					scss += '$' + key + ': ' + value + ';\r\n';
				}
			}
		});
		return scss;
	}

	return parseData(data, '', '');
};