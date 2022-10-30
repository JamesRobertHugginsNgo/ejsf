module.exports = (_data) => { const _esc = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, "&#x27;").replace(/\//g, '&#x2F;'); const _includes = { 'template-2': (_data) => { const subTitle = _data.subTitle; let _out = ''; _out += `<div>`; _out += (subTitle); _out += `</div>
`; return _out; } }; const include = (path, data) => _includes[path](data); const title = _data.title; const body = _data.body; const subTitle = _data.subTitle; let _out = ''; _out += `<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>
		`; _out += _esc(title); _out += `
	</title>
</head>

<body>
	<h1>`; _out += (title); _out += `</h1>

	`;  if (body) {  _out += `
		<p>`; _out += _esc(body); _out += `</p>
	`;  }  _out += `

	`; _out += (include('template-2', { subTitle })); _out += `
</body>

</html>
`; return _out; };