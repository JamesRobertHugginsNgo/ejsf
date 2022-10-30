const Fs = require('fs');

// EJS Function
const Ejsf = require('../index');

// Data
const data = {
	title: 'TITLE & TITLE',
	subTitle: 'SUB TITLE',
	body: '<p>Proin sodales dui at quam vehicula, sit amet laoreet dolor interdum. Duis suscipit urna at ligula euismod dapibus. Phasellus quis viverra velit. Nam diam ante, pulvinar vitae ultricies nec, molestie a massa. Maecenas gravida, eros vel finibus vehicula, nibh mauris dictum nunc, eu luctus purus augue ac neque. Mauris eleifend eros quis viverra pretium. Pellentesque non diam tempor, sollicitudin augue id, pellentesque dui.</p>'
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
