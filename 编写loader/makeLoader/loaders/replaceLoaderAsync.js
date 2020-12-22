const loaderUtils = require('loader-utils');
// l
module.exports = function(source) {
	const options = loaderUtils.getOptions(this);
	const callback = this.async();
    
	setTimeout(() => {
		const result = source.replace('licop', options.name);
		callback(null, result);
	}, 1000);
}
