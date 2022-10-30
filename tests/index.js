const Fs = require('fs');

// EJS Function
const Ejsf = require('../index');

// Data
const data = {
	title: 'TITLE & TITLE',
	subTitle: 'SUB TITLE',
	body: '<TESTING>'
};

// Create EJS function
Fs.writeFile('./results/template.js', `module.exports = ${Ejsf.fromFileToFunctionString('templates/template')};`, (error) => {
	if (error) {
		return void console.error(error);
	}

	// Use EJS function and data to create HTML
	Fs.writeFile('./results/template.html', require('./results/template.js')(data), (error) => {
		if (error) {
			return void console.error(error);
		}

		// Complete
		console.log('COMPLETE');
	});
});
