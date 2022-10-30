const Fs = require('fs');

const Ejsf = require('../index');

Fs.writeFile('./template.js', `module.exports = ${Ejsf.fromFileToFunctionString('template')};`, (error) => {
	if (error) {
		return void console.error(error);
	}

	Fs.writeFile('./template.html', require('./template.js')({ title: 'TITLE & TITLE', subTitle: 'SUB TITLE', body: '<TESTING>' }), (error) => {
		if (error) {
			return void console.error(error);
		}

		console.log('COMPLETE');
	});
});
