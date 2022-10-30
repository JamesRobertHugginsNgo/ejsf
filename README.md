# Ejsf

Version 1.0.0

NodeJS library for converting EJS templates to Javascript functions.

```
npm install git+https://github.com/JamesRobertHugginsNgo/ejsf.git#1.0.0
```

``` JavaScript
const Ejsf = require('ejsf');
```

## Ejsf.toFunctionBody(ejs, options)

- ejs `string`
- options `object` _Optional_. Defaults: `{}`.
	- argName `string` _Optional_. Defaults: `'_data'`.
	- cwd `string` _Optional_. Defaults: `process.cwd()`.
- Returns: `string`

## Ejsf.toFunctionString(ejs, options)

- ejs `string`
- options `object` _Optional_. Defaults: `{}`.
	- argName `string` _Optional_. Defaults: `'_data'`.
	- cwd `string` _Optional_. Defaults: `process.cwd()`.
- Returns: `string`

## Ejsf.toFunction(ejs, options)

- ejs `string`
- options `object` _Optional_. Defaults: `{}`.
	- argName `string` _Optional_. Argument name used by the "EJS" function. Change when the default value is in use. Defaults: `'_data'`.
	- cwd `string` _Optional_. Current working directory, mainly used when determining `include` paths. Defaults: `process.cwd()`.
	- escName `string` _Optional_. Function name used to escape values. Change when the default value is in use. Defaults: `_esc`.
	- outName `string` _Optional_. Variable name used to generate the resulting string. Change when the default value is in use. Defaults: `_out`.
- Returns: `string`

## Ejsf.fromFileToFunctionBody(filePath, options)

- filePath `string`
- options `object` _Optional_. Defaults: `{}`.
	- argName `string` _Optional_. Argument name used by the "EJS" function. Change when the default value is in use. Defaults: `'_data'`.
	- cwd `string` _Optional_. Current working directory, mainly used when determining `include` paths. Defaults: `process.cwd()`.
	- escName `string` _Optional_. Function name used to escape values. Change when the default value is in use. Defaults: `_esc`.
	- outName `string` _Optional_. Variable name used to generate the resulting string. Change when the default value is in use. Defaults: `_out`.
- Returns: `string`

## Ejsf.fromFileToFunctionString(filePath, options)

- filePath `string`
- options `object` _Optional_. Defaults: `{}`.
	- argName `string` _Optional_. Argument name used by the "EJS" function. Change when the default value is in use. Defaults: `'_data'`.
	- cwd `string` _Optional_. Current working directory, mainly used when determining `include` paths. Defaults: `process.cwd()`.
	- escName `string` _Optional_. Function name used to escape values. Change when the default value is in use. Defaults: `_esc`.
	- outName `string` _Optional_. Variable name used to generate the resulting string. Change when the default value is in use. Defaults: `_out`.
- Returns: `string`

## Ejsf.fromFileToFunction(filePath, options)

- filePath `string`
- options `object` _Optional_. Defaults: `{}`.
	- argName `string` _Optional_. Argument name used by the "EJS" function. Change when the default value is in use. Defaults: `'_data'`.
	- cwd `string` _Optional_. Current working directory, mainly used when determining `include` paths. Defaults: `process.cwd()`.
	- escName `string` _Optional_. Function name used to escape values. Change when the default value is in use. Defaults: `_esc`.
	- outName `string` _Optional_. Variable name used to generate the resulting string. Change when the default value is in use. Defaults: `_out`.
- Returns: `string`
