module.exports = (_data) => { const _includes = { 'head': (_data) => { const _esc = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, "&#x27;").replace(/\//g, '&#x2F;'); const title = _data.title; let _out = ''; _out += `<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>
		`; _out += _esc( title ); _out += `
	</title>
</head>
`; return _out; }, 'header': (_data) => { const _esc = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, "&#x27;").replace(/\//g, '&#x2F;'); const title = _data.title; let _out = ''; _out += `<header>
	<h1>`; _out += _esc( title ); _out += `</h1>
</header>
`; return _out; }, 'footer': (_data) => { let _out = ''; _out += `<footer>
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc suscipit velit sed purus venenatis ultrices. Proin
		condimentum varius lobortis. Donec mollis elit nec ante interdum posuere et eu turpis. Donec tincidunt eros ipsum,
		quis accumsan dui eleifend a. Nulla ut tincidunt elit, nec tincidunt libero. Suspendisse quis turpis quis velit
		faucibus blandit sit amet ut lectus. Sed maximus leo ex, in scelerisque leo fringilla ac. Mauris faucibus nec nisi
		et scelerisque.</p>
</footer>
`; return _out; } }; const include = (path, data) => _includes[path](data); const title = _data.title; const body = _data.body; let _out = ''; _out += `<!DOCTYPE html>
<html lang="en">

`; _out += ( include('head', { title }) ); _out += `

<body>
	`; _out += ( include('header', { title}) ); _out += `

	`;  if (body) {  _out += `
		`; _out += ( body ); _out += `
	`;  }  _out += `

	`; _out += ( include('footer') ); _out += `
</body>

</html>
`; return _out; };